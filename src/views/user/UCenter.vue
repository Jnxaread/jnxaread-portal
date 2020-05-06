<template>
    <div class="ucenter">
        <div class="userInfo">
            <div class="username">用户名</div>
            <div class="introduction">
                <p>一个庸俗的人，一个没有脱离低级趣味的人</p>
                <br>
                <p>微博@Knife飘在水里</p>
                <p>M国度有备份</p>
            </div>
        </div>
        <div class="worksInfo">
            <div class="tabHeader">
                <div class="tabPane">作品</div>
                <div class="tabPane">评论</div>
                <div class="tabPane">主题</div>
                <div class="tabPane">回复</div>
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
            }
        },
        methods: {}
    }
</script>

<style scoped>
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

    .tabPane:active {
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

</style>
