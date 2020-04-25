<template>
    <div class="fiction">
        <div class="detail">
            <div class="title">小说标题</div>
            <div class="author">作者</div>
            <div class="label">标签</div>
            <div class="brief">简介</div>
        </div>
        <div class="directory">
            <table class="table_chapter">
                <tr class="table_header">
                    <th>章节号</th>
                    <th>标题</th>
                    <th>概要</th>
                    <th>字数</th>
                    <th>查看</th>
                    <th>评论</th>
                    <th>发布时间</th>
                </tr>
                <tr class="table_body">
                    <td class="chapter_number">2000</td>
                    <td class="chapter_title">精神小伙不请自来</td>
                    <td class="chapter_brief">与你同在（2）林雨桐一口饭一口菜的往嘴</td>
                    <td class="chapter_wordCount">3156</td>
                    <td class="chapter_viewCount">12569</td>
                    <td class="chapter_commentCount">217</td>
                    <td class="chapter_submitTime">2020-04-25</td>
                </tr>
                <tr class="table_body">
                    <td class="chapter_number">1</td>
                    <td class="chapter_title">精神小伙不请自来</td>
                    <td class="chapter_brief">与你同在（2）林雨桐一口饭一口菜的往嘴里塞，好些年没吃过老妈做的饭了，当年做的挺好吃的饭，如今除了吃出了怀旧的味道以外</td>
                    <td class="chapter_wordCount">3156</td>
                    <td class="chapter_viewCount">12569</td>
                    <td class="chapter_commentCount">217</td>
                    <td class="chapter_submitTime">2020-04-25</td>
                </tr>
                <tr class="table_body">
                    <td class="chapter_number">1</td>
                    <td class="chapter_title">精神小伙不请自来</td>
                    <td class="chapter_brief">与你同在（2）林雨桐一口饭一口菜的往嘴里塞，好些年没吃过老妈做的饭了，当年做的挺好吃的饭，如今除了吃出了怀旧的味道以外</td>
                    <td class="chapter_wordCount">3156</td>
                    <td class="chapter_viewCount">12569</td>
                    <td class="chapter_commentCount">217</td>
                    <td class="chapter_submitTime">2020-04-25</td>
                </tr>
                <tr class="table_body">
                    <td class="chapter_number">1</td>
                    <td class="chapter_title">精神小伙不请自来</td>
                    <td class="chapter_brief">与你同在（2）林雨桐一口饭一口菜的往嘴里塞，好些年没吃过老妈做的饭了，当年做的挺好吃的饭，如今除了吃出了怀旧的味道以外</td>
                    <td class="chapter_wordCount">3156</td>
                    <td class="chapter_viewCount">12569</td>
                    <td class="chapter_commentCount">217</td>
                    <td class="chapter_submitTime">2020-04-25</td>
                </tr>
                <tr class="table_body">
                    <td class="chapter_number">1</td>
                    <td class="chapter_title">精神小伙不请自来</td>
                    <td class="chapter_brief">与你同在（2）林雨桐一口饭一口菜的往嘴里塞，好些年没吃过老妈做的饭了，当年做的挺好吃的饭，如今除了吃出了怀旧的味道以外</td>
                    <td class="chapter_wordCount">3156</td>
                    <td class="chapter_viewCount">12569</td>
                    <td class="chapter_commentCount">217</td>
                    <td class="chapter_submitTime">2020-04-25</td>
                </tr>
                <tr class="table_body">
                    <td class="chapter_number">1</td>
                    <td class="chapter_title">精神小伙不请自来</td>
                    <td class="chapter_brief">与你同在（2）林雨桐一口饭一口菜的往嘴里塞，好些年没吃过老妈做的饭了，当年做的挺好吃的饭，如今除了吃出了怀旧的味道以外</td>
                    <td class="chapter_wordCount">3156</td>
                    <td class="chapter_viewCount">12569</td>
                    <td class="chapter_commentCount">217</td>
                    <td class="chapter_submitTime">2020-04-25</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Fiction"
    }
</script>

<style scoped>
    .fiction {
        width: 100%;
    }

    .detail {
        width: 100%;
        background-color: #f5f5f5;
        border: 1px solid #c4c4c4;
        border-radius: 6px;
        padding: 20px 50px;
        margin-bottom: 6px;
    }

    .title {
        font-size: 1.8em;
        font-weight: bolder;
        text-align: center;
        margin: 10px 0;
    }

    .author {
        font-size: 1.3em;
        font-weight: bold;
        text-align: center;
        margin: 20px 0;
    }

    .label {
        font-size: 1.2em;
        font-weight: bolder;
        text-align: center;
        margin: 20px 0;
    }

    .brief {
        font-size: 1.2em;
        text-align: center;
        margin: 20px 0;
    }

    .directory {
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
        width: 20%;
        font-size: 1.2em;
        font-weight: bold;
        text-align: center;
        padding: 8px 0;
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
        text-align: center;
    }

</style>
