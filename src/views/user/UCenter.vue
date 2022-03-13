<template>
    <div class="uCenter">
        <div class="userInfo">
            <div class="username">{{ user.username }}</div>
            <div class="middleBox">
                <span>等级 Lv{{ user.level }}</span>
                <span>作品 {{ user.fictionCount }}</span>
                <span>章节 {{ user.chapterCount }}</span>
            </div>
            <div class="signature">{{ user.signature }}</div>
            <div class="introduction" v-html="user.introduction"></div>
        </div>
        <div class="worksInfo">
            <div class="tabHeader">
                <div :class="tabMain===1?'tabPane_selected':'tabPane'" @click="showPane(1)">作品</div>
                <div :class="tabMain===2?'tabPane_selected':'tabPane'" @click="showPane(2)">评论</div>
                <div :class="tabMain===3?'tabPane_selected':'tabPane'" @click="showPane(3)">主题</div>
                <div :class="tabMain===4?'tabPane_selected':'tabPane'" @click="showPane(4)">回复</div>
            </div>
            <div v-if="screenWidth>600">
                <div class="tabMain" v-if="tabMain===1">
                    <div class="fictionInfo" v-for="(fiction,index) in fictions" :key="index">
                        <div class="updateInfo">
                            <div class="title">
                                <router-link :to="'/fiction?id='+fiction.id">{{ fiction.title }}</router-link>
                            </div>
                            <div class="chapter">第{{ fiction.lastNumber }}章 {{ fiction.lastChapter }}</div>
                            <div class="updateTime">{{ fiction.lastTime | dateFormat }}</div>
                        </div>
                        <div class="briefInfo">
                            <div class="author">{{ fiction.author }}</div>
                            <div class="count">
                                <Icon class="count_icon" custom="iconfont icon-entypopencil" size="22"/>
                                {{ fiction.wordCount }}
                                <Icon class="count_icon" type="md-eye" size="22"/>
                                {{ fiction.viewCount }}
                                <Icon class="count_icon" type="md-text" size="22"/>
                                {{ fiction.commentCount }}
                            </div>
                            <div class="labelBox">
                                <div class="label" v-for="(tag,index) in fiction.tags" :key="index">{{ tag }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tabMain" v-else-if="tabMain===2">
                    <div class="commentInfo" v-for="(comment,index) in comments" :key="index">
                        <div class="comment_head">
                            <div class="reply_title">{{ comment.fictionTitle }}</div>
                            <div class="comment_time">发表于 {{ comment.createTime | dateFormat }}</div>
                        </div>
                        <div class="comment_content" v-html="comment.content"></div>
                    </div>
                </div>
                <div class="tabMain" v-else-if="tabMain===3">
                    <div class="topicInfo" v-for="(topic,index) in topics" :key="index">
                        <div class="topic_title">【{{ topic.label }}】{{ topic.title }}</div>
                        <div class="topic_right">
                            <Icon class="count_icon" type="md-text" size="22"/>
                            {{ topic.replyCount }}
                            <Icon class="count_icon" type="md-eye" size="22"/>
                            {{ topic.viewCount }}
                            <Icon class="count_icon" type="md-calendar" size="22"/>
                            {{ topic.createTime | dateFormat }}
                        </div>
                    </div>
                </div>
                <div class="tabMain" v-else>
                    <div class="replyInfo" v-for="(reply, index) in replies" :key="index">
                        <div class="reply_head">
                            <div class="reply_title">
                                <router-link :to="'/topic?id='+reply.topicId">
                                    {{ reply.topicTitle }}
                                </router-link>
                            </div>
                            <div class="head_right">
                                <div class="reply_time">发表于 {{ reply.createTime | dateFormat }}</div>
                                <div class="reply_floor">{{ reply.floor }}楼</div>
                            </div>
                        </div>
                        <div class="reply_body">
                            <div class="reply_quote" v-if="reply.quote!=0">
                                <div class="quote_icon_e">
                                    <div class="reply_quote_head">
                                    <span class="reply_quote_info">
                                        {{ reply.quotedReply.username }} 发表于 {{ reply.quotedReply.submitTime | dateFormat }}
                                    </span>
                                        <span class="reply_quote_floor">{{ reply.quotedReply.floor }}楼</span>
                                    </div>
                                    <span v-html="reply.quotedReply.content"></span>
                                </div>
                            </div>
                            <span v-html="reply.content"></span>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <div v-if="tabMain===1">
                    <div class="fictionInfo" v-for="(fiction,index) in fictions" :key="index">
                        <div>
                            <span class="title">
                                <router-link :to="'/fiction?id='+fiction.id">{{ fiction.title }}</router-link>
                            </span>
                            <span class="author">{{ fiction.author }}</span>
                        </div>
                        <div class="updateInfo">
                            <span class="chapter">第{{ fiction.lastNumber }}章 {{ fiction.lastChapter }}</span>
                            <Time class="updateTime" v-if="fiction.lastTime" :time="fiction.lastTime"/>
                        </div>
                        <div>
                            <span v-for="(tag,index) in fiction.tags" :key="index"> {{ tag }} </span>
                            <span class="count">
                                <Icon class="count_icon" custom="iconfont icon-entypopencil" size="16"/>
                                {{ fiction.wordCount }}
                                <Icon class="count_icon" type="md-text" size="16"/>
                                {{ fiction.commentCount }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="tabMain" v-else-if="tabMain===2">
                    <div class="commentInfo" v-for="(comment,index) in comments" :key="index">
                        <div class="comment_head">
                            <div class="reply_title">{{ comment.fictionTitle }}</div>
                            <div class="comment_time">
                                <Time class="updateTime" v-if="comment.createTime" :time="comment.createTime"/>
                            </div>
                        </div>
                        <div class="comment_content" v-html="comment.content"></div>
                    </div>
                </div>
                <div class="tabMain" v-else-if="tabMain===3">
                    <div class="topicInfo" v-for="(topic,index) in topics" :key="index">
                        <div class="topic_title">【{{ topic.label }}】{{ topic.title }}</div>
                        <div class="topic_right">
                            <Icon class="count_icon" type="md-text" size="16"/>
                            {{ topic.replyCount }}
                            <Icon class="count_icon" type="md-eye" size="16"/>
                            {{ topic.viewCount }}
                            <Icon class="count_icon" type="md-calendar" size="16"/>
                            <Time class="topic_time" v-if="topic.createTime" :time="topic.createTime"/>
                        </div>
                    </div>
                </div>
                <div class="tabMain" v-else>
                    <div class="replyInfo" v-for="(reply, index) in replies" :key="index">
                        <div class="reply_head">
                            <div class="reply_title">
                                <router-link :to="'/topic?id='+reply.topicId">
                                    {{ reply.topicTitle }}
                                </router-link>
                            </div>
                            <div class="head_right">
                                <div class="reply_time">
                                    <Time v-if="reply.createTime" :time="reply.createTime"/>
                                </div>
                                <div class="reply_floor">{{ reply.floor }}楼</div>
                            </div>
                        </div>
                        <div class="reply_body">
                            <div class="reply_quote" v-if="reply.quote!=0">
                                <div class="reply_quote_head">
                                    <span class="reply_quote_info">
                                        {{ reply.quotedReply.username }}
                                    </span>
                                    <span class="reply_quote_floor">{{ reply.quotedReply.floor }}楼</span>
                                </div>
                                <span v-html="reply.quotedReply.content"></span>
                            </div>
                            <span v-html="reply.content"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {Icon, Time} from 'view-design';

export default {
    components: {
        Icon,
        Time
    },
    name: "UCenter",
    data() {
        return {
            animated: false,
            tabMain: 1,
            fictions: [],
            comments: [],
            topics: [],
            replies: [],
            paging: {
                currentPage: 1,
                pageSize: 45,
                total: 0,
            },
        }
    },
    computed: {
        isLogin: function () {
            return this.$store.getters.isLogin;
        },
        user: function () {
            return this.$store.getters.getUser;
        },
        screenWidth: function () {
            return this.$store.getters.getScreenWidth;
        },
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            this.getFictionList();
        },
        getFictionList() {
            let params = {
                userId: this.user.id,
                page: this.paging.currentPage,
            };
            this.axios.post(this.api.library.fictions, params).then(response => {
                let resp = response.data;
                if (resp.status !== "000000") {
                    this.$Message.error(resp.msg);
                    return;
                }
                this.fictions = resp.data.fictions;
                this.paging.total = resp.data.fictionCount;
            });
        },
        getUserCommentList() {
            let params = {
                userId: this.user.id,
            };
            this.axios.post(this.api.library.comments, params).then(response => {
                let resp = response.data;
                if (resp.status !== "000000") {
                    this.$Message.error(resp.msg);
                    return;
                }
                this.comments = resp.data;
            });
        },
        getUserTopicList() {
            let params = {
                userId: this.user.id,
                page: this.paging.currentPage,
            };
            this.axios.post(this.api.forum.topics, params).then(response => {
                let resp = response.data;
                if (resp.status !== "000000") {
                    this.$Message.error(resp.msg);
                    return;
                }
                this.topics = resp.data.topicList;
                this.paging.total = resp.data.topicCount;
            });
        },
        getUserReplies() {
            let params = {
                userId: this.user.id,
                page: this.paging.currentPage,
            };
            this.axios.post('/forum/list/reply', params).then(response => {
                let resp = response.data;
                if (resp.status !== "000000") {
                    this.$Message.error(resp.msg);
                    return;
                }
                this.replies = resp.data;
            });
        },
        showPane(num) {
            if (num === 1) {
                this.tabMain = 1;
            } else if (num === 2) {
                this.tabMain = 2;
                this.getUserCommentList();
            } else if (num === 3) {
                this.tabMain = 3;
                this.getUserTopicList();
            } else {
                this.tabMain = 4;
                this.getUserReplies();
            }
        }
    }
}
</script>

<style scoped lang="scss">
.uCenter {
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
}

.middleBox {
    font-size: 1.15rem;
    text-align: center;
    margin-bottom: 5px;

    span {
        margin: 0 0.5rem;
    }
}

.signature {
    font-size: 1.15rem;
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

.commentInfo {
    width: 100%;
    padding: 1em 1.5em;
    overflow: hidden;
    /*border: 1px solid #e8e8e8;*/
    border: 1px solid #c5c8ce;
    border-radius: 8px;
    margin: 5px 0;
}

.comment_head {
    overflow: hidden;
}

.comment_time {
    float: right;
    margin-right: 1em;
    font-size: 1.2em;
}

.comment_content {
    font-size: 1.2em;
    line-height: 32px;
    margin: 0 15px 0 2.5em;
    padding: 0.5em 1.5em;
    border-radius: 6px;
    background-color: #e3e5e8;
}

.topicInfo {
    width: 100%;
    height: 50px;
    padding: 0 0.5em;
    overflow: hidden;
    line-height: 50px;
    border-bottom: 1px solid #e8e8e8;
}

.topic_title {
    float: left;
    font-size: 1.3em;
    font-weight: bold;
}

.topic_right {
    float: right;
    font-size: 16px;
    font-weight: bold;
}

.replyInfo {
    width: 100%;
    padding: 1em 1.5em;
    overflow: hidden;
    /*border: 1px solid #e8e8e8;*/
    border: 1px solid #c5c8ce;
    border-radius: 8px;
    margin: 5px 0;
}

.reply_head {
    padding-bottom: 2px;
    border-bottom: 1px solid #c4c4c4;
    overflow: hidden;
}

.reply_title {
    float: left;
    font-size: 1.3em;
    font-weight: bold;
    padding: 0 1em 0.5em 1em;

    a {
        color: #515a6e;
    }

    a:hover {
        color: #2d8cf0;
    }
}

.head_right {
    float: right;
}

.reply_time {
    display: inline-block;
    margin: 0 0.5em;
    font-size: 1.2em;
}

.reply_floor {
    display: inline-block;
    color: #999;
    margin: 0 0.5em;
    font-size: 1.4em;
    font-weight: bold;
}

.head_author {
    display: inline-block;
    padding: 0px 0 0 15px;
    /*border-right: 2px solid #a9a9a9;*/

    span {
        margin-left: 5px;
    }
}

.head_submitTime {
    display: inline-block;
    padding: 0 15px;
}

.head_floor {
    float: right;
}

.reply_body {
    font-size: 1.3em;
    line-height: 38px;
    padding: 0 15px;
    margin-top: 10px;
}

.reply_quote {
    width: 100%;
    margin: 10px 0px 15px 0px;
    padding: 10px 10px 10px 65px;
    border-radius: 10px;
    background: #e8eaec url("../../assets/icons/icon_quote_s.gif") no-repeat 20px 6px;
}

.quote_icon_e {
    padding: 0px 65px 10px 0px;
    background: url("../../assets/icons/icon_quote_e.gif") no-repeat 98% 100%;
}

.reply_quote_info {
    font-size: 1em;
    color: #808695;
}

.reply_quote_floor {
    font-size: 1.2em;
    font-weight: bold;
    color: darkgrey;
    margin-left: 15px;
}
</style>
<style scoped lang="scss">
@media screen and (max-width: 600px) {
    .worksInfo {
        padding: 15px 5px;
    }
    .fictionInfo {
        height: 90px;
        padding: 0 0.5rem;
    }
    .title {
        color: #505050;
        height: 30px;
        font-size: 1.0rem;
        font-weight: 700;
        line-height: 30px;
    }
    .author {
        float: right;
        height: 30px;
        margin-right: unset;
        font-size: 1.0rem;
        font-weight: 700;
        line-height: 30px;
    }
    .updateInfo {
        float: unset;
        margin: 5px 0;
    }
    .chapter {
        height: unset;
        font-size: 1.0rem;
        font-weight: unset;
    }
    .updateTime {
        float: right;
        height: unset;
        font-size: unset;
    }
    .count {
        float: right;
        height: unset;
        font-size: 0.9rem;
        font-weight: unset;
        margin-right: unset;
    }
    .count_icon {
        margin: 0 0 0 0.3rem;
    }
    .commentInfo {
        padding: 1rem 0;
    }
    .comment_content {
        font-size: 1.0rem;
        line-height: 30px;
        margin: 0 10px;
        padding: 0.5em 10px;
    }
    .topicInfo {
        height: auto;
        line-height: unset;
    }
    .topic_title {
        float: unset;
        font-size: 1.1rem;
    }
    .topic_right {
        float: unset;
        font-size: 1.0rem;
        font-weight: unset;
        text-align: right;
    }
    .topic_time {
        margin-left: 5px;
    }
    .replyInfo {
        padding: 1em 6px;
    }
    .head_right {
        float: unset;
    }
    .reply_floor {
        float: right;
        line-height: 25px;
    }
    .reply_title {
        font-size: 1.1rem;
        margin-left: 10px;
        padding: unset;
    }
    .reply_time {
        margin-left: 10px;
        font-size: 1.0rem;
        line-height: 25px;
    }
    .reply_body {
        font-size: 1.0rem;
        padding: 0 10px;
    }
    .reply_quote {
        padding: 10px;
        background: #e8eaec;
    }
    .reply_quote_floor {
        font-size: 1.2rem;
        margin-left: unset;
        float: right;
    }
}
</style>
