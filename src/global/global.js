exports.install = function (Vue) {
    Vue.prototype.instance = function (type, content, ok, cancel) {
        switch (type) {
            case 'success':
                this.$Modal.success({
                    title: '操作成功！',
                    content: content,
                });
                break;
            case 'warning':
                this.$Modal.confirm({
                    title: '警告',
                    content: content,
                    onOk: () => {
                        ok();
                    },
                    onCancel: () => {
                        cancel();
                    }
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
        if (validateE.length !== 0) {
            return true;
        } else {
            return false;
        }
    };
    Vue.prototype.noToChinese = function (number) {
        let reg = /^\+?[1-9][0-9]*$/;
        if (!reg.test(number)) {
            this.$Message.error('数字格式错误');
        }
        let ele_zh = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
        // let ele_no = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        let site = ['', '十', '百', '千', '万', '十万', '百万', '千万', '亿'];
        let numSplit = number.split('');
        //1515
        let chinese = '';
        let numSite = numSplit.length;
        if (numSite === 2 && numSplit[0] === '1') {
            if (numSplit[1] === '0') {
                chinese = '十';
            } else {
                chinese = '十' + ele_zh[numSplit[1]];
            }
        } else if (number === '0') {
            chinese = '零';
        } else {
            for (let i = 0; i < numSplit.length; i++) {
                if (numSite === 1 && numSplit[i] === '0') {
                    break;
                }
                if (numSplit[i] === '0' && numSplit[i - 1] !== '0') {
                    let flag = false;
                    for (let j = i + 1; j < numSplit.length; j++) {
                        if (numSplit[j] !== '0') {
                            flag = true;
                            break;
                        }
                    }
                    if (flag) {
                        chinese = chinese + '零';
                    }
                } else if (numSplit[i] === '0' && numSplit[i - 1] === '0') {
                    chinese = chinese + '';
                } else {
                    chinese = chinese + ele_zh[numSplit[i]] + site[numSite - 1];
                }
                numSite--;
            }
        }
        return chinese;
    };
};
