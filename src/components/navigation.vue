<template>
  <div @click="changeCurrent($event)" class="navigation">
      <div v-for="item in items" class="item" :class="{current: currentItem === item.id}" data-id={{item.id}} title={{item.title}}>
          {{item.title}}
      </div>
      <div class="item" @click.stop="openMap">
          地图
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            items: [],
            currentItem: ''
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
        changeCurrent(e) {
            this.currentItem = e.target.dataset.id;
            this.$dispatch('bgChange', this.currentItem);
            this.$dispatch('subNavShow', this.currentItem);
        },
        openMap() {

        }
    },
    events: {
        reset() {
            this.currentItem = '';
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
    .item {
        font-size: 30px;
        color: $white;
        margin-right: 20px;
        line-height: 60px;
        text-align: right;
        cursor: pointer;
        transition: all $am_duration ease;
    }
    .item::after {
        content: '';
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        box-shadow: inset 0px 0px 0px 2px $white;
        transition: all $am_duration ease;
    }
    .item:hover::after {
        background-color: rgba(0,0,0, 0.1);
    }
    .item.current {
        background-color: none;
        font-size: 35px;
    }
    .item.current::after {
        box-shadow: inset 0px -20px 0px 2px $white;
    }
}
</style>
