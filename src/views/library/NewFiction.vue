<template>
    <div class="create">
        <div class="container">
            <h1>创建作品</h1>
            <Form class="fiction_form" :model="form" label-position="right" :label-width="90">
                <FormItem label="作品类别">
                    <Select v-model="form.categoryId" size="large" placeholder="请选择作品类别">
                        <Option v-for="category in categoryList" :value="category.value" :key="category.value">
                            {{category.label}}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="作品名称">
                    <Input v-model="form.title" maxlength="18" show-word-limit size="large" placeholder="请输入作品名称"/>
                </FormItem>
                <FormItem label="作品简介">
                    <Input v-model="form.introduction" type="textarea" maxlength="255" show-word-limit :rows="6"
                           placeholder="请输入作品简介"/>
                </FormItem>
                <FormItem label="作品标签">
                    <Tag v-for="tag in form.tags" :key="tag" color="gold" size="large">{{tag}}</Tag>
                    <Button class="button_addTag" type="dashed" @click="addTag()">+</Button>
                    <Button class="button_addTag" type="dashed" @click="clearTags()">-</Button>
                </FormItem>
                <FormItem label="限制等级">
                    <InputNumber :max="5" :min="0" v-model="form.restricted"></InputNumber>
                </FormItem>
                <FormItem class="form_create">
                    <Button class="button_create" type="primary" size="large" @click="submitFiction()">创建作品</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NewFiction",
        data() {
            return {
                form: {
                    categoryId: null,
                    title: '',
                    introduction: '',
                    tags: [],
                    restricted: 0,
                },
                categoryList: [
                    {
                        value: 1,
                        label: '原创'
                    },
                    {
                        value: 2,
                        label: '同人'
                    },
                ],
                tagTemp: '',
            }
        },
        created: function () {
            this.init();
        },
        methods: {
            init() {
                if (!this.$store.getters.isLogin) {
                    this.$Message['warning']({
                        background: true,
                        content: '只有登录后才能发帖'
                    });
                    this.$router.push('/signIn').then();
                }
            },
            addTag() {
                if (this.form.tags.length >= 3) {
                    this.$Message.warning('最多只能添加3个标签');
                    return;
                }
                this.$Modal.confirm({
                    render: (h) => {
                        return h('Input', {
                            props: {
                                autofocus: true,
                                // size:'large',
                                placeholder: '请输入标签'
                            },
                            on: {
                                input: (val) => {
                                    this.tagTemp = val;
                                }
                            }
                        })
                    },
                    onOk: () => {
                        for (let i = 0; i < this.form.tags.length; i++) {
                            if (this.form.tags[i] === this.tagTemp) {
                                return;
                            }
                        }
                        this.form.tags.push(this.tagTemp);
                    }
                })
            },
            clearTags() {
                this.form.tags.pop();
            },
            submitFiction() {
                // let params = this.qs.stringify(this.form);
                this.axios.post("/library/new/fiction", this.form).then(response => {
                    let resp = response.data;
                    if (resp.status != 200) {
                        this.$Message.error(resp.msg);
                        return;
                    }
                    this.$router.push('/fiction?id=' + resp.data).then();
                })
            },
        }
    }
</script>

<style scoped lang="scss">
    .create {
        width: 100%;
        background-color: #f5f5f5;
        border: 1px solid #c4c4c4;
        border-radius: 6px;
        margin-bottom: 6px;
    }

    .container {
        width: 80%;
        padding: 10px 30px;
        margin: 20px auto;

        h1 {
            font-family: YouYuan, serif;
            text-align: center;
        }
    }

    .fiction_form {
        margin-top: 30px;
        font-family: YouYuan, serif;
    }

    .fiction_form /deep/ .ivu-form-item-label {
        font-size: 1.3em;
    }

    .fiction_form /deep/ .ivu-input:focus {
        box-shadow: none;
    }

    .button_addTag {
        font-size: 1.8em;
        line-height: 30px;
        margin-left: 15px;
    }

    .button_create {
        width: 120px;
        border: 0;
        box-shadow: none;
        background-color: #999;
    }
</style>
