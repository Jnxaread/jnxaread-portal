<template>
    <div class="notice">
        <div class="title">【{{notice.label}}】{{notice.title}}</div>
        <div class="info">
            <div class="info_author">
                <Icon type="md-person" size="22"/>
                <span>{{notice.username}}</span>
            </div>
            <div class="info_submitTime">发表于{{ notice.createTime | dateFormat }}</div>
            <div class="info_floor">楼主</div>
        </div>
        <div class="content" v-html="notice.content"></div>
        <div class="reply_operate">
            <a @click="showModal(0)">回复</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Notice",
        data() {
            return {
                notice: {},
            }
        },
        created: function () {
            this.init();
        },
        methods: {
            init() {
                this.getNotice();
            },
            getNotice() {
                let params = {
                    'id': this.$route.query.id,
                };
                // let params = this.qs.stringify(initParams);
                this.axios.post('/forum/detail/notice', params).then(response => {
                    let resp = response.data;
                    if (resp.status != 200) {
                        this.$Message.error(resp.msg);
                        this.$router.push('/forum').then();
                        return;
                    }
                    this.notice = resp.data;
                });
            },
        }
    }
</script>

<style scoped lang="scss">
    .notice {
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
</style>
