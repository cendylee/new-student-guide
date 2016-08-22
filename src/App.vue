<template>
  <div id="app" :style="{ height: win.innerHeight + 'px'}">
      <div class="token_logo" @click="reset"></div>
      <warning></warning>
      <navigation></navigation>
      <sub-nav></sub-nav>
      <container></container>
      <map></map>
      <foot></foot>
  </div>
</template>

<script>
import warning from './components/warning.vue';
import navigation from './components/navigation.vue';
import subNav from './components/subNav.vue';
import container from './components/container.vue';
import map from './components/map.vue';
import foot from './components/foot.vue';
export default {
    components: {
        warning,
        navigation,
        subNav,
        container,
        map,
        foot
    },
    data () {
        return {
            
        }
    },
    methods: {
        changeBackground(item) {

        },
        reset() {
            this.$broadcast('reset');
        }
    },
    ready() {
        console.debug('This website is not designed by myself.');
    },
    events: {
        bgChange(currentItem) {
            console.log('background change to ' + currentItem);
        },
        subNavShow(currentItem) {
            this.$broadcast('subNavShow', currentItem);
        },
        subNavHide() {
            this.$broadcast('subNavHide');
        },
        containerShow(textId) {
            this.$broadcast('containerShow', textId);
        },
        containerHide() {
            this.$broadcast('containerHide');
        },
        showMap() {
            this.$broadcast('showMap');
        },
        hideMap() {
            this.$broadcast('hideMap');
        },
        hideFoot() {
            this.$broadcast('hideFoot');
        }
    }
}
</script>

<style lang="sass">
    @import './styles/var.scss';
    @import './styles/common.scss';

    #app {
        font-family: 'kaiti';
        overflow: hidden;
        width: 100%;
        background-image: url('./images/whut_logo.png'), url('./images/index.jpg');
        background-repeat: no-repeat, no-repeat;
        background-size: auto auto, 100% 100%;
        background-position: 50% 40%, 0 0;

        .token_logo {
            position: fixed;
            top: 40px;
            left: 38px;
            width: 110px;
            height: 40px;
            background-image: url('./images/token.png');
            background-size: 100% 100%;
            cursor: pointer;
            z-index: 2;
        }

    }
</style>
