<template>
  <div :class="['foot', stat !== 'show' ? 'hide' : '', maskStat === 'show' ? 'foot-mask' : '']" @mouseenter="toggleMask" @mouseleave="toggleMask">
      <ul>
          <li><span>下载离线版本</span><span class="icon-dl"></span></li><li>
          <span>联系我们</span><span class="icon-contact"></span></li><li>
          <span>关于Token</span><span class="icon-about"></span></li>
      </ul>
  </div>
</template>

<script>
export default {
    data() {
        return {
            stat: 'show',
            maskStat: 'hide'
        }
    },
    methods: {
        hide() {
            this.stat = 'hide';
        },
        show() {
            this.stat = 'show';
        },
        toggleMask() {
            if (this.maskStat === 'show') {
                this.maskStat = 'hide';
            } else {
                this.maskStat = 'show';
            }
        }
    },
    events: {
        hideFoot() {
            this.hide();
        },
        showFoot() {
            this.show();
        },
        reset() {
            this.show();
        }
    }
}
</script>

<style lang="sass">
.foot {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 130px;
    text-align: center;
    

    transition: all .3s ease;
    ul > li {
        display: inline-block;
        font-size: 30px;
        color: white;
        line-height: 130px;
        margin: 0 50px;
        cursor: pointer;
    }
    span[class^="icon"] {
        position: relative;
        top: 5px;
        display: inline-block;
        width: 40px;
        height: 30px;
        background-size: cover;
        background-repeat: no-repeat;
    }
    span.icon-dl {
        background-image: url('../images/icon-dl.png');
    }
    span.icon-contact {
        background-image: url('../images/icon-contact.png');
    }
    span.icon-about {
        width: 95px;
        background-image: url('../images/token.png');
    }
}
.foot.hide {
    transform: translateY(100%);
}
.foot.foot-mask {
    background-color: rgba(0, 0, 0, 0.5);
}
</style>
