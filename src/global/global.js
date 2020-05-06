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
    Vue.prototype.inspection = function (validate) {
        let validateA = validate.replace(/ /g, '');
        let validateB = validateA.replace(/<p>/g, '');
        let validateC = validateB.replace(/<\/p>/g, '');
        let validateD = validateC.replace(/&nbsp;/g, '');
        let validateE = validateD.replace(/<br>/g, '');
        if (validateE.length != 0) {
            return true;
        } else {
            return false;
        }
    };
};
