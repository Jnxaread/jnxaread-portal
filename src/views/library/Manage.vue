<template>
    <div class="manage">
        <div class="fictionInfo" v-for="(fiction,index) in fictions" :key="index">
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
                    <Button class="operate_button" type="info" @click="goManageChapter(fiction.id)">管理章节</Button>
                    <!--<Button class="operate_button" type="info" @click="goNewChapter(fiction.id)">发布章节</Button>-->
                    <Dropdown class="operate_button">
                        <Button type="info">
                            发布章节
                        </Button>
                        <DropdownMenu slot="list">
                            <DropdownItem @click.native="goNewChapter(fiction.id,1)">普通章节</DropdownItem>
                            <DropdownItem @click.native="goNewChapter(fiction.id,0)">序章</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <Button class="operate_button" type="info">修改标签</Button>
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
                fictions: [],
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
                let params = {
                    page: this.paging.currentPage,
                };
                this.axios.post('/library/list/fiction/own', params).then(response => {
                    let resp = response.data;
                    if (resp.status !== 200) {
                        this.$Message.error(resp.msg);
                        this.$router.push('/signIn').then();
                        return;
                    }
                    this.fictions = resp.data.fictionList;
                    this.paging.total = resp.data.fictionCount;
                    this.$store.commit('setOwnFictions', this.fictions);
                });
            },
            goManageChapter(fictionId) {
                this.$router.push({path: '/directory', query: {id: fictionId}}).then();
            },
            /**
             * 跳转到发布章节界面
             * @param fictionId 作品id
             * @param type 章节类型，【0：普通章节；1：楔子】
             */
            goNewChapter(fictionId, type) {
                this.$router.push({path: '/new/chapter', query: {fid: fictionId, type: type}}).then();
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
    }

    .lastTime {
        font-size: 1.2em;
        line-height: 40px;
        text-align: right;

        span {
            font-weight: bold;
        }
    }

    .lastChapter {
        font-size: 1.2em;
        height: 35px;
        line-height: 35px;
        text-align: right;

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
</style>
