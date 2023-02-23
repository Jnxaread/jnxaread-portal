<template>
    <div class="submit">
        <div class="container">
            <h2>发表帖子</h2>
            <div class="topic_top">
                <div :class="screenWidth>600?'topic_label':''">
                    <label>
                        <Input class="input_label" v-model="topic.label" maxlength="4" size="large" placeholder="四字标签"/>
                    </label>
                    <span class="span_label" v-if="screenWidth<600">请输入标签</span>
                </div>
                <div class="topic_title">
                    <label>
                        <Input class="input_title" v-model="topic.title" maxlength="35" show-word-limit size="large"
                               placeholder="请输入标题"/>
                    </label>
                    <br v-if="screenWidth<600">
                    <span>最多输入35个字符</span>
                </div>
            </div>
            <div class="topic_content">
                <editor ref="editor"></editor>
            </div>
            <div class="restrictedBox">
                <div class="restrictedTitle">限制等级</div>
                <div class="restrictedInput">
                    <InputNumber :max="5" :min="0" size="large" v-model="topic.restricted"></InputNumber>
                </div>
            </div>
            <Button class="submit_button" type="primary" size="large" @click="submitTopic">发表帖子</Button>
        </div>
    </div>
</template>

<script>
import Editor from '../../components/Editor';
import {Button, Input, InputNumber} from "view-design";

export default {
    name: "Submit",
    components: {
        Editor,
        Input,
        InputNumber,
        Button
    },
    data() {
        return {
            topic: {
                boardId: 1,
                label: '',
                title: '',
                content: '',
                restricted: 0,
            }
        }
    },
    created: function () {
        this.init();
    },
    computed: {
        screenWidth: function () {
            return this.$store.getters.getScreenWidth;
        }
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
            let inspection = this.inspection(validate);
            if (!inspection) {
                this.$Message.error('请输入内容！');
                return;
            }
            this.topic.content = this.$store.getters.getContent;
            this.axios.post(this.api.forum.newTopic, this.topic).then(response => {
                let resp = response.data;
                if (resp.status !== "000000") {
                    this.instance('error', resp.msg);
                    return;
                }
                this.$router.push({path: '/topic', query: {id: resp.data}}).then();
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

.topic_top ::v-deep .ivu-input:focus {
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

    span {
        font-size: 1.15em;
        margin-left: 15px;
        line-height: 38px;
    }
}

.input_label {
    width: 86px;
}

.input_title {
    width: 60%;
}

.topic_content {
    width: 100%;
    margin-top: 15px;
}

.topic_content ::v-deep .w-e-text {
    background-color: #fff;
}

.restrictedBox {
    margin-bottom: 15px;
}

.restrictedTitle {
    display: inline-block;
    font-size: 1.25rem;
    font-family: YouYuan, serif;
    line-height: 40px;
    margin-right: 1rem;
}

.restrictedInput {
    display: inline-block;
    vertical-align: bottom;
}

.submit_button {
    width: 120px;
}

.ivu-btn {
    border: 0;
    box-shadow: none;
    background-color: #999;
}
</style>
<style scoped lang="scss">
@media screen and (max-width: 600px) {
    .container {
        width: 98%;
        padding: 10px;
    }
    .span_label {
        margin-left: 10px;
        font-size: 1.0rem;
    }
    .topic_title {
        width: 100%;
        margin-left: unset;

        span {
            font-size: 1.0rem;
        }
    }
    .input_title {
        width: 100%;
        margin-top: 15px;
    }
}
</style>
