<template>
    <div id="app" class="app">
        <div class="header">
            <div class="logo" :style="{ width: logoWidth + 'px' }">
                <router-link to="/">
                    谨下网
                </router-link>
            </div>
            <div class="nav_module">
                <div class="nav_item">
                    <router-link to="/library">
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
                            <router-link to="/new/fiction">创建作品</router-link>
                        </DropdownItem>
                        <DropdownItem class="toSubmit">
                            <router-link to="/manage">管理作品</router-link>
                        </DropdownItem>
                        <DropdownItem class="toSubmit">
                            <router-link to="/new/topic">发表帖子</router-link>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
            <div class="nav_user" :style="{ width: logoWidth + 'px' }">
                <div class="signIn_signUp" v-if="!isLogin">
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
                <div class="userInfo" v-else>
                    <Dropdown>
                        <a href="javascript:void(0)">
                            <!--<span class="username">{{ user.username }}</span>-->
                            <div class="username">{{user.username}}</div>
                            <Icon type="ios-arrow-down"></Icon>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem @click.native="goToUCenter()">个人中心</DropdownItem>
                            <DropdownItem @click.native="goToSetting()">个人设置</DropdownItem>
                            <DropdownItem divided @click.native="logout()">退出登录</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
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
            <div class="website">Copyright © 2020 谨下网</div>
            <div class="about">
                <a href="http://www.mtslash.me/forum.php">随缘居</a>
            </div>
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
    created() {
        if (this.isMobile()) {
            // window.location.href = "http://inhive.net/mobile";
        }

        //在页面加载时读取sessionStorage里的状态信息
        if (sessionStorage.getItem("store")) {
            this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))));
        }

        //在页面刷新时将vuex里的信息保存到sessionStorage里
        window.addEventListener("beforeunload", () => {
            sessionStorage.setItem("store", JSON.stringify(this.$store.state));
        });

        //获取屏幕分辨率宽度并储存到vuex中
        let screenWidth = window.screen.width;
        this.$store.commit('setScreenWidth', screenWidth);
    },
    methods: {
        isMobile() {
            return navigator.userAgent.match(
                    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
            );
        },
        goToUCenter() {
            this.$router.push('/UCenter').then();
        },
        goToSetting() {
            this.$router.push('/setting').then();
        },
        logout() {
            this.axios.post(this.api.user.logout).then(response => {
                let resp = response.data;
                if (resp.status !== "000000") {
                    this.instance('error', resp.msg);
                    return;
                }
                this.$store.commit('setUser', null);
                this.$router.push("/").then();
            });
        },
    }
}
</script>

<style scoped lang="scss">
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
    font-family: YouYuan, serif;
    text-align: center;
}

.nav_item {
    display: inline-block;
    font-size: 23px;
    font-family: YouYuan, serif;
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
    font-family: YouYuan, serif;
    line-height: 60px;
    margin: 0 15px;
}

.toSubmit {
    a {
        color: #333333;
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

.nav_item_sign {
    display: inline-block;
    font-size: 23px;
    font-family: YouYuan, serif;
    line-height: 60px;
    margin: 0 10px;

    a {
        color: #dcdee2;
    }
}

.userInfo {
    float: right;
    width: 50%;
    color: #c5c8ce;
    font-size: 1.6em;
    font-weight: bold;
    font-family: YouYuan, serif;
    line-height: 60px;

    a {
        color: #dcdee2;
    }
}

.username {
    display: inline-block;
}

.main {
    width: 1200px;
    margin: 0 auto;
    padding: 10px 0;
}

.footer {
    width: 100%;
    height: 120px;
    color: #fff;
    padding-top: 30px;
    text-align: center;
    font-family: YouYuan, serif;
    /*background-color: #515a6e;*/
    background-color: #222;
    /*取消双击选中文字*/
    user-select: none;
}

.about a {
    color: #fff;
    margin: 0 5px;
}

.website {
    margin-top: 15px;
}

.ivu-message {
    z-index: 22000 !important;
}

</style>
<style scoped lang="scss">
@media screen and (max-width: 600px) {
    .header {
        height: 95px;
    }
    .logo {
        width: 100%;
        line-height: 50px;
    }
    .nav_module {
        width: 52%;
    }
    .nav_item {
        font-size: 1.4rem;
        margin: 0 5px;
        line-height: 40px;
    }
    .nav_item_create {
        font-size: 1.4rem;
        margin: 0 5px;
        line-height: 40px;
    }
    .nav_user {
        width: 48%;
        height: 40px;
    }
    .signIn_signUp {
        width: unset;
        margin-right: unset;
    }
    .nav_item_sign {
        font-size: 1.4rem;
        margin: 0 5px;
        line-height: 40px;
    }
    .userInfo {
        width: 100%;
        height: 40px;
        font-size: 1.4rem;
        line-height: 40px;
    }
    .username {
        max-width: 130px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .userInfo /deep/ .ivu-icon {
        vertical-align: super;
    }

    .main {
        width: 96%;
    }
}
</style>

<style>
.ivu-btn:focus {
    box-shadow: none;
}

.ivu-btn:active {
    box-shadow: none;
}
</style>
