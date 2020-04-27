<template>
    <div class="directory">
        <div class="fiction">
            <div class="fiction_title">诡秘之主</div>
            <div class="fiction_author">作者:遥望千山</div>
            <div class="fiction_wordCount">字数:3567</div>
            <div class="fiction_label">标签:<span>【同人】【种田】【书耽】【长佩】</span></div>
        </div>
        <div class="directory_main">
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
        name: "Directory"
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
        font-size: 1.2em;
        margin-right: 20px;
        display: inline-block;
    }

    .fiction_wordCount {
        font-size: 1.2em;
        margin-right: 20px;
        display: inline-block;
    }

    .fiction_label {
        font-size: 1.2em;
        display: inline-block;
        span {
            font-weight: bold;
        }
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
