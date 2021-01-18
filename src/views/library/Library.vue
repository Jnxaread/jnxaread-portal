<template>
    <div class="library">
        <div v-if="screenWidth>600">
            <div class="fictionInfo" v-for="(fiction,index) in fictions" :key="index">
                <div class="fictionInfo_left">
                    <div class="title">
                        <router-link :to="'/fiction?id='+fiction.id">{{ fiction.title }}</router-link>
                    </div>
                    <div class="chapter">第{{ fiction.lastNumber }}章 {{ fiction.lastChapter }}</div>
                    <div class="updateTime">{{ fiction.lastTime | dateFormat }}</div>
                </div>
                <div class="briefInfo">
                    <div class="author">{{ fiction.author }}</div>
                    <div class="count">
                        <Icon class="count_icon" custom="iconfont icon-entypopencil" size="22"/>
                        {{ fiction.wordCount }}
                        <Icon class="count_icon" type="md-eye" size="22"/>
                        {{ fiction.viewCount }}
                        <Icon class="count_icon" type="md-text" size="22"/>
                        {{ fiction.commentCount }}
                    </div>
                    <div class="labelBox">
                        <div class="label" v-for="(tag,index) in fiction.tags" :key="index">{{ tag }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="fictionInfo" v-for="(fiction,index) in fictions" :key="index">
                <div>
                    <span class="title">
                        <router-link :to="'/fiction?id='+fiction.id">{{ fiction.title }}</router-link>
                    </span>
                    <span class="author">{{ fiction.author }}</span>
                </div>
                <div class="updateInfo">
                    <span class="chapter">第{{ fiction.lastNumber }}章 {{ fiction.lastChapter }}</span>
                    <Time class="updateTime" v-if="fiction.lastTime" :time="fiction.lastTime"/>
                </div>
                <div>
                    <span v-for="(tag,index) in fiction.tags" :key="index"> {{ tag }} </span>
                    <span class="count">
                        <Icon class="count_icon" custom="iconfont icon-entypopencil" size="16"/>
                        {{ fiction.wordCount }}
                        <Icon class="count_icon" type="md-text" size="16"/>
                        {{ fiction.commentCount }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Library",
    data() {
        return {
            fictions: [],
            paging: {
                currentPage: 1,
                pageSize: 45,
                total: 0,
            },
        }
    },
    computed: {
        isLogin: function () {
            return this.$store.getters.isLogin;
        },
        screenWidth: function () {
            return this.$store.getters.getScreenWidth;
        },
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            this.getFictionList();
        },
        getFictionList() {
            let params = {
                userId: 0,
                page: this.paging.currentPage,
            };
            this.axios.post(this.api.library.fictions, params).then(response => {
                let resp = response.data;
                if (resp.status !== 200) {
                    this.$Message.error(resp.msg);
                    return;
                }
                this.fictions = resp.data.fictions;
                this.paging.total = resp.data.fictionCount;
            });
        },
    }
}
</script>

<style scoped lang="scss">
@import "../../assets/icons/custom/pencil/iconfont.css";

.library {
    width: 100%;
}

.fictionInfo {
    width: 100%;
    height: 120px;
    background-color: #f5f5f5;
    border: 1px solid #c4c4c4;
    border-radius: 10px;
    padding: 0 20px;
    margin-bottom: 6px;
}

.fictionInfo_left {
    float: left;
    margin-left: 6px;
}

.title {
    height: 50px;
    color: #505050;
    font-size: 18px;
    font-weight: bolder;
    line-height: 50px;

    a {
        color: #515a6e;
    }

    a:hover {
        color: #2d8cf0;
    }

}

.chapter {
    height: 35px;
    font-size: 16px;
    font-weight: bold;
}

.updateTime {
    height: 35px;
    font-size: 16px;
}

.briefInfo {
    float: right;
    text-align: right;
}

.author {
    height: 50px;
    color: #505050;
    font-size: 18px;
    font-weight: bolder;
    line-height: 50px;
    margin-right: 6px;
}

.count {
    height: 35px;
    font-size: 16px;
    font-weight: bold;
    margin-right: 6px;
}

.count_icon {
    margin: 0 0 0 0.5em;
}

.labelBox {
    height: 35px;
    font-size: 1.1em;
    font-weight: bold;
    font-style: italic;
}

.label {
    display: inline-block;
    margin: 0 0.1em;
}

@media screen and (max-width: 600px) {
    .fictionInfo {
        //overflow: hidden;
        height: auto;
        padding: 5px;
        margin-bottom: 6px;
    }
    .title {
        height: 30px;
        font-size: 1.0rem;
        font-weight: 700;
        line-height: 30px;
    }
    .author {
        float: right;
        height: 30px;
        margin-right: unset;
        font-size: 1.0rem;
        font-weight: 700;
        line-height: 30px;
    }
    .updateInfo {
        margin: 5px 0;
    }
    .chapter {
        height: unset;
        font-size: 1.0rem;
        font-weight: unset;
    }
    .updateTime {
        float: right;
        height: unset;
        font-size: unset;
    }
    .count {
        float: right;
        height: unset;
        font-size: 0.9rem;
        font-weight: unset;
        margin-right: unset;
    }
    .count_icon {
        margin: 0 0 0 0.3rem;
    }
}
</style>
