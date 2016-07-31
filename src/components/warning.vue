<template>
  <div class="warning-banner-wrapper">
      <div class="warning-banner" v-if="!isGoodScreenWidth()">
          <p>
              请在大于1366*768分辨率的屏幕上浏览以获得更好体验
          </p>
          <!-- <div class="close">
              <i class="line"></i>
              <i class="line"></i>
          </div> -->
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        isGoodScreenWidth(){
            if (screen.width < 1366) {
                return false;
            }
            return true;
        }
    }
}
</script>

<style lang="sass">
@import '../styles/var.scss';
.warning-banner-wrapper {
    .warning-banner {
        width: 100%;
        padding: 20px;
        background: $green;
        color: $white;
        text-align: center;
    }
    .close {
        height: 28px;
        width: 28px;
        .line {
            display: block;
            width: 20px;
            height: 1px;
            border-bottom: 1px solid $white;
            cursor: pointer;
        }
        .line:first-child {
            transform: rotate(45deg) translate(2px, 1px);
        }
        .line:last-child {
            transform: rotate(-45deg);
        }
    }
}
</style>
