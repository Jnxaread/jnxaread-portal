<template>
    <div class="pageView_home">
        <div class="section">
            <div class="section_title">原创作品</div>
            <div class="section_content" v-for="(fiction,index) in fictions" :key="index">
                <div class="section_fiction">
                    <div class="fiction_left">
                        <div class="fiction_title">{{fiction.title}}</div>
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
            <div class="section_title">站务管理</div>
            <div class="section_content">
                <div class="section_fiction">
                    <div class="fiction_left">
                        <div class="fiction_title">真是个不懂风韵的东西</div>
                        <div class="fiction_brief">这里是斗气的世界，非常爽</div>
                    </div>
                    <div class="fiction_right">
                        <div class="fiction_author">天蚕土豆</div>
                        <div class="fiction_updateTime">2020-06-09 15:35:36</div>
                    </div>
                </div>
                <div class="section_fiction">
                    <div class="fiction_left">
                        <div class="fiction_title">斗破苍穹</div>
                        <div class="fiction_brief">这里是斗气的世界，非常爽</div>
                    </div>
                    <div class="fiction_right">
                        <div class="fiction_author">天蚕土豆</div>
                        <div class="fiction_updateTime">2020-06-09 15:35:36</div>
                    </div>
                </div>
                <div class="section_fiction">
                    <div class="fiction_left">
                        <div class="fiction_title">斗破苍穹</div>
                        <div class="fiction_brief">这里是斗气的世界，非常爽</div>
                    </div>
                    <div class="fiction_right">
                        <div class="fiction_author">天蚕土豆</div>
                        <div class="fiction_updateTime">2020-06-09 15:35:36</div>
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
                let params = {userId: 0};
                this.axios.post(this.api.library.latestFictions, params).then(response => {
                    let resp = response.data;
                    if (resp.status !== 200) {
                        this.instance('error', resp.msg);
                        return;
                    }
                    this.fictions = resp.data;
                })
            },
            getLatestTopics() {
                this.axios.post(this.api.forum.latestTopics, this.form).then(response => {
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

<style scoped>
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
    }

    .fiction_brief {
        font-size: 1.0rem;
        color: #908d8d;
        line-height: 25px;
    }

    .fiction_tag{
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
