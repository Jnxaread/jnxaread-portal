<template>
    <div class="signIn">
        <div class="container">
            <div class="title">登录</div>
            <Form class="form" :model="form" :rules="ruleValidate" label-position="top">
                <FormItem label="账号">
                    <Input v-model="form.account"/>
                </FormItem>
                <FormItem label="密码">
                    <Input type="password" v-model="form.password"/>
                </FormItem>
                <FormItem>
                    <Button class="button_login" type="primary" @click="login">登录</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            const validateAccount = (rule, value, callback) => {
                let reg = /^[a-zA-Z][-_a-zA-Z0-9]+$/;
                if (!reg.test(value)) {
                    callback(new Error('账号必须以字母开头，为字母、数字、下划线或减号的组合'));
                } else {
                    callback();
                }
            };
            return {
                form: {
                    account: '',
                    password: '',
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
                },
            }
        },
        methods: {
            login() {
                // let params = this.qs.stringify(this.form);
                this.axios.post("/user/signIn", this.form).then(response => {
                    let resp = response.data;
                    if (resp.status != 200) {
                        this.instance('error', resp.msg);
                        return;
                    }
                    this.$store.commit("setUser", resp.data);
                    this.$router.push("/").then();
                })
            },
        },
    }
</script>

<style scoped lang="scss">
    .signIn {
        width: 100%;
        background-color: #f5f5f5;
        /*border: 1px solid #c4c4c4;*/
        border-radius: 6px;
        padding: 15px 25px;
        margin-bottom: 6px;
    }

    .container {
        width: 40%;
        height: 350px;
        padding-top: 30px;
        margin: 22px auto;
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

    .button_login{
        width: 100%;
        border: 0;
        box-shadow: none;
        background-color: #999;
    }

    .ivu-btn:focus {
        box-shadow: none;
    }

    .ivu-btn:active {
        box-shadow: none;
    }
</style>
