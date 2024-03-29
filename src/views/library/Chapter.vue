<template>
    <div class="chapter">
        <div class="detail">
            <div class="titleBox">
                <div class="title" v-if="chapter.number">
                    第{{ noToChinese(chapter.number.toString()) }}章
                </div>
                <div class="title">{{ chapter.title }}</div>
            </div>
            <div class="info">
                <div class="info_item">作者：{{ chapter.author }}</div>
                <div class="info_item">字数：{{ chapter.wordCount }}</div>
                <div class="info_item">
                    更新时间：
                    <Time :time="chapter.createTime" type="datetime"/>
                </div>
            </div>
            <div class="content" v-html="chapter.content"></div>
            <div class="turningBox">
                <div class="turning" @click="getChapter(1)">上一章</div>
                <div class="directory" @click="goDirectory()">目录</div>
                <div class="turning" @click="getChapter(2)">下一章</div>
            </div>
        </div>
        <div class="commentArea">
            <div class="commentArea_head">
                <div class="commentArea_title">评论区 >></div>
                <div class="commentArea_submit">
                    <Button class="button_submit" type="primary" size="large" @click="goWriteComment()">发表评论</Button>
                </div>
            </div>
            <div class="comment" v-if="comments.length===0">
                <div class="comment_content">本章还没有评论，快来发表评论吧......</div>
            </div>
            <div class="comment" v-else v-for="(comment,index) in comments" :key="index">
                <div class="comment_header">
                    <div class="comment_author">{{ comment.username }}</div>
                    <div class="comment_submitTime">
                        <Time :time="comment.createTime" type="datetime"/>
                    </div>
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
import {Button, Modal, Time} from "view-design";

export default {
    name: "Chapter",
    components: {
        Editor,
        Time,
        Button,
        Modal
    },
    data() {
        return {
            chapter: {},
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
            this.getChapter(0);
        },
        /**
         * type：根据type决定请求参数
         * 【
         *      0：参数为章节id；
         *      1：参数为作品id和章节id-1；
         *      2：参数为作品id和章节id+1；
         *      3：参数为章节id，但刷新页面后不返回页面顶部
         *  】
         */
        getChapter(type) {
            let params;
            let api = this.api.library.chapterNumber;
            if (type === 0 || type === 3) {
                params = {
                    id: this.$route.query.id,
                };
                api = this.api.library.chapterDetail;
            } else if (type === 1) {
                params = {
                    fictionId: this.chapter.fictionId,
                    number: this.chapter.number - 1,
                }
            } else {
                params = {
                    fictionId: this.chapter.fictionId,
                    number: this.chapter.number + 1,
                }
            }
            this.axios.post(api, params).then(response => {
                let resp = response.data;
                if (resp.status !== "000000") {
                    this.$Message.error(resp.msg);
                    this.$router.push('/library').then();
                    return;
                }
                this.chapter = resp.data.chapter;
                this.comments = resp.data.comments;
                if (type !== 3) {
                    //返回页面顶部
                    document.body.scrollTop = 0;
                    document.documentElement.scrollTop = 0;
                }
            });
        },
        goDirectory() {
            this.$router.push('/directory?id=' + this.chapter.fictionId).then();
        },
        goWriteComment() {
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
            this.newComment.fictionId = this.chapter.fictionId;
            this.newComment.chapterId = this.chapter.id;
            this.newComment.content = this.$store.getters.getContent;
            this.axios.post(this.api.library.newComment, this.newComment).then(response => {
                let resp = response.data;
                if (resp.status !== "000000") {
                    this.instance('error', resp.msg);
                    return;
                }
                this.isClear = true;
                this.$refs.editor.editorContent = '';
                this.modal = false;
                this.getChapter(3);
            })
        }
    }
}
</script>

<style scoped>

.chapter {
    width: 100%;
}

.detail {
    width: 100%;
    background-color: #f5f5f5;
    border: 1px solid #c4c4c4;
    border-radius: 6px;
    padding: 20px 50px;
    margin-bottom: 6px;
    /*取消双击选中文字*/
    user-select: none;
}

.titleBox {
    font-size: 1.9em;
    font-weight: bold;
    text-align: center;
    margin: 25px 0 40px 0;
}

.title {
    display: inline-block;
    margin: 0 6px;
}

.info {
    font-size: 1.1em;
    margin: 15px 0 30px 0;
    text-align: center;
}

.info_item {
    display: inline-block;
    margin: 0 15px;
}

.content {
    font-size: 1.3em;
    line-height: 38px;
}

.turningBox {
    font-size: 1.3em;
    font-weight: bolder;
    font-family: YouYuan, serif;
    text-align: center;
    margin: 60px 0 25px 0;
}

.turning {
    width: 320px;
    height: 38px;
    line-height: 38px;
    color: #fff;
    background-color: darkgrey;
    display: inline-block;
    border-radius: 6px;
    margin: 0 10px;
    cursor: pointer;
}

.directory {
    width: 320px;
    height: 38px;
    line-height: 34px;
    display: inline-block;
    border: 2px solid #666;
    border-radius: 6px;
    margin: 0 10px;
    cursor: pointer;
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

.modal_comment ::v-deep .ivu-modal-body {
    padding: 45px 30px 30px 30px !important;
}

@media screen and (max-width: 600px) {
    .detail {
        padding: 0 12px 0 18px;
    }

    .turning {
        width: 90%;
        margin: 8px 0;
    }

    .directory {
        width: 90%;
        margin: 8px 0;
    }
}
</style>
