<template>
    <div class="ucenter">
        <div class="userInfo">
            <div class="username">{{user.username}}</div>
            <div class="introduction" v-html="user.introduction"></div>
        </div>
        <div class="worksInfo">
            <div class="tabHeader">
                <div :class="tabMain===1?'tabPane_selected':'tabPane'" @click="showPane(1)">作品</div>
                <div :class="tabMain===2?'tabPane_selected':'tabPane'" @click="showPane(2)">评论</div>
                <div :class="tabMain===3?'tabPane_selected':'tabPane'" @click="showPane(3)">主题</div>
                <div :class="tabMain===4?'tabPane_selected':'tabPane'" @click="showPane(4)">回复</div>
            </div>
            <div class="tabMain" v-if="tabMain===1">
                <div class="fictionInfo" v-for="(fiction,index) in fictions" :key="index">
                    <div class="updateInfo">
                        <div class="title">
                            <router-link :to="'/fiction?id='+fiction.id">{{ fiction.title }}</router-link>
                        </div>
                        <div class="chapter">第{{fiction.lastNumber}}章 {{fiction.lastChapter}}</div>
                        <div class="updateTime">{{fiction.lastTime | dateFormat }}</div>
                    </div>
                    <div class="briefInfo">
                        <div class="author">{{fiction.author}}</div>
                        <div class="count">
                            <Icon class="count_icon" custom="iconfont icon-entypopencil" size="22"/>
                            {{fiction.wordCount}}
                            <Icon class="count_icon" type="md-eye" size="22"/>
                            {{fiction.viewCount}}
                            <Icon class="count_icon" type="md-text" size="22"/>
                            {{fiction.commentCount}}
                        </div>
                        <div class="labelBox">
                            <div class="label" v-for="(tag,index) in fiction.tags" :key="index">{{tag}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tabMain" v-else-if="tabMain===2">
                差可快了之神！101
            </div>
            <div class="tabMain" v-else-if="tabMain===3">
                差可快了之神！102
            </div>
            <div class="tabMain" v-else>
                差可快了之神！103
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UCenter",
        data() {
            return {
                animated: false,
                tabMain: 1,
                fictions: [],
                paging: {
                    currentPage: 1,
                    pageSize: 45,
                    total: 0,
                },
            }
        },
        computed: {
            user: function () {
                return this.$store.getters.getUser;
            }
        },
        created(){
            this.init();
        },
        methods: {
            init(){
                this.getFictionList();
            },
            getFictionList() {
                let initParams = {
                    'page': this.paging.currentPage,
                    'terminal': navigator.userAgent
                };
                let params = this.qs.stringify(initParams);
                this.axios.post('/library/list/fiction', params).then(response => {
                    let resp = response.data;
                    if (resp.status != 200) {
                        this.$Message.error(resp.msg);
                        return;
                    }
                    this.fictions = resp.data.fictionList;
                    this.paging.total = resp.data.fictionCount;
                });
            },
            showPane(num) {
                if (num === 1) {
                    this.tabMain = 1;
                } else if (num === 2) {
                    this.tabMain = 2;
                } else if (num === 3) {
                    this.tabMain = 3;
                } else {
                    this.tabMain = 4;
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .ucenter {
        width: 100%;
    }

    .userInfo {
        width: 100%;
        background-color: #f5f5f5;
        border: 1px solid #c4c4c4;
        border-radius: 6px;
        padding: 15px 25px;
        margin-bottom: 6px;
    }

    .username {
        font-size: 1.6em;
        font-weight: bold;
        text-align: center;
        padding-bottom: 20px;
        border-bottom: 1px solid #e8e8e8;
    }

    .introduction {
        color: #17233d;
        font-size: 1.2em;
        text-align: center;
        line-height: 35px;
        padding-top: 25px;
    }

    .worksInfo {
        width: 100%;
        background-color: #f5f5f5;
        border: 1px solid #c4c4c4;
        border-radius: 6px;
        padding: 15px 25px;
        margin-bottom: 6px;
    }

    .tabHeader {
        border-bottom: 1px solid #ddd;
    }

    .tabPane {
        font-size: 1.4em;
        font-weight: bold;
        padding: 8px 12px;
        margin-right: 8px;
        display: inline-block;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        user-select: none;
    }

    .tabPane:hover {
        font-size: 1.4em;
        font-weight: bold;
        padding: 8px 12px;
        margin-right: 8px;
        cursor: pointer;
        display: inline-block;
        background-color: #e8eaec;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
    }

    .tabPane_selected {
        font-size: 1.4em;
        font-weight: bold;
        padding: 7px 11px 8px 11px;
        margin-right: 8px;
        display: inline-block;
        border-top: 1px solid #ddd;
        border-left: 1px solid #ddd;
        border-right: 1px solid #ddd;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        background-color: #f5f8fa;
        z-index: 1;
        position: relative;
        top: 1px;
    }

    .fictionInfo {
        width: 100%;
        height: 120px;
        padding: 0 0.5em;
        border-bottom: 1px solid #e8e8e8;
    }

    .updateInfo {
        float: left;
        margin-left: 6px;
    }

    .title {
        height: 50px;
        color: #505050;
        font-size: 18px;
        font-weight: bolder;
        line-height: 50px;

        a {
            color: #515a6e;
        }

        a:hover {
            color: #2d8cf0;
        }

    }

    .chapter {
        height: 35px;
        font-size: 16px;
        font-weight: bold;
    }

    .updateTime {
        height: 35px;
        font-size: 16px;
    }

    .briefInfo {
        float: right;
        text-align: right;
    }

    .author {
        height: 50px;
        color: #505050;
        font-size: 18px;
        font-weight: bolder;
        line-height: 50px;
        margin-right: 6px;
    }

    .count {
        height: 35px;
        font-size: 16px;
        font-weight: bold;
        margin-right: 6px;
    }

    .count_icon {
        margin: 0 0 0 0.5em;
    }

    .labelBox {
        height: 35px;
        font-size: 1.1em;
        font-weight: bold;
        font-style: italic;
    }

    .label {
        display: inline-block;
        margin: 0 0.1em;
    }

</style>
