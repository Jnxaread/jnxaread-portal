<template>
    <div class="pageView_setting">
        <div v-if="screenWidth>600" class="setting_menu">
            <Menu :active-name="active">
                <MenuItem name="baseInfo" @click.native="showPage('baseInfo')">基本信息</MenuItem>
                <MenuItem name="changePwd" @click.native="showPage('changePwd')">修改密码</MenuItem>
            </Menu>
        </div>
        <div v-else>
            <Tabs v-model="active">
                <TabPane label="基本信息" name="baseInfo"></TabPane>
                <TabPane label="修改密码" name="changePwd"></TabPane>
            </Tabs>
        </div>
        <div :class="screenWidth>600?'setting_main':''">
            <div class="baseInfo" v-if="active==='baseInfo'">
                <div class="baseInfo_title" v-if="screenWidth>600">基本信息</div>
                <Form class="baseInfo_form" :label-position="labelPosition" :label-width="labelWidth">
                    <FormItem label="账号">
                        <Input v-model="user.account" disabled/>
                    </FormItem>
                    <FormItem label="昵称">
                        <Input v-model="user.username" disabled/>
                    </FormItem>
                    <FormItem label="性别">
                        <RadioGroup v-model="user.gender">
                            <Radio :label="0">女</Radio>
                            <Radio :label="1">男</Radio>
                            <Radio :label="2">未知</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="电子邮箱">
                        <Input v-model="user.email" disabled/>
                    </FormItem>
                    <FormItem label="来自于">
                        <Input v-model="user.comeFrom"/>
                    </FormItem>
                    <FormItem label="个性签名">
                        <Input v-model="user.signature" maxlength="15" show-word-limit/>
                    </FormItem>
                    <FormItem label="自我介绍">
                        <Input v-model="user.introduction" :rows="6" maxlength="240" show-word-limit type="textarea"/>
                    </FormItem>
                    <FormItem>
                        <Button class="btn_save" type="primary" @click="saveBaseInfo()">保存</Button>
                    </FormItem>
                </Form>
            </div>
            <div v-if="active==='changePwd'">
                <div class="baseInfo_title" v-if="screenWidth>600">修改密码</div>
                <Form class="changePwd_form" :label-position="labelPosition" :label-width="labelWidth">
                    <FormItem label="旧密码">
                        <Input v-model="pwdForm.oldPassword"/>
                    </FormItem>
                    <FormItem label="新密码">
                        <Input v-model="pwdForm.newPassword"/>
                    </FormItem>
                    <FormItem label="确认密码">
                        <Input v-model="pwdForm.checkPassword"/>
                    </FormItem>
                    <!--此处十分诡异，一旦在父div中设置class之后，那么在FormItem中的Input就无法显示嵌套的Button，现在还不清楚原因-->
                    <FormItem prop="emailCode" label="验证码">
                        <Input v-model="pwdForm.emailCode" placeholder="请输入邮箱验证码">
                            <Button slot="append" class="emailCode_button" v-if="buttonShow===0" @click="getEmailCode">
                                <span>获取验证码</span>
                            </Button>
                            <Button slot="append" v-else-if="buttonShow===1">
                                <span>正在发送验证码</span>
                            </Button>
                            <Button slot="append" v-else>
                                <span>{{ timeCount }}s 后获取验证码</span>
                            </Button>
                        </Input>
                    </FormItem>
                    <FormItem>
                        <Button class="btn_save" type="primary" @click="saveChangePwd()">保存</Button>
                    </FormItem>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
import {Menu, MenuItem, Tabs, TabPane, Form, FormItem, Input, RadioGroup, Radio, Button} from 'view-design';

export default {
    components: {
        Menu,
        MenuItem,
        Tabs,
        TabPane,
        Form,
        FormItem,
        Input,
        RadioGroup,
        Radio,
        Button
    },
    name: "Setting",
    data() {
        return {
            active: 'baseInfo',
            user: this.$store.getters.getUser,
            pwdForm: {
                oldPassword: '',
                newPassword: '',
                checkPassword: '',
                emailCode: ''
            },
            buttonShow: 0,
            timer: null,
            timeCount: 120,
            labelPosition: 'right',
            labelWidth: 80,
        }
    },
    created() {
        if (this.screenWidth < 600) {
            this.labelPosition = 'top';
            this.labelWidth = null;
        }
    },
    computed: {
        screenWidth: function () {
            return this.$store.getters.getScreenWidth;
        },
    },
    methods: {
        showPage(active) {
            this.active = active;
        },
        getEmailCode: function () {
            /*let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            if (!reg.test(this.form.email)) {
                this.$Message.error('邮箱格式错误！')
                return;
            }*/
            this.buttonShow = 1;
            this.axios.post(this.api.user.emailCode, {email: this.user.email}).then(response => {
                let resp = response.data;
                if (resp.status !== "000000") {
                    this.instance('error', resp.msg);
                    this.buttonShow = 0;
                    return;
                }
                this.$Message.success('验证码发送成功！');
                this.buttonShow = 2;
                const TIME_COUNT = 120;
                this.timer = setInterval(() => {
                    if (this.timeCount > 0 && this.timeCount <= TIME_COUNT) {
                        this.timeCount--
                    } else {
                        this.buttonShow = 0;
                        clearInterval(this.timer);
                        this.timer = null;
                        this.timeCount = 120;
                    }
                }, 1000);
            })
        },
        saveBaseInfo() {
            let params = {
                id: this.user.id,
                gender: this.user.gender,
                comeFrom: this.user.comeFrom,
                signature: this.user.signature,
                introduction: this.user.introduction
            };
            this.axios.post(this.api.user.editBaseInfo, params).then(response => {
                let resp = response.data;
                if (resp.status !== "000000") {
                    this.instance('error', resp.msg);
                    return;
                }
                this.$store.commit("setUser", resp.data);
                this.$Message.success('修改成功');
            })
        },
        saveChangePwd() {
            this.axios.post(this.api.user.editPassword, this.pwdForm).then(response => {
                let resp = response.data;
                if (resp.status !== "000000") {
                    this.instance('error', resp.msg);
                    return;
                }
                this.$Message.success('修改成功');
            })
        },
    }
}
</script>

<style scoped lang="scss">
.pageView_setting {
    width: 100%;
    background-color: #f5f5f5;
    border: 1px solid #c4c4c4;
    border-radius: 6px;
    padding: 30px 40px;
    margin-bottom: 6px;
    overflow: hidden;
}

.setting_menu {
    float: left;
}

.setting_main {
    float: right;
    width: 75%;
    padding: 20px 30px;
    border-radius: 10px;
    background-color: #fff;
}

.baseInfo_title {
    font-size: 1.4rem;
    font-weight: lighter;
    font-family: YouYuan serif;
    margin-bottom: 20px;
}

.baseInfo_form {
    width: 80%;
}

.changePwd_form {
    width: 60%;
}

.emailCode_button {
    width: 100px;
}

.emailCode_button:hover {
    width: 100px;

    span {
        color: #f0ac19;
    }
}
</style>
<style scoped lang="scss">
@media screen and (max-width: 600px) {
    .pageView_setting {
        padding: 15px 10px;
    }
    .baseInfo_form {
        width: unset;
    }
    .changePwd_form {
        width: unset;
    }
    .btn_save {
        width: 100%;
        margin: 0 auto;
    }
}
</style>
