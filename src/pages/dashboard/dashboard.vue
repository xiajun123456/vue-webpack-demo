<template>
    <div>
        <div id="allmap"></div>
    </div>
</template>
<style lang="scss" type="text/scss" scoped>
  #allmap{
     position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
  }
</style>
<script type="text/ecmascript-6">
    import re from '../../shared/request/asyncRequest.js';
    export default {
        name: "dashboard",
        data: function () {
            return {
                centerPoint: {
                    c: 104.06,
                    p: 30.67
                }
            }
        },
        computed: {
            point(){
                return this.centerPoint
            }
        },
        methods: {
            changeCenter(){
                this.centerPoint = {
                    c: 102.06,
                    p: 26.67
                };
            }

        },
        mounted(){
           let map = new BMap.Map("allmap",{
                enableMapClick : false
            });
            map.centerAndZoom('成都', 15);                 // 初始化地图，设置中心点坐标和地图级别
        }
    }
</script>