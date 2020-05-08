<template>
    <div class="topic">
        <div class="detail">
            <div class="title">【{{topic.label}}】{{topic.title}}</div>
            <div class="info">
                <div class="info_author">
                    <Icon type="md-person" size="22"/>
                    <span>{{topic.username}}</span>
                </div>
                <div class="info_submitTime">发表于{{ topic.createTime | dateFormat }}</div>
                <div class="info_floor">楼主</div>
            </div>
            <div class="content" v-html="topic.content"></div>
            <div class="reply_operate">
                <a @click="showModal(0)">回复</a>
            </div>
        </div>
        <div class="replyArea">
            <div class="detail" v-for="(reply, index) in pageReplyList" :key="index">
                <div class="info">
                    <div class="info_author">
                        <Icon type="md-person" size="22"/>
                        <span>{{ reply.username }}</span>
                    </div>
                    <div class="info_submitTime">{{ reply.submitTime | dateFormat }}</div>
                    <div class="info_floor">{{ reply.floor }}楼</div>
                </div>
                <div class="content">
                    <div class="reply_quote" v-if="reply.quote!=0">
                        <div class="quote_icon_e">
                            <div class="reply_quote_head">
                                <span class="reply_quote_info">{{ replyList[reply.quoteIndex].username }} 发表于 {{ replyList[reply.quoteIndex].submitTime | dateFormat }}</span>
                                <span class="reply_quote_floor">{{ replyList[reply.quoteIndex].floor }}楼</span>
                            </div>
                            <span v-html="replyList[reply.quoteIndex].content"></span>
                        </div>
                    </div>
                    <span v-html="reply.content"></span>
                </div>
                <div class="reply_operate">
                    <a @click="showModal(reply.floor)">回复</a>
                </div>
            </div>
            <div class="paging_box">
                <Page v-if="paging.total>0" :current="paging.currentPage" :page-size="paging.pageSize"
                      :total="paging.total" show-elevator @on-change="changePage"/>
            </div>
        </div>
        <div class="submitArea">
            <editor ref="editor" :isClear="isClear"></editor>
            <Button class="submit_button" type="primary" size="large" @click="submitReply(0)">回复</Button>
        </div>
        <Modal class="modal_reply" v-model="modal" footer-hide width="1000">
            <div class="reply_quote" v-if="isShowQu">
                <div class="quote_icon_e">
                    <div class="reply_quote_head">
                        <span class="reply_quote_info">{{ toQuote.username }} 发表于 {{ toQuote.submitTime | dateFormat }}</span>
                        <span class="reply_quote_floor">{{ toQuote.floor }}楼</span>
                    </div>
                    <div class="modal_reply_overflow" v-html="toQuote.content"></div>
                </div>
            </div>
            <editor ref="editor_qu" :isClear="isClear"></editor>
            <Button class="submit_button" type="primary" size="large" @click="submitReply(1)">回复</Button>
        </Modal>
    </div>
</template>

<script>
    import Editor from '../../components/Editor';

    export default {
        name: "Topic",
        components: {Editor},
        data() {
            return {
                topic: {},
                replyList: [],
                pageReplyList: [],
                newReply: {},
                toQuote: {},
                quoteFloor: 0,
                modal: false,
                isShowQu: true,
                isClear: false,
                paging: {
                    currentPage: 1,
                    pageSize: 50,
                    total: 0,
                },
            }
        },
        created() {
            this.init();
        },
        methods: {
            init() {
                this.getTopic();
            },
            getTopic() {
                let initParams = {
                    'id': this.$route.query.id,
                    'page': this.paging.currentPage,
                    'terminal': navigator.userAgent
                };
                let params = this.qs.stringify(initParams);
                this.axios.post('/forum/detail/topic', params).then(response => {
                    let resp = response.data;
                    if (resp.status != 200) {
                        this.$Message.error(resp.msg);
                        this.$router.push('/').then();
                        return;
                    }
                    this.topic = resp.data.topic;
                    this.pageReplyList = resp.data.replyList;
                    for (let i = 0; i < this.pageReplyList.length; i++) {
                        if (this.pageReplyList[i].quote != 0) {
                            this.pageReplyList[i].quoteIndex = this.pageReplyList[i].quote - 1;
                        }
                    }
                    let lastIndex_f = this.replyList.length - 1;
                    if (this.replyList.length == 0 || this.replyList[lastIndex_f].floor < resp.data.replyList[0].floor) {
                        for (let i = 0; i < resp.data.replyList.length; i++) {
                            this.replyList.push(resp.data.replyList[i]);
                        }
                    }
                    let lastIndex_s = this.replyList.length - 1;
                    let respLastIndex = resp.data.replyList.length - 1;
                    if (this.replyList.length != 0 && this.replyList[lastIndex_s].floor >= resp.data.replyList[0].floor && this.replyList[lastIndex_s].floor < resp.data.replyList[respLastIndex].floor) {
                        for (let i = 0; i < resp.data.replyList.length; i++) {
                            if (this.replyList[lastIndex_s].floor < resp.data.replyList[i].floor) {
                                this.replyList.push(resp.data.replyList[i]);
                            }
                        }
                    } else if (this.replyList.length != 0 && this.replyList[0].floor < resp.data.replyList[0].floor && this.replyList[lastIndex_s].floor > resp.data.replyList[respLastIndex].floor) {
                        for (let i = 0; i < this.replyList.length; i++) {
                            if (this.replyList[i].floor == resp.data.replyList[0].floor) {
                                break;
                            } else if (this.replyList[i].floor > resp.data.replyList[0].floor) {
                                for (let j = 0; j < resp.data.replyList.length; j++) {
                                    this.replyList.splice(i, 0, resp.data.replyList[j]);
                                }
                                break;
                            }
                        }
                    }
                    this.paging.total = resp.data.replyCount;
                    this.isClear = false;
                });
            },
            submitReply(num) {
                if (num == 0) {
                    this.quoteFloor = 0;
                    this.$refs.editor.getContent();
                } else {
                    this.$refs.editor_qu.getContent();
                }
                let validate = this.$store.getters.getContent;
                let inspection = this.inspection(validate);
                if (!inspection) {
                    this.$Message.error('请输入内容！');
                    return;
                }
                this.newReply.topicId = this.$route.query.id;
                this.newReply.quote = this.quoteFloor;
                this.newReply.content = this.$store.getters.getContent;
                this.newReply.terminal = navigator.userAgent;
                let params = this.qs.stringify(this.newReply);
                this.axios.post('/forum/new/reply', params).then(response => {
                    let resp = response.data;
                    if (resp.status != 200) {
                        this.instance('error', resp.msg);
                        return;
                    }
                    this.isClear = true;
                    this.$refs.editor.editorContent = '';
                    this.modal = false;
                    this.quoteFloor = 0;
                    this.getTopic();
                })
            },
            showModal(floor) {
                if (floor == 0) {
                    this.isShowQu = false;
                } else {
                    this.isShowQu = true;
                    this.toQuote = this.replyList[floor - 1];
                    this.quoteFloor = floor;
                }
                this.modal = true;
            },
            changePage(page) {
                this.paging.currentPage = page;
                this.getTopic();
            },
        }
    }
</script>

<style scoped lang="scss">
    .topic {
        width: 100%;
    }

    .detail {
        width: 100%;
        background-color: #f5f5f5;
        border: 1px solid #c4c4c4;
        border-radius: 6px;
        padding: 20px 35px;
        margin-bottom: 6px;
    }

    .title {
        font-size: 1.6em;
        font-weight: bold;
        margin-bottom: 15px;
        border-bottom: 3px solid #1c5899;
    }

    .info {
        font-size: 1.1em;
        padding-bottom: 2px;
        border-bottom: 1px solid #c4c4c4;
    }

    .info_author {
        display: inline-block;
        padding: 0px 15px;
        border-right: 2px solid #a9a9a9;

        span {
            margin-left: 5px;
        }
    }

    .info_submitTime {
        display: inline-block;
        padding: 0 15px;
    }

    .info_floor {
        float: right;
    }

    .content {
        font-size: 1.3em;
        line-height: 38px;
        padding: 0 15px;
        margin-top: 20px;
    }

    .replyArea {
        overflow: hidden;
    }

    .reply_quote {
        width: 100%;
        margin: 10px 0px 25px 0px;
        padding: 10px 10px 10px 65px;
        border-radius: 10px;
        background: #e8eaec url("../../assets/icons/icon_quote_s.gif") no-repeat 20px 6px;
    }

    .quote_icon_e {
        padding: 0px 65px 10px 0px;
        background: url("../../assets/icons/icon_quote_e.gif") no-repeat 98% 100%;
    }

    .reply_quote_info {
        font-size: 1em;
        color: #808695;
    }

    .reply_quote_floor {
        font-size: 1.2em;
        font-weight: bold;
        color: darkgrey;
        margin-left: 15px;
    }

    .reply_operate {
        width: 100%;
        height: 50px;
        opacity: 0.2;
        user-select: none;
        line-height: 50px;
        padding: 0px 15px;
        margin-top: 15px;
        background: url("../../assets/icons/lattice.png") left top repeat-x;

        a {
            color: #333333;
            padding: 5px 10px 5px 25px;
            background: url("../../assets/icons/fastreply.gif") no-repeat 0 50%;
        }
    }

    .reply_operate:hover {
        width: 100%;
        height: 50px;
        opacity: 1;
        line-height: 50px;
        padding: 0px 15px;
        margin-top: 15px;
        background: url("../../assets/icons/lattice.png") left top repeat-x;

        a {
            color: #333333;
            padding: 5px 10px 5px 25px;
            background: url("../../assets/icons/fastreply.gif") no-repeat 0 50%;
        }
    }

    .paging_box {
        float: right;
        margin: 5px 45px 0px 0px;
    }

    .submitArea {
        width: 100%;
        background-color: #f5f5f5;
        border: 1px solid #c4c4c4;
        border-radius: 6px;
        padding: 35px 35px 25px 35px;
        margin-top: 30px;
    }

    .submit_button {
        width: 120px;
    }

    .ivu-btn {
        border: 0;
        box-shadow: none;
        background-color: #999;
    }

    .ivu-btn:focus {
        box-shadow: none;
    }

    .ivu-btn:active {
        box-shadow: none;
    }

    .modal_reply /deep/ .ivu-modal-body {
        padding: 45px 30px 30px 30px !important;
    }

    .modal_reply_overflow {
        width: 800px;
        height: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
</style>
