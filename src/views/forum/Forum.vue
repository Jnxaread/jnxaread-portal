<template>
    <div class="forum">
        <div class="noticeArea">
            <table class="table_topic">
                <tr class="tr_head border_bottom">
                    <th class="th_title" align="left" colspan="2">
                        <div class="title_box">全部公告</div>
                    </th>
                    <th align="center">作者</th>
                    <th align="center">查看</th>
                    <th align="center">最后修改</th>
                </tr>
                <tr class="tr_topic" v-for="(notice, index) in noticeList" :key="index">
                    <td :class="index===noticeList.length-1?'notice_label':'notice_label border_bottom'" align="center">
                        【<span>{{ notice.label }}</span>】
                    </td>
                    <td :class="index===noticeList.length-1?'title':'title border_bottom'">
                        <router-link :to="'/notice?id='+notice.id">{{ notice.title }}</router-link>
                    </td>
                    <td :class="index===noticeList.length-1?'author':'author border_bottom'">
                        <h3>{{ notice.username }}</h3>
                        <!--<p>{{ notice.createTime | dateFormat }}</p>-->
                        <Time class="time" :time="notice.createTime"/>
                    </td>
                    <td :class="index===noticeList.length-1?'reply_view':'reply_view border_bottom'">
                        <p>{{ notice.viewCount }}</p>
                    </td>
                    <td :class="index===noticeList.length-1?'latestReply':'latestReply border_bottom'">
                        <h3>{{ notice.lastEdit }}</h3>
                        <!--<p>{{ notice.lastSubmitTime | dateFormat }}</p>-->
                        <Time class="time" :time="notice.lastEdit"/>
                    </td>
                </tr>
            </table>
        </div>
        <div class="topicArea">
            <table class="table_topic">
                <tr class="tr_head border_bottom">
                    <th class="th_title" align="left" colspan="2">
                        <div class="title_box">全部主题</div>
                    </th>
                    <th align="center">作者</th>
                    <th align="center">回复 / 查看</th>
                    <th align="center">最后发表</th>
                </tr>
                <tr class="tr_topic" v-for="(topic, index) in topics" :key="index">
                    <td :class="index===topics.length-1?'label':'label border_bottom'" align="center">
                        【<span>{{ topic.label }}</span>】
                    </td>
                    <td :class="index===topics.length-1?'title':'title border_bottom'">
                        <router-link :to="'/topic?id='+topic.id">{{ topic.title }}</router-link>
                    </td>
                    <td :class="index===topics.length-1?'author':'author border_bottom'">
                        <h3>{{ topic.username }}</h3>
                        <!--<p>{{ topic.createTime | dateFormat }}</p>-->
                        <Time class="time" :time="topic.createTime"/>
                    </td>
                    <td :class="index===topics.length-1?'reply_view':'reply_view border_bottom'">
                        <h3>{{ topic.replyCount }}</h3>
                        <p>{{ topic.viewCount }}</p>
                    </td>
                    <td :class="index===topics.length-1?'latestReply':'latestReply border_bottom'">
                        <h3>{{ topic.lastReply }}</h3>
                        <!--<p>{{ topic.lastSubmit | dateFormat }}</p>-->
                        <Time class="time" :time="topic.lastSubmit"/>
                    </td>
                </tr>
            </table>
            <div class="paging_box">
                <Page v-if="paging.total>0" :current="paging.currentPage" :page-size="paging.pageSize"
                      :total="paging.total" show-elevator @on-change="changePage"/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Forum",
        data() {
            return {
                noticeList: [],
                topics: [],
                paging: {
                    currentPage: 1,
                    pageSize: 45,
                    total: 0,
                },
                /*form: {
                    page: 1,
                    terminal: ''
                }*/
            }
        },
        computed: {
            isLogin: function () {
                return this.$store.getters.isLogin;
            },
        },
        created() {
            this.init();
        },
        methods: {
            init() {
                this.getNoticeList();
                this.getTopicList();
            },
            getNoticeList() {
                let params = {
                    level: this.isLogin ? this.$store.getters.getUser.level : 0,
                    page: this.paging.currentPage,
                };
                this.axios.post(this.api.forum.notices, params).then(response => {
                    let resp = response.data;
                    if (resp.status !== 200) {
                        this.$Message.error(resp.msg);
                        return;
                    }
                    this.noticeList = resp.data;
                });
            },
            getTopicList() {
                let params = {
                    userId: 0,
                    page: this.paging.currentPage,
                };
                this.axios.post(this.api.forum.topics, params).then(response => {
                    let resp = response.data;
                    if (resp.status !== 200) {
                        this.$Message.error(resp.msg);
                        return;
                    }
                    this.topics = resp.data.topicList;
                    this.paging.total = resp.data.topicCount;
                });
            },
            changePage(page) {
                this.paging.currentPage = page;
                this.getTopicList();
            },
        }
    }
</script>

<style scoped lang="scss">
    .forum {
        width: 100%;
    }

    .noticeArea {
        /*height: 100px;*/
        background-color: #f5f5f5;
        border: 1px solid #c4c4c4;
        border-radius: 6px;
        padding: 15px 25px;
        margin-bottom: 6px;
    }

    .topicArea {
        /*height: 300px;*/
        background-color: #f5f5f5;
        border: 1px solid #c4c4c4;
        border-radius: 6px;
        padding: 15px 25px;
        overflow: hidden;
    }

    .notice_label {
        width: 8%;
        color: red;
    }

    .table_topic {
        width: 100%;
        border-collapse: collapse;
    }

    .tr_head {
        height: 40px;
        font-size: 1.2em;
        font-weight: bold;
    }

    /*.th_title {
        border-left: 6px solid dodgerblue;
    }*/
    .title_box {
        padding-left: 15px;
        border-left: 6px solid dodgerblue;
    }

    .tr_topic {
        height: 60px;
    }

    .label {
        width: 8%;

        span {
            color: #ff78f2;
        }
    }

    .title {
        width: 52%;
        font-size: 1.2em;
        font-weight: bold;

        a {
            color: #515a6e;
        }

        a:hover {
            color: #2d8cf0;
        }
    }

    .author {
        text-align: center;

        h3 {
            color: #7673ff;
        }

        p {
            color: #ffa41e;
        }
    }

    .reply_view {
        text-align: center;
        width: 8%;
        font-size: 1.1em;

        h3 {
            color: cadetblue;
        }

        p {
            color: steelblue;
        }
    }

    .latestReply {
        text-align: center;

        h3 {
            color: #7673ff;
        }

        p {
            color: #ffa41e;
        }
    }

    .border_bottom {
        border-bottom: 1px solid #e8e8e8;
    }

    .paging_box {
        float: right;
        margin: 20px 0px 10px 0px;
    }

    .time {
        color: #ffa41e;
    }

</style>
