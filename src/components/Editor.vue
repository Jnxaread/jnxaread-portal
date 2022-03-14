<template>
    <div>
        <div id="globalEditor" class="edit_container" ref="editor"></div>
        <!--<button v-on:click="getContent">查看内容</button>-->
    </div>
</template>

<script>
import E from 'wangeditor';
import xss from 'xss';

export default {
    name: 'editor',
    props: {
        isClear: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            editor: null,
            editorContent: '',
            emoji: [
                '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃',
                '😉', '😊', '😇', '😍', '🤩', '😘', '😗', '😚', '😙',
                '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔',
                '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥',
                '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮',
                '🤧', '😵', '🤯', '🤠', '😎', '🤓', '🧐', '😕', '😟',
                '😮', '😯', '😲', '😳', '😦', '😧', '😨', '😰', '😥',
                '😢', '😭', '😱', '😖', '😣', '😞', '😓', '😩', '😫', '😤',
                '😡', '😠', '🤬', '😈', '👿', '💩', '👾', '💭', '💅', '👂',
                '🧠', '👀', '👁', '🛀', '🛌', '👣', '🥄', '🔪', '🏺', '🏺',
                '🗾', '🎠', '🎡', '🎢', '💈', '🎪', '🛰', '🚀', '🛸', '🛎',
                '⌛', '⏳', '⌚', '⏰', '🕰️', '🌡️', '🌂', '☂', '☔', '⛱',
                '⚡', '🎃', '🎄', '🎆', '🎇', '🎈', '🎉', '🎊', '🎏', '🎐',
                '🎑', '🎀', '🎁', '🎗️', '🎟️', '🎫', '💊',
            ],
        }
    },
    watch: {
        isClear(val) {
            // 触发清除文本域内容
            if (val) {
                this.editor.txt.clear();
            }
        },
    },
    methods: {
        /**
         * 将富文本编辑器中的文本存储到store中
         */
        getContent: function () {
            this.$store.commit('setContent', this.editorContent);
        },
        /**
         * 从store中获取文本并将文本在编辑器编辑区域显示
         */
        setContent: function () {
            this.editorContent = this.$store.getters.getContent;
            this.editor.txt.html(this.editorContent);
        },
    },
    mounted() {
        this.editor = new E(this.$refs.editor);
        // 设置编辑器菜单
        this.editor.customConfig.menus = [
            // 'head',  // 标题
            'bold',  // 粗体
            // 'fontSize',  // 字号
            // 'fontName',  // 字体
            'italic',  // 斜体
            'underline',  // 下划线
            'strikeThrough',  // 删除线
            // 'foreColor',  // 文字颜色
            // 'backColor',  // 背景颜色
            // 'link',  // 插入链接
            'list',  // 列表
            'justify',  // 对齐方式
            'quote',  // 引用
            'emoticon',  // 表情
            // 'image',  // 插入图片
            'table',  // 表格
            // 'video',  // 插入视频
            // 'code',  // 插入代码
            'undo',  // 撤销
            'redo'  // 重复
        ];
        this.editor.customConfig.emotions = [
            {
                title: 'emoji',  // tab 的标题
                type: 'emoji', // 'emoji' / 'image'
                // emoji 表情，content 是一个数组即可
                content: this.emoji,
            }
        ];
        this.editor.customConfig.onchange = (html) => {
            //执行xss过滤
            this.editorContent = xss(html);
        };
        this.editor.customConfig.zIndex = 1000;
        this.editor.create();
    }
}
</script>

<style scoped>
.edit_container {
    text-align: left;
    margin-bottom: 20px;
}
</style>
<style lang="scss">
#globalEditor {
    .w-e-toolbar {
        // 给工具栏换行
        flex-wrap: wrap;
    }
}
</style>
