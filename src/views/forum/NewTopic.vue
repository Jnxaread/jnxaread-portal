<template>
    <div class="submit">
        <div class="container">
            <h2>发表帖子</h2>
            <div class="topic_top">
                <div class="topic_label">
                    <Input v-model="topic.label" maxlength="4" size="large" placeholder="四字标签" style="width: 86px;"/>
                </div>
                <div class="topic_title">
                    <Input v-model="topic.title" maxlength="35" show-word-limit size="large" placeholder="请输入标题" style="width: 60%;"/>
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
            return {
                topic: {
                    label: '',
                    title: '',
                    content: '',
                    terminal: ''
                }
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
            submitTopic() {
                this.$refs.editor.getContent();
                if (this.topic.label === '') {
                    this.$Message.error('请输入帖子标签！');
                    return;
                }
                let reg = /^[\u4e00-\u9fa5]{2,4}$/;
                if (!reg.test(this.topic.label)) {
                    this.$Message.error('标签为2至4位汉字');
                    return;
                }
                if (this.topic.title === '') {
                    this.$Message.error('请输入标题！');
                    return;
                }
                if (this.topic.title.length < 4) {
                    this.$Message.error('帖子标题的长度不得低于4个字符');
                    return
                }
                let validate = this.$store.getters.getContent;
                let validateA = validate.replace(/ /g, '');
                let validateB = validateA.replace(/<p>/g, '');
                let validateC = validateB.replace(/<\/p>/g, '');
                let validateD = validateC.replace(/&nbsp;/g, '');
                let validateE = validateD.replace(/<br>/g, '');
                if (validateE.length == 0) {
                    this.$Message.error('请输入内容！');
                    return;
                }
                this.topic.content = this.$store.getters.getContent;
                this.topic.terminal = navigator.userAgent;
                let params = this.qs.stringify(this.topic);
                this.axios.post('/submitTopic', params).then(response => {
                    let resp = response.data;
                    if (resp.status != 200) {
                        this.instance('error', resp.msg);
                        return;
                    }
                    this.$router.push({path: '/toTopic', query: {id: resp.data}}).then();
                })
            },
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

        h2 {
            text-align: center;
        }
    }

    .topic_top {
        width: 100%;
        margin-top: 30px;
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
