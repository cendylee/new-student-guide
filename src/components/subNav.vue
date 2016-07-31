<template>
  <div class="sub_nav" :class="{ hide: stat === 'hide'}">
      <ul>
          <li v-for="item in subNavlist" @click="showContainer(item.id)">{{item.title}}</li>
      </ul>
  </div>
</template>

<script>
export default {
    data() {
        return {
            stat: 'hide',
            currentItem: '0',
            subNavlist: []
        }
    },
    methods: {
        fetchList(item) {
            return this.$http.get('/getSecLevel', {params: {id: this.currentItem}}).then((res) => {
                this.subNavlist = res.json().data;
            });
        },
        showContainer(textId) {
            this.$dispatch('containerShow', textId);
        }
    },
    events: {
        subNavShow(item) {
            this.currentItem = item;
            this.fetchList(item).then(() => {
                if (this.stat !== 'show') {
                    this.stat = 'show';
                }
            });
        },
        subNavHide() {
            this.stat = 'hide';
        },
        reset() {
            this.stat = 'hide';
        }
    }

}
</script>

<style lang="sass">
@import '../styles/var.scss';
.sub_nav {
    position: fixed;
    width: 200px;
    height: 100%;
    background-color: #68b0d3;
    transition: transform .3s ease;
    z-index: 1;

    ul {
        text-align: center;
        color: $white;
        font-size: 28px;
        padding-top: 150px;
        li {
            padding: 15px 0;
            cursor: pointer;
            transition: all .3s ease;
        }
        li:hover, .active{
            background-color: #21a5d2;
            color: #99ffcc;
        }
    }
}
.hide {
    transform: translateX(-300px);
}
</style>
