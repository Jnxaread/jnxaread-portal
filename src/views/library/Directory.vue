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
                    <th v-if="isManage">操作</th>
                </tr>
                <tr class="table_body" v-for="(chapter,index) in chapters" :key="index">
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
                    <td class="chapter_operate" v-if="isManage">
                        <Button class="chapter_button" size="small" type="primary" @click="editChapter(chapter)">修改
                        </Button>
                        <Button class="chapter_button" size="small" type="warning"
                                @click="hideChapter(chapter.id,!chapter.hided)">
                            {{chapter.hided===false?'隐藏':'显示'}}
                        </Button>
                        <Button class="chapter_button" size="small" type="error" @click="deleteChapter(chapter.id)">删除
                        </Button>
                    </td>
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
                fiction: {},
                chapters: [],
                isManage: false,
            }
        },
        beforeRouteEnter(to, from, next) {
            if (from.path === '/manage') {
                next(vm => {
                    vm.isManage = true;
                    vm.getFictionBrief(1);
                })
            } else {
                next(vm => {
                    vm.init();
                });
            }
        },
        computed: {},
        created() {
            // this.init();
        },
        methods: {
            init() {
                this.getFictionBrief(0);
            },
            getFictionBrief(type) {
                let params = {
                    'id': this.$route.query.id,
                    // 'page': this.paging.currentPage,
                };
                this.axios.post(this.api.library.fictionBrief, params).then(response => {
                    let resp = response.data;
                    if (resp.status != 200) {
                        this.$Message.error(resp.msg);
                        return;
                    }
                    this.fiction = resp.data;
                    this.getChapters(type);
                })
            },
            getChapters(type) {
                let params = {
                    fictionId: this.fiction.id,
                    type: type
                };
                this.axios.post(this.api.library.chapters, params).then(response => {
                    let resp = response.data;
                    if (resp.status !== 200) {
                        this.$Message.error(resp.msg);
                        this.$router.push('/signIn').then();
                        return;
                    }
                    this.chapters = resp.data;
                    sessionStorage.setItem(this.fiction.id, JSON.stringify(this.chapters));
                    // this.paging.total = resp.data.fictionCount;
                });
            },
            editChapter(chapter) {
                this.$router.push({path: '/new/chapter', query: {fid: chapter.fictionId, cid: chapter.id}}).then();
            },
            hideChapter(id, hide) {
                let params = {
                    id: id,
                    hide: hide
                };
                this.axios.post(this.api.library.hideChapter, params).then(response => {
                    let resp = response.data;
                    if (resp.status !== 200) {
                        this.$Message.error(resp.msg);
                        this.$router.push('/').then();
                        return;
                    }
                    this.getChapters(1);
                    this.$Message.success('操作成功');
                });
            },
            deleteChapter(id) {
                let content='是否删除该章节？一旦删除则不可恢复';
                this.instance('warning',content,()=>{
                    let params = {id: id};
                    this.axios.post(this.api.library.deleteChapter, params).then(response => {
                        let resp = response.data;
                        if (resp.status !== 200) {
                            this.$Message.error(resp.msg);
                            this.$router.push('/').then();
                            return;
                        }
                        this.getChapters(1);
                        this.$Message.success('删除成功');
                    });
                });
            },
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

        span {
            font-size: 1.2em;
            font-weight: bold;
        }
    }

    .fiction_wordCount {
        margin-right: 20px;
        display: inline-block;

        span {
            font-size: 1.2em;
            font-weight: bold;
        }
    }

    .labelBox {
        display: inline-block;
    }

    .label {
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
        width: 15%;
        text-align: center;
    }

    .chapter_operate {
        width: 20%;
        text-align: center;
    }

    .chapter_button {
        margin: 0 0.5rem;
    }
</style>
