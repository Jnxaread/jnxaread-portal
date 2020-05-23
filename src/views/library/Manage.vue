<template>
    <div class="manage">
        <div class="fictionInfo" v-for="(fiction,index) in fictionList" :key="index">
            <div class="briefInfo">
                <div class="title">
                    <router-link :to="'/fiction?id='+fiction.id">
                        {{fiction.title}}
                    </router-link>
                </div>
                <div class="label">【作品标签】</div>
                <div class="count">章节数、字数、评论数等</div>
            </div>
            <div class="operateInfo">
                <div class="lastTime">上次更新时间：<span>2020-05-16</span></div>
                <div class="lastChapter">上次更新章节：<span>第37章 天剑奇缘</span></div>
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
    .manage {
        width: 100%;
    }

    .fictionInfo {
        width: 100%;
        line-height: 40px;
        background-color: #f5f5f5;
        border: 1px solid #c4c4c4;
        border-radius: 10px;
        padding: 12px 20px;
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

        a {
            color: #515a6e;
        }

        a:hover {
            color: #2d8cf0;
        }
    }

    .label {
        font-size: 1.2em;
        font-weight: lighter;
    }

    .count {
        font-size: 1.2em;
        margin-left: 6px;
    }

    .operateInfo {
        float: right;
        margin-right: 6px;
        text-align: right;
    }

    .lastTime {
        font-size: 1.2em;
        font-weight: lighter;

        span {
            font-weight: bold;
        }
    }

    .lastChapter {
        font-size: 1.2em;

        span {
            font-weight: bold;
        }
    }

    .operate {
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
