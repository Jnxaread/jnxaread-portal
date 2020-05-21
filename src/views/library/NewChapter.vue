<template>
    <div class="newChapter">
        <div class="container">
            <div class="prompt">发布章节 /《三寸人间》</div>
            <div class="topic_top">
                <div class="topic_label">
                    <InputNumber v-model="newChapter.number" :min="1" :max="10000" size="large" placeholder="章节号" style="width: 86px;"/>
                </div>
                <div class="topic_title">
                    <Input v-model="newChapter.title" maxlength="35" show-word-limit size="large" placeholder="请输入标题" style="width: 60%;"/>
                    <span>最多输入35个字符</span>
                </div>
            </div>
            <div class="topic_content">
                <editor ref="editor"></editor>
                <Button class="submit_button" type="primary" size="large" @click="submitChapter()">保存章节</Button>
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
            return {
                newChapter: {
                    fictionId: this.$route.query.id,
                    number: null,
                    title: '',
                    content: '',
                    terminal: navigator.userAgent
                },
            }
        },
        created: function () {
            this.init();
        },
        methods: {
            init() {
                if (!this.$store.getters.isLogin) {
                    this.$Message['warning']({
                        background: true,
                        content: '只有登录后才能发帖'
                    });
                    this.$router.push('/signIn').then();
                }
            },
            submitChapter() {
                this.$refs.editor.getContent();
                if (this.newChapter.number === '') {
                    this.$Message.error('请输入章节号');
                    return;
                }
                if (this.newChapter.title === '') {
                    this.$Message.error('请输入章节标题');
                    return;
                }
                let validate = this.$store.getters.getContent;
                let inspection = this.inspection(validate);
                if (!inspection) {
                    this.$Message.error('请输入章节内容！');
                    return;
                }
                this.newChapter.content = this.$store.getters.getContent;
                let params = this.qs.stringify(this.newChapter);
                this.axios.post('library/new/chapter', params).then(response => {
                    let resp = response.data;
                    if (resp.status != 200) {
                        this.instance('error', resp.msg);
                        return;
                    }
                    this.$router.push({path: '/chapter', query: {id: resp.data}}).then();
                })
            },
        }
    }
</script>

<style scoped lang="scss">
    .newChapter {
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

        h2 {
            text-align: center;
        }
    }

    .prompt {
        font-size: 1.8em;
        font-weight: bold;
        font-family: YouYuan;
    }

    .topic_top {
        width: 100%;
        margin-top: 30px;
    }

    /*.topic_top /deep/ .ivu-input {
        background-color: #f5f5f5;
    }

    .topic_top /deep/ .ivu-input-word-count {
        background-color: #f5f5f5;
    }*/

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

    .topic_content /deep/ .w-e-text {
        background-color: #fff;
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
