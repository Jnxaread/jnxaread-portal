<template>
    <div class="pageView_error">
        <div class="slogan">
            迷失在次元空间
        </div>
        <div class="warning">
            {{tips}}
        </div>
    </div>
</template>

<script>
export default {
    name: "Error",
    data() {
        return {
            tips: null,
        }
    },
    computed: {
        status() {
            return this.$store.getters.getStatus;
        }
    },
    created() {
        if (this.status === "010001") {
            this.tips = "您的IP已被禁用";
        } else if (this.status === "010002") {
            this.tips = "网络繁忙，请稍后访问";
        }
    }
}
</script>

<style scoped lang="scss">
.slogan {
    font-size: 1.8rem;
    font-family: YouYuan, serif;
}

.warning {
    color: #f90;
    font-size: 1.5rem;
    margin-top: 60px;
}
</style>