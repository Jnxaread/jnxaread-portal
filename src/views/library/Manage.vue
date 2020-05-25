<template>
    <div class="manage">
        <div class="fictionInfo" v-for="(fiction,index) in fictionList" :key="index">
            <div class="briefInfo">
                <div class="title">
                    <router-link :to="'/fiction?id='+fiction.id">
                        {{fiction.title}}
                    </router-link>
                </div>
                <div class="labelBox">
                    <div class="label" v-for="(tag,index) in fiction.tags" :key="index">{{tag}}</div>
                </div>
                <div class="count">
                    <Icon class="count_icon" custom="iconfont icon-entypopencil" size="18"/>
                    {{fiction.wordCount}}
                    <Icon class="count_icon" type="md-eye" size="18"/>
                    {{fiction.viewCount}}
                    <Icon class="count_icon" type="md-text" size="18"/>
                    {{fiction.commentCount}}
                </div>
            </div>
            <div class="operateInfo">
                <div class="lastTime">上次更新时间：<span>{{fiction.lastTime | dateFormat }}</span></div>
                <div class="lastChapter">上次更新章节：<span>第{{fiction.lastNumber}}章 {{fiction.lastChapter}}</span></div>
                <div class="operate">
                    <Button class="operate_button" type="info">修改标签</Button>
                    <Button class="operate_button" type="info" @click="goNewChapter(fiction.id)">发布章节</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Manage",
        data() {
            return {
                fictionList: [],
                paging: {
                    currentPage: 1,
                    pageSize: 30,
                    total: 0,
                },
            }
        },
        created() {
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
                this.getOwnFictionList();
            },
            getOwnFictionList() {
                let initParams = {
                    page: this.paging.currentPage,
                    terminal: navigator.userAgent
                };
                let params = this.qs.stringify(initParams);
                this.axios.post('/library/list/fiction/own', params).then(response => {
                    let resp = response.data;
                    if (resp.status != 200) {
                        this.$Message.error(resp.msg);
                        this.$router.push('/signIn').then();
                        return;
                    }
                    this.fictionList = resp.data.fictionList;
                    this.paging.total = resp.data.fictionCount;
                });
            },
            goNewChapter(fictionId) {
                this.$router.push({path: '/new/chapter', query: {id: fictionId}}).then();
            },
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/icons/custom/pencil/iconfont.css";

    .manage {
        width: 100%;
    }

    .fictionInfo {
        width: 100%;
        background-color: #f5f5f5;
        border: 1px solid #c4c4c4;
        border-radius: 10px;
        padding: 6px 20px;
        margin-bottom: 6px;
        overflow: hidden;
    }

    .briefInfo {
        float: left;
    }

    .title {
        color: #505050;
        font-size: 1.4em;
        font-weight: bolder;
        margin-left: 8px;
        line-height: 40px;

        a {
            color: #515a6e;
        }

        a:hover {
            color: #2d8cf0;
        }
    }

    .labelBox {
        height: 35px;
        line-height: 35px;
        font-size: 1.1em;
        font-weight: bolder;
        font-style: italic;
    }

    .label {
        display: inline-block;
        margin: 0 0.1em;
    }

    .count {
        height: 35px;
        line-height: 35px;
        font-size: 1.2em;
        margin-left: 6px;
    }

    .count_icon {
        margin: 0 0 0 0.5em;
    }

    .operateInfo {
        float: right;
        margin-right: 6px;
        text-align: right;
    }

    .lastTime {
        font-size: 1.2em;
        line-height: 40px;

        span {
            font-weight: bold;
        }
    }

    .lastChapter {
        font-size: 1.2em;
        height: 35px;
        line-height: 35px;

        span {
            font-weight: bold;
        }
    }

    .operate {
        height: 35px;
        line-height: 35px;
    }

    .operate_button {
        margin-left: 20px;
    }

    .ivu-btn {
        /*border: 0;*/
        box-shadow: none;
        /*background-color: #999;*/
    }

    .ivu-btn:focus {
        box-shadow: none;
    }

    .ivu-btn:active {
        box-shadow: none;
    }
</style>
