<template>
    <div id="app" class="app">
        <div class="header">
            <div class="logo" :style="{ width: logoWidth + 'px' }">
                <router-link to="/">
                    谨下阅读
                </router-link>
            </div>
            <div class="nav_module">
                <div class="nav_item">
                    <router-link to="/">
                        文库
                    </router-link>
                </div>
                <div class="nav_item">
                    <router-link to="/forum">
                        论坛
                    </router-link>
                </div>
                <Dropdown>
                    <div class="nav_item_create">创作</div>
                    <DropdownMenu slot="list">
                        <DropdownItem class="toSubmit">
                            <router-link to="/">发表作品</router-link>
                        </DropdownItem>
                        <DropdownItem class="toSubmit">
                            <router-link to="/submit">发表帖子</router-link>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
            <div class="nav_user" :style="{ width: logoWidth + 'px' }">
                <div class="signIn_signUp">
                    <div class="nav_item_sign">
                        <router-link to="/signIn">
                            登录
                        </router-link>
                    </div>
                    <div class="nav_item_sign">
                        <router-link to="/signUp">
                            注册
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="main" :style="{ minHeight: minHeight + 'px' }">
            <router-view/>
        </div>
        <div class="footer">
            <div class="about">
                <router-link to="/">关于我们</router-link>
                |
                <router-link to="/">联系方式</router-link>
                |
                <router-link to="/">帮助与反馈</router-link>
                |
                <router-link to="/">侵权与投诉</router-link>
            </div>
            <div class="website">Copyright © 2020 谨下阅读</div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                logoWidth: null,
                theme: 'dark',
                minHeight: null,
                selected: 1,
            }
        },
        mounted() {
            this.minHeight = document.documentElement.clientHeight - 170 - 10;
            this.logoWidth = (window.innerWidth - 1217) / 2;
        },
        computed: {
            isLogin: function () {
                return this.$store.getters.isLogin;
            },
            user: function () {
                return this.$store.getters.getUser;
            }
        },
        created: function () {
            if (this.isMobile()) {
                window.location.href = "http://inhive.net/mobile";
            }
            //在页面加载时读取sessionStorage里的状态信息
            if (sessionStorage.getItem("store")) {
                this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))));
            }

            //在页面刷新时将vuex里的信息保存到sessionStorage里
            window.addEventListener("beforeunload", () => {
                sessionStorage.setItem("store", JSON.stringify(this.$store.state));
            });
        },
        methods: {
            isMobile() {
                let flag = navigator.userAgent.match(
                    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
                );
                return flag;
            },
            toLogin() {
                this.$router.push('/toLogin');
            },
            toRegister() {
                this.$router.push('/toRegister');
            },
        }
    }
</script>

<style lang="scss">
    .app {
        background-color: #FFFFFF;
    }

    .header {
        width: 100%;
        height: 60px;
        /*background-color: #515a6e;*/
        background-color: #222;
        /*取消双击选中文字*/
        user-select: none;
    }

    .logo {
        float: left;
        line-height: 60px;
        color: #fff;
        font-size: 32px;
        font-weight: bold;
        font-family: YouYuan;
        text-align: center;
    }

    .nav_item {
        display: inline-block;
        font-size: 23px;
        font-family: YouYuan;
        line-height: 60px;
        margin: 0 15px;

        a {
            color: #dcdee2;
        }
    }

    .nav_item_create {
        display: inline-block;
        color: #dcdee2;
        font-size: 23px;
        font-family: YouYuan;
        line-height: 60px;
        margin: 0 15px;
    }

    .toSubmit {
        a {
            color: #333333;
        }
    }

    .nav_item_sign {
        display: inline-block;
        font-size: 23px;
        font-family: YouYuan;
        line-height: 60px;
        margin: 0 10px;

        a {
            color: #dcdee2;
        }
    }

    .nav_module {
        float: left;
        width: 1200px;
    }

    .nav_user {
        float: left;
    }

    .signIn_signUp {
        float: right;
        width: 132px;
        margin-right: 10%;
    }

    .main {
        width: 1200px;
        margin: 0 auto;
        padding: 10px 0px;
    }

    .footer {
        width: 100%;
        height: 120px;
        color: #fff;
        padding-top: 30px;
        text-align: center;
        font-family: YouYuan;
        /*background-color: #515a6e;*/
        background-color: #222;
        /*取消双击选中文字*/
        user-select: none;
    }

    .about a {
        color: #fff;
    }

    .website {
        margin-top: 15px;
    }

    .ivu-message {
        z-index: 22000 !important;
    }
</style>
