<template>
<div class="map-wrapper" :class="show ? 'map-show' : 'map-hide'">
    <div id = "map-container"></div>
    <ul class="map-tab" @click.stop="selectRegion">
        <li :class="[curTab === 'dy' ? 'active' : '']" data-region="dy">东院</li><li :class="[curTab === 'xy' ? 'active' : '']" data-region="xy">西院</li><li :class="[curTab === 'jh' ? 'active' : '']" data-region="jh">鉴湖</li><li :class="[curTab === 'ss' ? 'active' : '']" data-region="ss">升升</li><li :class="[curTab === 'nh' ? 'active' : '']" data-region="nh">南湖</li>
    </ul>
</div>
</template>
<script>
export default {
    data() {
        return {
            show: false,
            isInited: false,
            curTab: 'dy',
            _pano: Object.create(null)
        }
    },
    ready() {
        
    },
    methods: {
        initMap() {
             // 创建街景
            const pano = new qq.maps.Panorama(document.getElementById('map-container'));
            pano.setOptions({
                //显示移动箭头显示状态
                disableMove: false,
                //隐藏罗盘显示状态
                disableCompass: true
            });
            //设置默认的场景
            pano.setPano('10141114121023111234700');
            //设置查看视角
            pano.setPov({
                heading: 90,
                pitch: 20
            });
            //设置缩放级别，0<zoom<5
            pano.setZoom(1);

            this._pano = pano;
            this.isInited = true;
        },
        hideMap() {
            this.show = false;
        },
        setMap(options) {
            const { pano, heading, pitch } = options;
            const panoObj = this._pano;
            panoObj.setPano(pano);
            panoObj.setPov({
                heading: heading,
                pitch: pitch
            });
        },
        selectRegion(evt) {
            this.curTab = evt.target.dataset.region;
            this.setMap(this.getPosition(this.curTab));
        },
        getPosition(region) {
            return {
                'dy': {
                    pano: '10141114121023111234700',
                    heading: 90,
                    pitch: 20
                },
                'xy': {
                    pano: '10141019131025103343400',
                    heading: 265,
                    pitch: 19
                },
                'jh': {
                    pano: '10141114121023130823800',
                    heading: 14,
                    pitch: 12
                },
                'ss': {
                    pano: '10141003150324113347600',
                    heading: 37,
                    pitch: 4
                },
                'nh': {
                    pano: '10141114121023134145000',
                    heading: 7,
                    pitch: 0
                }
            }[region];
        }
    },
    events: {
        showMap() {
            if (!this.isInited) {
                this.initMap();
            }
            // 隐藏 subNav 和 container
            this.$dispatch('subNavHide');
            this.$dispatch('containerHide');
            this.show = true;
        },
        hideMap() {
            this.hideMap();
        },
        reset() {
            this.hideMap();
        }
    }
};
</script>
<style  lang="sass">
.map-wrapper {
    position: fixed;
    width: 100%;
    height: 100%;
    transition: all .3s ease;
    #map-container {
        width: 100%;
        height: 100%;
    }
    .map-tab {
        position: fixed;
        left: 0;
        bottom: 0;
        background-color: #313131;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        li {
            display: inline-block;
            font-size: 28px;
            color: white;
            padding: 10px 10px;
            cursor: pointer;
            border-radius: 10px;
        }
        li.active {
            background-color: white;
            color: #313131;
        }
    }
}
.map-show {
    visibility: visible;
    opacity: 1;
    z-index: 1;
}
.map-hide {
    visibility: hidden;
    opacity: 0;
    z-index: 0;
}
    
</style>