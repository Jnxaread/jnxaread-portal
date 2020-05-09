<template>
    <div class="fiction">
        <div class="fiction_main">
            <div class="detail">
                <div class="title">{{fiction.title}}</div>
                <div class="author">{{fiction.author}}</div>
                <div class="label_box">
                    <div class="label" v-for="tag in fiction.tags" :key="tag">
                        【{{tag}}】
                    </div>
                </div>
                <div class="brief">{{fiction.introduction}}</div>
            </div>
            <div class="turningBox">
                <div class="turning">开始阅读</div>
                <div class="turning">章节目录</div>
            </div>
        </div>
        <div class="commentArea">
            <div class="commentArea_head">
                <div class="commentArea_title">书评区 >></div>
                <div class="commentArea_submit">
                    <Button class="button_submit" type="primary" size="large" @click="writeComment()">发表书评</Button>
                </div>
            </div>
            <div class="comment" v-if="this.comments.length==0">
                <div class="comment_content">还没有评论，快来评论吧！</div>
            </div>
            <div class="comment" v-else v-for="(comment,index) in comments" :key="index">
                <div class="comment_header">
                    <div class="comment_author">{{comment.username}}</div>
                    <div class="comment_submitTime">{{ comment.createTime | dateFormat }}</div>
                </div>
                <div class="comment_content" v-html="comment.content"></div>
            </div>
        </div>
        <Modal class="modal_comment" v-model="modal" footer-hide width="1000">
            <editor ref="editor" :isClear="isClear"></editor>
            <Button class="submit_button" type="primary" size="large" @click="submitComment()">发表评论</Button>
        </Modal>
    </div>
</template>

<script>
    import Editor from '../../components/Editor';

    export default {
        name: "Fiction",
        components: {Editor},
        data() {
            return {
                fiction: {
                    tags: [],
                },
                comments: [],
                newComment: {},
                isClear: false,
                modal: false,
            }
        },
        created() {
            this.init();
        },
        methods: {
            init() {
                this.getFiction();
            },
            getFiction() {
                let initParams = {
                    'id': this.$route.query.id,
                    // 'page': this.paging.currentPage,
                    'terminal': navigator.userAgent
                };
                let params = this.qs.stringify(initParams);
                this.axios.post('/library/detail/fiction', params).then(response => {
                    let resp = response.data;
                    if (resp.status != 200) {
                        this.$Message.error(resp.msg);
                        return;
                    }
                    this.fiction = resp.data.fiction;
                    this.comments = resp.data.comments;
                })
            },
            writeComment() {
                this.modal = true;
            },
            submitComment() {
                this.$refs.editor.getContent();
                let validate = this.$store.getters.getContent;
                let inspection = this.inspection(validate);
                if (!inspection) {
                    this.$Message.error('请输入内容！');
                    return;
                }
                this.newComment.fictionId = this.$route.query.id;
                this.newComment.content = this.$store.getters.getContent;
                this.newComment.terminal = navigator.userAgent;
                let params = this.qs.stringify(this.newComment);
                this.axios.post('/library/new/comment', params).then(response => {
                    let resp = response.data;
                    if (resp.status != 200) {
                        this.instance('error', resp.msg);
                        return;
                    }
                    this.isClear = true;
                    this.$refs.editor.editorContent = '';
                    this.modal = false;
                    this.getFiction();
                })
            }
        }
    }
</script>

<style scoped>
    .fiction {
        width: 100%;
    }

    .fiction_main {
        width: 100%;
        background-color: #f5f5f5;
        border: 1px solid #c4c4c4;
        border-radius: 6px;
        /*margin-bottom: 6px;*/
    }

    .detail {
        padding: 20px 50px;
    }

    .title {
        font-size: 1.8em;
        font-weight: bolder;
        text-align: center;
        margin: 10px 0;
    }

    .author {
        font-size: 1.3em;
        font-weight: bold;
        text-align: center;
        margin: 20px 0;
    }

    .label_box {
        text-align: center;
    }

    .label {
        display: inline-block;
        font-size: 1.1em;
        font-weight: bolder;
        margin: 15px 0;
    }

    .brief {
        font-size: 1.2em;
        text-align: center;
        margin: 20px 0;
    }

    .turningBox {
        text-align: center;
        margin-bottom: 20px;
    }

    .turning {
        width: 570px;
        height: 38px;
        font-weight: bold;
        line-height: 34px;
        display: inline-block;
        border: 2px solid #666;
        border-radius: 6px;
        margin: 0 10px;
        cursor: pointer;
        user-select: none;
    }

    .commentArea_head {
        width: 98%;
        height: 70px;
        margin: 0 auto;
        line-height: 70px;
    }

    .commentArea_title {
        display: inline-block;
        font-size: 1.6em;
        font-weight: bolder;
        margin-right: 15px;
    }

    .commentArea_submit {
        display: inline-block;
    }

    .button_submit {
        border: 0;
        background-color: #ccc;
    }

    .ivu-btn:focus {
        box-shadow: none;
    }

    .ivu-btn:active {
        box-shadow: none;
    }

    .comment {
        width: 100%;
        background-color: #f5f5f5;
        border: 1px solid #c4c4c4;
        border-radius: 6px;
        padding: 10px 15px;
        margin-bottom: 6px;
    }

    .comment_header {
        padding: 0 20px;
        border-bottom: 1px solid #c4c4c4;
    }

    .comment_author {
        font-size: 1.2em;
        font-weight: bolder;
        margin: 10px 0;
        display: inline-block;
    }

    .comment_submitTime {
        font-size: 1.1em;
        margin: 10px 15px;
        display: inline-block;
    }

    .comment_content {
        font-size: 1.3em;
        padding: 10px 40px;
        line-height: 38px;
    }

    .modal_comment /deep/ .ivu-modal-body {
        padding: 45px 30px 30px 30px !important;
    }

</style>
