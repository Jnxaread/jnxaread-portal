<template>
    <div class="signUp">
        <div class="container">
            <div class="title">注册</div>
            <Form class="form" ref="form" :model="form" :rules="ruleValidate" label-position="top">
                <FormItem prop="account" label="账号">
                    <Input v-model="form.account" placeholder="请输入账号"/>
                </FormItem>
                <FormItem prop="password" label="密码">
                    <Input type="password" v-model="form.password" placeholder="请输入密码"/>
                </FormItem>
                <FormItem prop="checkPwd" label="确认密码">
                    <Input type="password" v-model="form.checkPwd" placeholder="请确认密码"/>
                </FormItem>
                <FormItem prop="username" label="用户名">
                    <Input v-model="form.username" placeholder="请输入用户名"/>
                </FormItem>
                <!--<FormItem prop="mobile" label="手机号">-->
                <!--<Input v-model="form.mobile" placeholder="请输入手机号"/>-->
                <!--</FormItem>-->
                <FormItem prop="email" label="邮箱">
                    <Input v-model="form.email" placeholder="请输入邮箱"/>
                </FormItem>
                <FormItem prop="emailCode" label="邮箱验证码">
                    <Input v-model="form.emailCode" placeholder="请输入邮箱验证码">
                        <Button slot="append" class="emailCode_button" v-if="buttonShow===0" @click="getEmailCode">
                            <span>获取验证码</span>
                        </Button>
                        <Button slot="append" v-else-if="buttonShow===1">
                            <span>正在发送验证码</span>
                        </Button>
                        <Button slot="append" v-else>
                            <span>{{timeCount}}s 后获取验证码</span>
                        </Button>
                    </Input>
                </FormItem>
                <FormItem prop="gender" label="性别">
                    <RadioGroup v-model="form.gender">
                        <Radio label="0">女</Radio>
                        <Radio label="1">男</Radio>
                        <Radio label="2">未知</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem>
                    <Button class="form_button" type="primary" @click="handleSubmit('form')">注册</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Register",
        data() {
            const validateAccount = (rule, value, callback) => {
                let reg = /^[a-zA-Z][-_a-zA-Z0-9]+$/;
                if (!reg.test(value)) {
                    callback(new Error('账号必须以字母开头，为字母、数字、下划线或减号的组合'));
                } else {
                    callback();
                }
            };
            const validateCheckPwd = (rule, value, callback) => {
                if (value !== this.form.password) {
                    callback(new Error('两次输入的密码不匹配'));
                } else {
                    callback();
                }
            };
            const validateUsername = (rule, value, callback) => {
                let reg = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/;
                if (!reg.test(value)) {
                    callback(new Error('用户名必须为汉字、字母、数字的组合'));
                } else {
                    callback();
                }
            };
            return {
                form: {
                    account: '',
                    password: '',
                    checkPwd: '',
                    username: '',
                    // mobile: '',
                    email: '',
                    emailCode: '',
                    gender: '',
                },
                ruleValidate: {
                    account: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                        {max: 20, message: '账号长度不允许超过20位', trigger: 'blur'},
                        {min: 9, message: '账号长度不允许低于9位', trigger: 'blur'},
                        {validator: validateAccount, trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {max: 32, message: '账号长度不允许超过32位', trigger: 'blur'},
                        {min: 9, message: '密码长度不允许低于9位', trigger: 'blur'},
                    ],
                    checkPwd: [
                        {required: true, message: '请确认密码', trigger: 'blur'},
                        {validator: validateCheckPwd, trigger: 'blur'}
                    ],
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {max: 12, message: '用户名长度不允许超过12位', trigger: 'blur'},
                        {min: 2, message: '用户名长度不允许低于2位', trigger: 'blur'},
                        {validator: validateUsername, trigger: 'blur'}
                    ],
                    // mobile: [
                    //     {required: true, message: '请输入手机号', trigger: 'blur'},
                    //     {validator: validateMobile, trigger: 'blur'}
                    // ],
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        {type: 'email', message: '邮箱格式错误', trigger: 'blur'}
                    ],
                    emailCode: [
                        {required: true, message: '请输入邮箱验证码', trigger: 'blur'},
                        {min: 6, max: 6, message: '验证码长度为6位', trigger: 'blur'}
                    ],
                    gender: [
                        {required: true, message: '请选择性别', trigger: 'change'}
                    ],
                },
                buttonShow: 0,
                timer: null,
                timeCount: 120,
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.register();
                    } else {
                        this.$Message.error('请正确填写表单!');
                    }
                })
            },
            getEmailCode() {
                let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                if (!reg.test(this.form.email)) {
                    this.$Message.error('邮箱格式错误！')
                    return;
                }
                this.buttonShow = 1;
                this.axios.post("/user/emailCode", {email: this.form.email}).then(response => {
                    let resp = response.data;
                    if (resp.status != 200) {
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
            register() {
                this.axios.post(this.api.user.signUp, this.form).then(response => {
                    let resp = response.data;
                    if (resp.status !== 200) {
                        this.instance('error', resp.msg);
                        return;
                    }
                    this.$store.commit('setUser', resp.data);
                    let content = "<p style='font-size: 16px'>你现在已经是一个红领巾啦，快去发帖庆祝吧。。。</p>";
                    this.instance('success', content);
                })
            },
        }
    }
</script>

<style scoped lang="scss">
    .signUp {
        width: 100%;
        background-color: #f5f5f5;
        /*border: 1px solid #c4c4c4;*/
        border-radius: 6px;
        padding: 15px 25px;
        margin-bottom: 6px;
    }

    .container {
        width: 45%;
        margin: 0 auto;
        padding: 20px 0;
        border-radius: 10px;
        background-color: #FFFFFF;
    }

    .title {
        font-size: 2.0em;
        font-weight: bold;
        text-align: center;
    }

    .form {
        width: 80%;
        margin: 30px auto;
    }

    .form_button {
        width: 100%;
        border: 0;
        box-shadow: none;
        background-color: #999;
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
