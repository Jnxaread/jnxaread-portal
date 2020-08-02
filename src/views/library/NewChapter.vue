<template>
    <div class="newChapter">
        <div class="container">
            <div class="prompt">发布章节 / {{fiction.title}}</div>
            <div class="topic_top">
                <div class="topic_label">
                    <!--<InputNumber v-model="newChapter.number" :min="1" :max="10000" size="large" placeholder="章节号"
                                 style="width: 86px;"/>-->
                    <span v-if="type===1">第 {{newChapter.number}} 章</span>
                    <span v-else>序章</span>
                </div>
                <div class="topic_title">
                    <Input v-model="newChapter.title" maxlength="35" show-word-limit size="large" placeholder="请输入标题"
                           style="width: 60%;"/>
                    <span>最多输入35个字符</span>
                </div>
            </div>
            <div class="topic_content">
                <editor ref="editor"></editor>
            </div>
            <div class="restrictedBox">
                <div class="restrictedTitle">限制等级</div>
                <div class="restrictedInput">
                    <InputNumber :max="5" :min="0" size="large" v-model="newChapter.restricted"></InputNumber>
                </div>
            </div>
            <Button class="submit_button" type="primary" size="large" @click="submitChapter()">保存章节</Button>
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
                fiction: {},
                newChapter: {
                    id: null,
                    fictionId: this.$route.query.fid,
                    number: null,
                    title: '',
                    content: '',
                    restricted: 0,
                },
                type: this.$route.query.type,
                isEdit: false,
            }
        },
        beforeRouteEnter(to, from, next) {
            if (from.path === '/directory') {
                next(vm => {
                    vm.getChapter();
                })
            } else {
                next();
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
                        content: '您还未登录，请登录'
                    });
                    this.$router.push('/signIn').then();
                    return;
                }
                let ownFictions = this.$store.getters.getOwnFictions;
                let flag = false;
                for (let i = 0; i < ownFictions.length; i++) {
                    if (ownFictions[i].id === this.$route.query.fid) {
                        flag = true;
                        break;
                    }
                }
                if (!flag) {
                    this.$router.push('/').then();
                    this.$Message.error('参数错误');
                    return;
                }
                this.getFictionBrief();
            },
            getFictionBrief() {
                let params = {
                    id: this.$route.query.fid,
                    // page: this.paging.currentPage,
                };
                this.axios.post(this.api.library.fictionBrief, params).then(response => {
                    let resp = response.data;
                    if (resp.status !== 200) {
                        this.$Message.error(resp.msg);
                        return;
                    }
                    this.fiction = resp.data;
                    if (this.type === 1) {
                        this.newChapter.number = this.fiction.lastNumber + 1;
                    } else {
                        this.newChapter.number = 0;
                    }
                })
            },
            getChapter() {
                let params = {
                    id: this.$route.query.cid,
                };
                this.axios.post(this.api.library.chapterBrief, params).then(response => {
                    let resp = response.data;
                    if (resp.status !== 200) {
                        this.$Message.error(resp.msg);
                        this.$router.push('/').then();
                        return;
                    }
                    this.newChapter.id = resp.data.id;
                    // this.newChapter.fictionId = resp.data.fictionId;
                    // this.newChapter.userId = this.$store.getters.getUser.id;
                    this.newChapter.number = resp.data.number;
                    this.newChapter.title = resp.data.title;
                    this.newChapter.content = resp.data.content;
                    this.newChapter.restricted = resp.data.restricted;
                    this.$store.commit('setContent', this.newChapter.content);
                    this.$refs.editor.setContent();
                });
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
                let api;
                if (this.newChapter.id == null) {
                    api = this.api.library.newChapter;
                } else {
                    api = this.api.library.editChapter;
                }
                this.axios.post(api, this.newChapter).then(response => {
                    let resp = response.data;
                    if (resp.status !== 200) {
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
        font-family: YouYuan, serif;
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
        font-size: 1.4em;
        vertical-align: middle;
    }

    .topic_title {
        width: 80%;
        display: inline;
        margin-left: 15px;

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

    /*.prologue {
        width: 100%;
        font-size: 1.5rem;
        text-align: center;
        margin-bottom: 20px;
    }*/

    .topic_content {
        width: 100%;
        margin-top: 15px;
    }

    .topic_content /deep/ .w-e-text {
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
