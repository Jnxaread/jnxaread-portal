<template>
    <div class="pageView_home">
        <div class="section">
            <div class="section_title">原创作品</div>
            <div class="section_content" v-for="(fiction,index) in fictions" :key="index">
                <div class="section_fiction">
                    <div class="fiction_left">
                        <div class="fiction_title">
                            <router-link :to="'/fiction?id='+fiction.id">{{fiction.title}}</router-link>
                        </div>
                        <div class="fiction_brief">
                            <div class="fiction_tag" v-for="(tag,index) in fiction.tags" :key="index">
                                {{tag}}
                            </div>
                        </div>
                    </div>
                    <div class="fiction_right">
                        <div class="fiction_author">{{fiction.author}}</div>
                        <div class="fiction_updateTime">{{fiction.lastTime | dateFormat}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="section">
            <div class="section_title">日常交流</div>
            <div class="section_content">
                <div class="section_fiction" v-for="(topic,index) in topics" :key="index">
                    <div class="fiction_left">
                        <div class="fiction_title">
                            <router-link :to="'/topic?id='+topic.id">{{topic.title}}</router-link>
                        </div>
                        <div class="fiction_brief" v-html="topic.content"></div>
                    </div>
                    <div class="fiction_right">
                        <div class="fiction_author">{{topic.lastReply}}</div>
                        <div class="fiction_updateTime">{{topic.lastSubmit | dateFormat}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Home',
        data() {
            return {
                fictions: [],
                topics: [],
            }
        },
        created() {
            this.init();
        },
        methods: {
            init() {
                this.getLatestFictions();
                this.getLatestTopics();
            },
            getLatestFictions() {
                this.axios.post(this.api.library.latestFictions).then(response => {
                    let resp = response.data;
                    if (resp.status !== 200) {
                        this.instance('error', resp.msg);
                        return;
                    }
                    this.fictions = resp.data;
                })
            },
            getLatestTopics() {
                this.axios.post(this.api.forum.latestTopics).then(response => {
                    let resp = response.data;
                    if (resp.status !== 200) {
                        this.instance('error', resp.msg);
                        return;
                    }
                    this.topics = resp.data;
                })
            },
        }
    }
</script>

<style scoped lang="scss">
    .section {
        width: 100%;
        padding: 0.3rem 0.5rem;
        background-color: #f5f5f5;
        border: 1px solid #c4c4c4;
        border-radius: 10px;
        margin-bottom: 0.4rem;
    }

    .section_title {
        font-size: 1.2rem;
        font-weight: bold;
        color: #505050;
        padding: 0.6rem 0.8rem;
        border-bottom: 1px solid #c4c4c4;
    }


    .section_fiction {
        overflow: hidden;
        padding: 0.2rem 0.6rem;
    }

    .fiction_left {
        float: left;
    }

    .fiction_title {
        font-size: 1.15rem;
        font-weight: bold;
        color: #505050;
        line-height: 27px;

        a {
            color: #515a6e;
        }

        a:hover {
            color: #2d8cf0;
        }
    }

    .fiction_brief {
        height: 25px;
        font-size: 1.0rem;
        color: #908d8d;
        line-height: 25px;
        max-width: 220px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
    }

    .fiction_tag {
        display: inline-block;
        margin: 0 0.1rem;
    }

    .fiction_right {
        float: right;
        text-align: right;
    }

    .fiction_author {
        font-size: 1.05rem;
        font-weight: bold;
        color: #505050;
        line-height: 27px;
    }

    .fiction_updateTime {
        line-height: 25px;
        font-size: 0.95rem;
        color: #505050;
    }
</style>
