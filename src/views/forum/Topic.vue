<template>
    <div class="topic">
        <div class="detail">
            <div class="title">【树洞】精神小伙不请自来</div>
            <div class="info">
                <div class="info_author">
                    <Icon type="md-person" size="22"/>
                    <span>遥望千山</span>
                </div>
                <div class="info_submitTime">发表于2020-04-25</div>
                <div class="info_floor">楼主</div>
            </div>
            <div class="content">
                <p>⑤帖因为回复楼层过多被锁定了。等不到前三任楼主出来发帖。于是新开一帖。</p>
                <p>！不能涉及边限。希望本楼可以像⑤帖一样最终可以寿终正寝~</p>
                <p>注意:不能询问真实信息</p>
                <p>不能辱骂或者人身攻击</p>
                <p>不能违反站规</p>
                <p>不能以捉弄对方为目的</p>
                <p>copy from 酒酿咸鱼/gemstone</p>
                <p>祝：大家聊天开心^_^</p>
            </div>
        </div>
        <div class="replyArea">
            <div class="detail">
                <div class="info">
                    <div class="info_author">
                        <Icon type="md-person" size="22"/>
                        <span>发布者</span>
                    </div>
                    <div class="info_submitTime">2020-04-25 19:32:56</div>
                    <div class="info_floor">1楼</div>
                </div>
                <div class="content">主要内容</div>
            </div>
        </div>
        <div class="submitArea">
            <editor ref="editor" :isClear="isClear"></editor>
            <Button class="submit_button" type="primary" size="large" @click="submitReply(0)">回复</Button>
        </div>
    </div>
</template>

<script>
    import Editor from '../../components/Editor';

    export default {
        name: "Topic",
        components: {Editor},
    }
</script>

<style scoped lang="scss">
    .topic {
        width: 100%;
    }

    .detail {
        width: 100%;
        background-color: #f5f5f5;
        border: 1px solid #c4c4c4;
        border-radius: 6px;
        padding: 20px 35px;
        margin-bottom: 6px;
    }

    .title {
        font-size: 1.6em;
        font-weight: bold;
        margin-bottom: 15px;
        border-bottom: 3px solid #1c5899;
    }

    .info {
        font-size: 1.1em;
        padding-bottom: 2px;
        border-bottom: 1px solid #c4c4c4;
    }

    .info_author {
        display: inline-block;
        padding: 0px 15px;
        border-right: 2px solid #a9a9a9;

        span {
            margin-left: 5px;
        }
    }

    .info_submitTime {
        display: inline-block;
        padding: 0 15px;
    }

    .info_floor {
        float: right;
    }

    .content {
        font-size: 1.3em;
        line-height: 38px;
        padding: 0 15px;
        margin-top: 20px;
    }

    .submitArea {
        width: 100%;
        background-color: #f5f5f5;
        border: 1px solid #c4c4c4;
        border-radius: 6px;
        padding: 35px 35px 25px 35px;
        margin-top: 20px;
    }

    .submit_button {
        width: 120px;
    }
</style>
