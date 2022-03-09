<template>
    <div class="topic">
        <div class="detail">
            <div class="title">【{{ topic.label }}】{{ topic.title }}</div>
            <div class="info">
                <div class="info_author">
                    <Icon class="authorIcon" type="md-person" size="22"/>
                    <span>{{ topic.username }}</span>
                </div>
                <!--<div class="info_submitTime">发表于{{ topic.createTime | dateFormat }}</div>-->
                <div class="info_submitTime">
                    发表于
                    <Time v-if="topic.createTime" :time="topic.createTime"/>
                </div>
                <div class="info_floor">楼主</div>
            </div>
            <div class="content" v-html="topic.content"></div>
            <div class="reply_operate">
                <a @click="showModal(0)">回复</a>
                <div class="info_submitTime_mobile">
                    <Time v-if="topic.createTime" :time="topic.createTime"/>
                </div>
            </div>
        </div>
        <div class="replyArea">
            <div class="detail" v-for="(reply, index) in replies" :key="index">
                <div class="info">
                    <div class="info_author">
                        <Icon class="authorIcon" type="md-person" size="22"/>
                        <span>{{ reply.username }}</span>
                    </div>
                    <!--<div class="info_submitTime">{{ reply.createTime | dateFormat }}</div>-->
                    <div class="info_submitTime">
                        发表于
                        <Time v-if="topic.createTime" :time="reply.createTime"/>
                    </div>
                    <div class="info_floor">{{ reply.floor }}楼</div>
                </div>
                <div class="content">
                    <div v-if="reply.quote!==0">
                        <div class="reply_quote" v-if="screenWidth>600">
                            <div class="quote_icon_e">
                                <div class="reply_quote_head">
                                <span class="reply_quote_info">
                                    {{ reply.quotedReply.username }} 发表于 {{ reply.quotedReply.submitTime | dateFormat }}
                                </span>
                                    <span class="reply_quote_floor">{{ reply.quotedReply.floor }}楼</span>
                                </div>
                                <span class="modal_reply_overflow_page" v-html="reply.quotedReply.content"></span>
                            </div>
                        </div>
                        <div class="reply_quote" v-else>
                            <div class="reply_quote_head">
                                <span class="font_quote">引用 @</span>
                                <span class="reply_quote_info">{{ reply.quotedReply.username }}</span>
                                <span class="font_quote"> 发表的</span>
                                <span class="reply_quote_floor">{{ reply.quotedReply.floor }}楼</span>
                            </div>
                            <div class="modal_reply_overflow" v-html="reply.quotedReply.content"></div>
                        </div>
                    </div>
                    <span v-html="reply.content"></span>
                </div>
                <div class="reply_operate">
                    <a @click="showModal(reply)">回复</a>
                    <div class="info_submitTime_mobile">
                        <Time :time="reply.createTime"/>
                    </div>
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
        <Modal v-if="screenWidth>600" class="modal_reply" v-model="modal" footer-hide width="1000">
            <div class="reply_quote" v-if="isShowQu">
                <div class="quote_icon_e">
                    <div class="reply_quote_head">
                        <span class="reply_quote_info">
                            {{ toQuote.username }} 发表于 {{ toQuote.submitTime | dateFormat }}
                        </span>
                        <span class="reply_quote_floor">{{ toQuote.floor }}楼</span>
                    </div>
                    <div class="modal_reply_overflow" v-html="toQuote.content"></div>
                </div>
            </div>
            <editor class="editor_qu" ref="editor_qu" :isClear="isClear"></editor>
            <Button class="submit_button" type="primary" size="large" @click="submitReply(1)">回复</Button>
        </Modal>
        <Modal v-else class="modal_reply" v-model="modal" footer-hide>
            <div class="reply_quote" v-if="isShowQu">
                <!--                <div class="quote_icon_e">-->
                <div class="reply_quote_head">
                    <span class="font_quote">引用 @</span>
                    <span class="reply_quote_info">{{ toQuote.username }}</span>
                    <span class="font_quote"> 发表的</span>
                    <span class="reply_quote_floor">{{ toQuote.floor }}楼</span>
                </div>
                <div class="modal_reply_overflow" v-html="toQuote.content"></div>
                <!--                </div>-->
            </div>
            <editor class="editor_qu" ref="editor_qu" :isClear="isClear"></editor>
            <Button class="submit_button" type="primary" @click="submitReply(1)">回复</Button>
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
            replies: [],
            newReply: {},
            //存储打开模态框后要显示的被应用的回复
            toQuote: {},
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
    computed: {
        screenWidth: function () {
            return this.$store.getters.getScreenWidth;
        }
    },
    methods: {
        init() {
            this.getTopic();
        },
        getTopic() {
            let params = {
                id: this.$route.query.id,
                page: this.paging.currentPage,
            };
            this.axios.post(this.api.forum.topicDetail, params).then(response => {
                let resp = response.data;
                if (resp.status !== "000000") {
                    this.$Message.error(resp.msg);
                    this.$router.push('/').then();
                    return;
                }
                this.topic = resp.data.topic;
                this.replies = resp.data.replies;
                this.paging.total = resp.data.replyCount;
                this.isClear = false;
            });
        },
        submitReply(num) {
            if (num === 0) {
                this.$refs.editor.getContent();
                this.newReply.quote = 0;
            } else {
                this.$refs.editor_qu.getContent();
                this.newReply.quote = this.toQuote.floor;
            }
            let validate = this.$store.getters.getContent;
            let inspection = this.inspection(validate);
            if (!inspection) {
                this.$Message.error('请输入内容！');
                return;
            }
            this.newReply.topicId = this.$route.query.id;
            this.newReply.content = this.$store.getters.getContent;
            this.axios.post(this.api.forum.newReply, this.newReply).then(response => {
                let resp = response.data;
                if (resp.status !== "000000") {
                    this.instance('error', resp.msg);
                    return;
                }
                this.isClear = true;
                this.$refs.editor.editorContent = '';
                this.modal = false;
                this.getTopic();
            })
        },
        showModal(quotedReply) {
            if (quotedReply === 0) {
                //如果点击帖子下面的“回复”按钮，则弹出模态框并且不显示被引用的内容
                this.isShowQu = false;
                this.toQuote = {id: 0};
            } else {
                this.isShowQu = true;
                this.toQuote = quotedReply;
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
    color: #808695;
}

.info_submitTime_mobile {
    display: none;
}

.info_floor {
    float: right;
}

.content {
    font-size: 1.3em;
    line-height: 38px;
    padding: 15px;
}

.replyArea {
    padding-bottom: 5px;
    overflow: hidden;
}

.reply_quote {
    width: 100%;
    margin: 10px 0px 0 0px;
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
    user-select: none;
    line-height: 50px;
    padding: 0px 15px 5px 15px;
    background: url("../../assets/icons/lattice.png") left top repeat-x;

    a {
        color: #333333;
        padding: 5px 10px 5px 25px;
        opacity: 0.3;
        background: url("../../assets/icons/fastreply.gif") no-repeat 0 50%;
    }
}

.reply_operate:hover {
    width: 100%;
    height: 50px;
    opacity: 1;
    line-height: 50px;
    padding: 0px 15px 5px 15px;
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

.modal_reply /deep/ .ivu-modal-body {
    padding: 45px 30px 30px 30px !important;
}

.modal_reply_overflow_page {
    width: 958px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}

.modal_reply_overflow {
    width: 800px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.editor_qu {
    margin-top: 25px;
}
</style>
<style scoped lang="scss">
@media screen and (max-width: 600px) {
    .title {
        font-size: 1.3rem;
    }
    .authorIcon {
        display: none;
    }
    .info {
        padding-left: 10px;
        padding-right: 15px;
    }
    .info_author {
        padding: unset;
        border-right: unset;
    }
    .info_submitTime {
        display: none;
    }
    .reply_operate {
        //height: 33px;
        //line-height: 33px;
    }
    .info_submitTime_mobile {
        float: right;
        display: inline-block;
        color: #6b839d;
    }
    .detail {
        padding: 10px 10px 0 10px;
    }
    .content {
        font-size: 1.1rem;
        line-height: 34px;
    }
    .paging_box {
        margin: 0 5px 0 0;
    }
    .submitArea {
        padding: 20px 10px;
        margin-top: 20px;
    }
    .reply_quote {
        background: #eeebeb;
        padding: 10px 10px 10px 15px;
    }
    .font_quote {
        font-size: 0.8em;
    }

    .reply_quote_info {
        font-size: 0.8rem;
        font-weight: bold;
        color: #005eac;
    }

    .reply_quote_floor {
        float: right;
        font-size: 1.0rem;
    }

    .modal_reply /deep/ .ivu-modal-body {
        padding: 35px 15px 15px 15px !important;
    }

    .modal_reply_overflow {
        width: 100%;
        font-size: 1.0rem;
    }

    .editor_qu {
        margin-top: 15px;
    }
}
</style>