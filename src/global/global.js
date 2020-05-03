exports.install = function (Vue) {
    Vue.prototype.instance = function (type, content) {
        switch (type) {
            case 'success':
                this.$Modal.success({
                    title: '操作成功！',
                    content: content,
                    onOk: () => {
                        this.$router.push('/');
                    },
                });
                break;
            case 'error':
                this.$Modal.error({
                    title: '操作失败！',
                    content: content
                });
                break;
        }
    };
};
