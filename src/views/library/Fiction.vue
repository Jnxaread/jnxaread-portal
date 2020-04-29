<template>
    <div class="fiction">
        <div class="fiction_main">
            <div class="detail">
                <div class="title">小说标题</div>
                <div class="author">作者</div>
                <div class="label">标签</div>
                <div class="brief">简介</div>
            </div>
            <div class="turningBox">
                <div class="turning">开始阅读</div>
                <div class="turning">章节目录</div>
            </div>
        </div>
        <div class="commentArea">
            <div class="commentArea_title">书评区</div>
            <div class="comment">
                <div class="comment_header">
                    <div class="comment_author">发布者</div>
                    <div class="comment_submitTime">2020-04-25 19:32:56</div>
                </div>
                <div class="comment_content">主要内容</div>
            </div>
            <div class="comment">
                <div class="comment_header">
                    <div class="comment_author">发布者</div>
                    <div class="comment_submitTime">2020-04-25 19:32:56</div>
                </div>
                <div class="comment_content">主要内容</div>
            </div>
            <div class="comment">
                <div class="comment_header">
                    <div class="comment_author">发布者</div>
                    <div class="comment_submitTime">2020-04-25 19:32:56</div>
                </div>
                <div class="comment_content">主要内容</div>
            </div>
            <div class="comment">
                <div class="comment_header">
                    <div class="comment_author">发布者</div>
                    <div class="comment_submitTime">2020-04-25 19:32:56</div>
                </div>
                <div class="comment_content">主要内容</div>
            </div>
            <div class="comment">
                <div class="comment_header">
                    <div class="comment_author">发布者</div>
                    <div class="comment_submitTime">2020-04-25 19:32:56</div>
                </div>
                <div class="comment_content">主要内容</div>
            </div>
            <div class="comment">
                <div class="comment_header">
                    <div class="comment_author">发布者</div>
                    <div class="comment_submitTime">2020-04-25 19:32:56</div>
                </div>
                <div class="comment_content">主要内容</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Fiction"
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
        margin-bottom: 6px;
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

    .label {
        font-size: 1.2em;
        font-weight: bolder;
        text-align: center;
        margin: 20px 0;
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

    .commentArea {
    }

    .commentArea_title {
        font-size: 1.6em;
        font-weight: bolder;
        text-align: center;
        margin: 15px 0;
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

</style>
