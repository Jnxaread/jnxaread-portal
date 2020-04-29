<template>
    <div class="topic">
        <div class="detail">
            <div class="title">【树洞】精神小伙不请自来</div>
            <div class="info">
                <div class="info_author">
                    <Icon type="md-person" size="22"/>
                    <span>遥望千山</span>
                </div>
                <div class="info_submitTime">发表于2020-04-25</div>
                <div class="info_floor">楼主</div>
            </div>
            <div class="content">
                <p>⑤帖因为回复楼层过多被锁定了。等不到前三任楼主出来发帖。于是新开一帖。</p>
                <p>！不能涉及边限。希望本楼可以像⑤帖一样最终可以寿终正寝~</p>
                <p>注意:不能询问真实信息</p>
                <p>不能辱骂或者人身攻击</p>
                <p>不能违反站规</p>
                <p>不能以捉弄对方为目的</p>
                <p>copy from 酒酿咸鱼/gemstone</p>
                <p>祝：大家聊天开心^_^</p>
            </div>
            <div class="reply_operate">
                <a @click="showModal(0)">回复</a>
            </div>
        </div>
        <div class="replyArea">
            <div class="detail">
                <div class="info">
                    <div class="info_author">
                        <Icon type="md-person" size="22"/>
                        <span>发布者</span>
                    </div>
                    <div class="info_submitTime">2020-04-25 19:32:56</div>
                    <div class="info_floor">1楼</div>
                </div>
                <div class="content">
                    <div class="reply_quote">
                        <div class="quote_icon_e">
                            <div class="reply_quote_head">
                                <span class="reply_quote_info">红昭愿 发表于 2020-04-16 15:36:45</span>
                                <span class="reply_quote_floor">9楼</span>
                            </div>
                            被引用的内容
                        </div>
                    </div>
                    主要内容
                </div>
                <div class="reply_operate">
                    <a @click="showModal(1)">回复</a>
                </div>
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
                        <span class="reply_quote_info">红昭愿 发表于 2014-06-18 22:36:44</span>
                        <span class="reply_quote_floor">1楼</span>
                    </div>
                    <div class="modal_reply_overflow">啦啦啦啦啦啦啦啦</div>
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
        methods: {
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

    .submitArea {
        width: 100%;
        background-color: #f5f5f5;
        border: 1px solid #c4c4c4;
        border-radius: 6px;
        padding: 35px 35px 25px 35px;
        margin-top: 20px;
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
