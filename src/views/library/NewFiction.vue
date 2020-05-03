<template>
    <div class="create">
        <div class="container">
            <h1>创建作品</h1>
            <Form class="fiction_form" label-position="right" label-width="90">
                <FormItem label="作品类别">
                    <Select size="large" placeholder="请选择作品类别">
                        <Option>原创</Option>
                        <Option>同人</Option>
                    </Select>
                </FormItem>
                <FormItem label="作品名称">
                    <Input maxlength="18" show-word-limit size="large" placeholder="请输入作品名称"/>
                </FormItem>
                <FormItem label="作品简介">
                    <Input type="textarea" maxlength="255" show-word-limit rows="6" placeholder="请输入作品简介"/>
                </FormItem>
                <FormItem label="作品标签">
                    <Tag color="gold" size="large">渣攻贱受</Tag>
                    <Tag color="gold" size="large">甜宠</Tag>
                    <Button class="button_addTag" type="dashed">+</Button>
                </FormItem>
                <FormItem class="form_create">
                    <Button class="button_create" type="primary" size="large" @click="submitfiction">创建作品</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Create",
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
            font-family: YouYuan;
            text-align: center;
        }
    }

    .fiction_form {
        margin-top: 30px;
        font-family: YouYuan;
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

    .ivu-btn:focus {
        box-shadow: none;
    }

    .ivu-btn:active {
        box-shadow: none;
    }
</style>
