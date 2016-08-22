<template>
    <div class="content-container" :class="{hide: stat === 'hide'}" :style="{width: width + 'px'}">
        {{{content}}}
    </div>
</template>
<script>
export default {
    data() {
        return {
            width: '0',
            stat: 'hide',
            content: ''
        }
    },
    ready() {
        this.setWidth();
        this.win.onresize = this.setWidth;
    },
    methods: {
        setWidth() {
            this.width = this.win.innerWidth - 220 - 150; 
        },
        show() {
            this.stat = 'show';
        },
        hide() {
            this.stat = 'hide';
        },
        _htmlDecode(str) {
            const textarea = this.win.document.createElement('textarea');
            textarea.innerHTML = str;
            return textarea.value;
        }
    },
    events: {
        containerShow(textId) {
            this.$http.get('/getArticleById', { params: { id: textId } }).then((res) => {
                this.content = this._htmlDecode(res.json().data.content);
                this.show();
            });
        },
        containerHide() {
            this.hide();
        },
        reset() {
            this.hide();
        }
    }
}
</script>
<style lang="sass">
    .content-container {
        position: fixed;
        left: 220px;
        top: 90px;
        height: 80%;
        padding: 30px;
        background-color: white;
        border-radius: 10px;
        transition: all .3s ease;
        overflow-y: scroll;
        overflow-x: hidden;
        box-sizing: border-box;
        z-index: 1;
    }
    .content-container.hide {
        transition: transform 1s ease;
        transition-delay: .1s;
        transform: translateX(-4000px)
    }
</style>
