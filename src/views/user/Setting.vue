<template>
    <div class="pageView_setting">
        <div class="setting_menu">
            <Menu :active-name="active">
                <MenuItem name="baseInfo">基本信息</MenuItem>
                <MenuItem name="changePwd">修改密码</MenuItem>
            </Menu>
        </div>
        <div class="setting_main">
            <div class="baseInfo">
                <div class="baseInfo_title">基本信息</div>
                <Form class="baseInfo_form" :label-width="80">
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
                        <Button type="primary" @click="saveBaseInfo()">保存</Button>
                    </FormItem>
                </Form>
            </div>
            <div class="changePwd"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Setting",
        data() {
            return {
                active: 'baseInfo',
                user: this.$store.getters.getUser,
            }
        },
        methods: {
            saveBaseInfo() {
                let params = {
                    id: this.user.id,
                    gender: this.user.gender,
                    comeFrom: this.user.comeFrom,
                    signature: this.user.signature,
                    introduction: this.user.introduction
                };
                // let params = this.qs.stringify(initParams);
                this.axios.post("/user/change/baseInfo", params).then(response => {
                    let resp = response.data;
                    if (resp.status != 200) {
                        this.instance('error', resp.msg);
                        return;
                    }
                    this.$store.commit("setUser", resp.data);
                    this.$Message.success('修改成功');
                })
            }
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
</style>
