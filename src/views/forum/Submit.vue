<template>
    <div class="submit">
        <div class="container">
            <h2>发表帖子</h2>
            <div class="topic_top">
                <div class="topic_label">
                    <Input maxlength="4" size="large" placeholder="四字标签" style="width: 86px;"/>
                </div>
                <div class="topic_title">
                    <Input maxlength="35" show-word-limit size="large" placeholder="请输入标题" style="width: 60%;"/>
                    <span>最多输入35个字符</span>
                </div>
            </div>
            <div class="topic_content">
                <editor ref="editor"></editor>
                <Button class="submit_button" type="primary" size="large" @click="submitTopic">发表帖子</Button>
            </div>
        </div>
    </div>
</template>

<script>
    import Editor from '../../components/Editor';

    export default {
        name: "Submit",
        components: {Editor},
        data() {
            return {}
        }
    }
</script>

<style scoped lang="scss">
    .submit {
        width: 100%;
        background-color: #f5f5f5;
        border: 1px solid #c4c4c4;
        border-radius: 6px;
        margin-bottom: 6px;
    }

    .container {
        width: 95%;
        padding: 10px 30px;
        margin: 20px auto;
    }

    .topic_top {
        width: 100%;
        margin-top: 20px;
    }

    .topic_top /deep/ .ivu-input {
        background-color: #f5f5f5;
    }

    .topic_top /deep/ .ivu-input-word-count {
        background-color: #f5f5f5;
    }

    .topic_top /deep/ .ivu-input:focus {
        box-shadow: none;
    }

    .topic_label {
        width: 20%;
        display: inline;
    }

    .topic_title {
        width: 80%;
        margin-left: 15px;
        display: inline;

        Input {
            display: inline;
        }

        span {
            display: inline;
            font-size: 1.15em;
            margin-left: 15px;
            line-height: 38px;
        }
    }

    .topic_content {
        width: 100%;
        margin-top: 15px;
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
</style>
