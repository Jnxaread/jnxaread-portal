<template>
    <div class="notice">
        <div class="title">【{{notice.label}}】{{notice.title}}</div>
        <div class="info">
            <div class="info_author">
                <Icon class="authorIcon" type="md-person" size="22"/>
                <span>{{notice.username}}</span>
            </div>
            <div class="info_submitTime">
                发表于
                <Time v-if="notice.createTime" :time="notice.createTime"/>
            </div>
            <div class="info_floor">楼主</div>
        </div>
        <div class="content" v-html="notice.content"></div>
    </div>
</template>

<script>
import {Icon, Time} from "view-design";

export default {
    name: "Notice",
    components: {
        Icon,
        Time
    },
    data() {
        return {
            notice: {},
        }
    },
    created: function () {
        this.init();
    },
    computed: {
        screenWidth: function () {
            return this.$store.getters.getScreenWidth;
        }
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
                if (resp.status !== "000000") {
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
    padding: 15px;
}
</style>
<style scoped lang="scss">
@media screen and (max-width: 600px) {
    .notice {
        padding: 0 10px;
    }
    .title {
        font-size: 1.3rem;
    }
    .info {
        padding-left: 10px;
        padding-right: 15px;
    }
    .info_author {
        padding: unset;
        border-right: unset;
    }
    .authorIcon {
        display: none;
    }
    .info_submitTime {
        display: none;
    }
}
</style>
