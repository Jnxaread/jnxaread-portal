<template>
    <div class="directory">
        <div class="fiction">
            <div class="fiction_title">{{fiction.title}}</div>
            <div class="fiction_author">作者：<span>{{fiction.author}}</span></div>
            <div class="fiction_wordCount">字数：<span>{{fiction.wordCount}}</span></div>
            <div class="labelBox">
                标签:
                <div class="label" v-for="(tag,index) in fiction.tags" :key="index">
                    【{{tag}}】
                </div>
            </div>
        </div>
        <div class="directory_main">
            <table class="table_chapter">
                <tr class="table_header">
                    <th>章节号</th>
                    <th>标题</th>
                    <!--<th>概要</th>-->
                    <th>字数</th>
                    <th>查看</th>
                    <th>评论</th>
                    <th>发布时间</th>
                </tr>
                <tr class="table_body" v-for="(chapter,index) in chapterList" :key="index">
                    <td class="chapter_number">{{chapter.number}}</td>
                    <td class="chapter_title">
                        <router-link :to="'/chapter?id='+chapter.id">
                            {{chapter.title}}
                        </router-link>
                    </td>
                    <!--<td class="chapter_brief">与你同在（2）林雨桐一口饭一口菜的往嘴</td>-->
                    <td class="chapter_wordCount">{{chapter.wordCount}}</td>
                    <td class="chapter_viewCount">{{chapter.viewCount}}</td>
                    <td class="chapter_commentCount">{{chapter.commentCount}}</td>
                    <td class="chapter_submitTime">{{chapter.createTime | dateFormat}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Directory",
        data() {
            return {
                fiction:{},
                chapterList: [],
            }
        },
        created() {
            this.init();
        },
        methods: {
            init() {
                this.getFictionBrief();
            },
            getFictionBrief(){
                let initParams = {
                    'id': this.$route.query.id,
                    // 'page': this.paging.currentPage,
                    'terminal': navigator.userAgent
                };
                let params = this.qs.stringify(initParams);
                this.axios.post('/library/brief/fiction', params).then(response => {
                    let resp = response.data;
                    if (resp.status != 200) {
                        this.$Message.error(resp.msg);
                        return;
                    }
                    this.fiction = resp.data;
                    this.getChapterList();
                })
            },
            getChapterList() {
                let initParams = {
                    fictionId: this.fiction.id,
                    terminal: navigator.userAgent
                };
                let params = this.qs.stringify(initParams);
                this.axios.post('/library/list/chapter', params).then(response => {
                    let resp = response.data;
                    if (resp.status != 200) {
                        this.$Message.error(resp.msg);
                        this.$router.push('/signIn').then();
                        return;
                    }
                    this.chapterList = resp.data;
                    // this.paging.total = resp.data.fictionCount;
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    .directory {
        width: 100%;

    }

    .fiction {
        width: 100%;
        background-color: #f5f5f5;
        border: 1px solid #c4c4c4;
        border-radius: 6px;
        padding: 15px 25px;
        margin-bottom: 6px;
    }

    .fiction_title {
        font-size: 1.8em;
        font-weight: bolder;
        margin-bottom: 10px;
    }

    .fiction_author {
        margin-right: 20px;
        display: inline-block;
        span{
            font-size: 1.2em;
            font-weight: bold;
        }
    }

    .fiction_wordCount {
        margin-right: 20px;
        display: inline-block;
        span{
            font-size: 1.2em;
            font-weight: bold;
        }
    }

    .labelBox {
        display: inline-block;
    }

    .label{
        font-size: 1.2em;
        font-weight: bold;
        display: inline-block;
        /*margin: 0 0.1em;*/
    }

    .directory_main {
        width: 100%;
        background-color: #f5f5f5;
        border: 1px solid #c4c4c4;
        border-radius: 6px;
        padding: 10px 15px;
        margin-bottom: 6px;
    }

    .table_chapter {
        width: 100%;
        border-collapse: collapse;
        margin-top: 5px;
    }

    .table_header {
        height: 40px;
        font-size: 1.3em;
        font-weight: bold;
        border-bottom: 2px solid #999;
    }

    .table_body {
        border-bottom: 1px solid #ddd;
    }

    .chapter_number {
        width: 6%;
        font-size: 1.2em;
        font-weight: bold;
        text-align: center;
    }

    .chapter_title {
        /*width: 20%;*/
        font-size: 1.2em;
        font-weight: bold;
        text-align: center;
        padding: 8px 0;
        a {
            color: #515a6e;
        }

        a:hover {
            color: #2d8cf0;
        }
    }

    .chapter_brief {
        width: 45%;
        font-size: 1.1em;
        font-weight: bold;
        padding: 8px 0;
    }

    .chapter_wordCount {
        text-align: center;
    }

    .chapter_viewCount {
        text-align: center;
    }

    .chapter_commentCount {
        text-align: center;
    }

    .chapter_submitTime {
        width:15%;
        text-align: center;
    }
</style>
