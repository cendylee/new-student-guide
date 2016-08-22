<template>
  <div class="navigation">
      <div v-for="item in items" @click="changeCurrent(item.id)" :class="['item', currentItem === item.id ? 'active' : '', textShow ? '' : 'hideText']" title={{item.title}}>
          <div>
              {{item.title}}
          </div>
          <div class="circle"></div>
      </div>
      <div class="item" @click.stop="openMap" :class="['item', currentItem === 'map' ? 'active' : '', textShow ? '' : 'hideText']">
          <div>
              地图
          </div>
          <div class="circle"></div>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            items: [],
            currentItem: '',
            textShow: true
        }
    },
    asyncData() {
        return this.$http.get('/getFirstLevel').then((res) => {
            return {
                items: res.json().data
            }
        }, (d) => {

        });
    },
    methods: {
        changeCurrent(itemId) {
            this.currentItem = itemId;
            this.$dispatch('bgChange', itemId);
            this.$dispatch('subNavShow', itemId);
            this.$dispatch('hideFoot');
            // 如果地图显示，则隐藏
            this.$dispatch('hideMap');

            if (!this.textShow) {
                this.showText();
            }
        },
        openMap() {
            this.currentItem = 'map';
            this.$dispatch('showMap');

            if (this.textShow) {
                this.hideText();
            }
        },
        showText() {
            this.textShow = true;
        },
        hideText() {
            this.textShow = false;
        }
    },
    events: {
        reset() {
            this.currentItem = '';
            this.textShow = true;
        }
    }
}
</script>

<style lang="sass">
@import '../styles/var.scss';
$am_duration: .4s;
.navigation {
    position: fixed;
    right: 0;
    top: 18%;
    z-index: 2;
    .item {
        height: 60px;
        font-size: 30px;
        color: $white;
        margin-right: 20px;
        line-height: 60px;
        text-align: right;
        cursor: pointer;

        & > div {
            display: inline-block;
            transition: all $am_duration ease;
        }

        .circle {
            position: relative;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            box-shadow: inset 0px 0px 0px 2px $white;
            overflow: hidden;
        }
        .circle:after {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            display: block;
            width: 20px;
            height: 0;
            background-color: white;
            transition: height $am_duration ease;
        }
    }
    .item:hover {
        .circle {
            background-color: rgba(0,0,0, 0.1);
        }
    }
    .item.active {
        div:first-child {
            font-size: 35px;
        }
        .circle:after {
            height: 19px;
        }
    }
    .item.hideText {
        div:first-child {
            display: none;
        }
    }
}
</style>
