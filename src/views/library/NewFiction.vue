<template>
    <div class="create">
        <div class="container">
            <h1>创建作品</h1>
            <Form class="fiction_form" :model="form" :label-position="labelPosition" :label-width="labelWidth">
                <FormItem label="作品类别">
                    <Select v-model="form.categoryId" size="large" placeholder="请选择作品类别">
                        <Option v-for="category in categories" :value="category.id" :key="category.id">
                            {{ category.name }}
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
                    <Tag v-for="tag in form.tags" :key="tag" color="gold" size="large">{{ tag }}</Tag>
                    <Button type="dashed" @click="addTag()">+</Button>
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
import {Form, FormItem, Select, Option, Input, Tag, Button, InputNumber} from 'view-design';

export default {
    components: {
        Form,
        FormItem,
        Select,
        Option,
        Input,
        InputNumber,
        Tag,
        Button
    },
    name: "NewFiction",
    data() {
        return {
            labelPosition: 'right',
            labelWidth: 90,
            form: {
                categoryId: null,
                title: '',
                introduction: '',
                tags: [],
                restricted: 0,
            },
            categories: [],
            tagTemp: '',
        }
    },
    created: function () {
        if (this.screenWidth < 600) {
            this.labelPosition = 'top';
            this.labelWidth = null;
        }
        this.init();
    },
    computed: {
        screenWidth: function () {
            return this.$store.getters.getScreenWidth;
        }
    },
    methods: {
        init() {
            if (!this.$store.getters.isLogin) {
                this.$Message['warning']({
                    background: true,
                    content: '只有登录后才能发帖'
                });
                this.$router.push('/signIn').then();
                return;
            }
            this.getCategories();
        },
        getCategories() {
            this.axios.post(this.api.library.categories, this.form).then(response => {
                let resp = response.data;
                if (resp.status !== "000000") {
                    this.$Message.error(resp.msg);
                    return;
                }
                this.categories = resp.data;
            })
        },
        addTag() {
            if (this.form.tags.length >= 3) {
                this.$Message.warning('最多只能添加3个标签');
                return;
            }
            this.$Modal.confirm({
                render: (h) => {
                    return h(Input, {
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
            this.axios.post(this.api.library.newFiction, this.form).then(response => {
                let resp = response.data;
                if (resp.status !== "000000") {
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

.fiction_form ::v-deep .ivu-form-item-label {
    font-size: 1.3em;
}

.fiction_form ::v-deep .ivu-input:focus {
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
<style scoped lang="scss">
@media screen and (max-width: 600px) {
    .container {
        width: 100%;
    }
}
</style>
