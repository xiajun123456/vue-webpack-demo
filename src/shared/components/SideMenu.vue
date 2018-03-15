<template id="menu">
    <div class="side-menu-container" >
        <div class="icon-img">
            <img src="../../images/logo.png" alt="">
        </div>
        <ul v-if="!isLogin">
            <li v-for="menu in user.menus"
                :key="menu.id">
                <div class="menu-item-title"
                     :class="{active:activeUrl == menu.url && !menu.drop}"
                     @click="active(menu)">
                    <i :class="[activeUrl == menu.url?menu.icon+'-active':menu.icon]" class="item-icon"></i>
                    {{menu.name}}
                    <span v-if="!!menu.drop"
                          :class="{'menu-down':activeTitle != menu.name,'menu-up':activeTitle == menu.name}">
                    </span>
                </div>
                <el-collapse-transition>
                    <ul v-if="activeTitle == menu.name">
                        <li v-for="(td,itemIndex) in menu.drop"
                            :key="td.id"
                            class="drop-meun-item"
                            :class="{active:activeUrl == td.url}"
                            @click="jumpPage(td.url)">
                            <i :class="[activeUrl == td.url?td.icon+'-active':td.icon]" class="item-icon"></i>
                            <span>{{td.name}}</span>
                        </li>
                    </ul>
                </el-collapse-transition>
            </li>
        </ul>

    </div>
</template>
<script type="text/ecmascript-6">
    import storage from '../services/storageService.js';
    import {mapState, mapMutations} from 'vuex';
    export default {
        name: 'SideMenu',
        data() {
            return {
                activeTitle: '',
                activeUrl: ''
            }
        },
        methods: {
            active(menu){
                if (!menu.drop) {
                    this.$router.push({path: menu.url});
                    this.activeUrl = menu.url;
                    this.activeTitle = '';
                    return
                }
                if (this.activeTitle == menu.name) {
                    this.activeTitle = ''
                } else {
                    this.activeTitle = menu.name
                }
            },
            jumpPage (url) {
                this.activeUrl = url;
                this.$router.push({path: url});
            }
        },
        watch: {
            path(newVal, oldVal){
                if (!!this.setPath) {
                    this.loading = false;
                    this.setPath();
                }
            },
            $route(to, from){
                if (from.path == '/login') {
                    this.activeUrl = to.path
                }
                if (to.path == '/login') {
                    this.activeTitle = '';
                }
            }
        },
        computed: {
            ...mapState(['user','isLogin']),
            path(){
                return this.$route.fullPath
            },
            setPath(){
                let path = this.$route.fullPath;
                if (!path) {
                    return
                }
                if(!this.user){
                    return
                }
                this.user.menus.forEach((val1, key1) => {
                    if (!!val1.drop) {
                        val1.drop.forEach((val2, key2) => {
                            if (val2.url == path) {
                                this.activeTitle = val1.name;
                                this.activeUrl = val2.url;
                                return
                            }
                        })
                    } else {
                        if (val1.url == path) {
                            this.activeUrl = val1.url;
                        }
                    }
                })
            }
        }
    }
</script>
<style lang="scss" type="text/scss" scoped>
    @import "../../style/_variables";

    .side-menu-container {
        transition: all 0.2s linear;
        position: absolute;
        top: 0px;
        left: 0;
        bottom: 0;
        .icon-img {
            border-bottom: 1px solid #293141;
            img {
                width: $menuWidth;
                height: $headerHeight;
                display: block;
            }
        }
        width: $menuWidth;
        font-size: $menuFontSize;
        background: $menuBgColor;
        .menu-item-title {
            padding-left: $paddingLeft;
            color: $menuFontColor;
            line-height: $menuiTemHeight;
            height: $menuiTemHeight;
            cursor: pointer;
            position: relative;
            span {
                position: absolute;
                right: 40px;
                top: 50%;
                margin-top: -8px;
                width: 16px;
                height: 16px;

            }
            .menu-down {
                background: url("../../images/open.png") no-repeat;
            }
            .menu-up {
                background: url("../../images/close.png") no-repeat;
            }
        }
        .drop-meun-item {
            padding-left: $itemPaddingLeft;
            color: $menuFontColor;
            line-height: $menuiTemHeight;
            height: $menuiTemHeight;
            cursor: pointer;
            &:hover {
                color: #44d1fd;
            }
            span {
                margin-right: 10px;
            }
        }
        .active {
            color: #44d1fd;
        }
        .item-icon {
            margin-right: 10px;
            width: 20px;
            height: 20px;
            display: inline-block;
            position: relative;
            top: 3px;
        }
        .dashboard{
            background: url("../../images/dashboard.png") no-repeat center;
        }
        .dashboard-active{
            background: url("../../images/dashboard-active.png") no-repeat center;
        }
        .personnel{
            background: url("../../images/personnel.png") no-repeat center;
        }
        .personnel-active{
            background: url("../../images/personnel-active.png") no-repeat center;
        }
        .character{
            background: url("../../images/character.png") no-repeat center;
        }
        .character-active{
            background: url("../../images/character-active.png") no-repeat center;
        }
    }
</style>