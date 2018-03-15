<template>
    <div class="global-header">
        <h3 class="header-title">中国移动智能电表集抄管理系统</h3>
        <div class="header-right" v-if="!isLogin">
            <div class="right-info">
                <a class="waring-total">
                    <span class="glyphicon glyphicon-bell"></span> 待处理告警
                    <span class="info-data">11</span>
                </a>
            </div>
            <div class=" right-info">
                <a class="">
                    欢迎回来!
                    <span  class="wellcome-data">{{user.userName}}</span>
                </a>
            </div>
            <div class="login-out right-info">
                <a class="login-out-btn"
                   @click.prevent="loginOut">
                    <span class="glyphicon glyphicon-off"></span>
                    安全退出
                </a>
            </div>

        </div>
    </div>
</template>
<style lang="scss" type="text/scss" scoped>
    @import "../../style/_variables";

    .global-header {
        transition: all 0.2s linear;
        position: absolute;
        top: 0;
        left: $menuWidth;
        right: 0;
        background: $headerBgColor;
        height: $headerHeight;
        .header-title {
            margin-left: 20px;
            color: #365f79;
            float: left;
            font-size: 24px;
            line-height: $headerHeight;
            margin: 0;
            padding: 0;
            font-weight: normal;
            margin-left: 40px;
        }
        .header-right {
            line-height: 70px;;
            float: right;
            padding-right: 50px;
            &:after {
                content: '';
                display: block;
                clear: both;
            }
            .right-info {
                float: left;
                color: #334950;
                font-size: 15px;
                line-height: $headerHeight;
                a {
                    cursor: pointer;
                    line-height: 36px;
                    padding: 0 15px;
                    position: relative;
                    border-right: 2px solid #C6CBD3;
                    .info-data{
                        color: #FC4488;
                        padding-left: 5px;
                    }
                    .wellcome-data{
                        color: #0078C7;
                        padding-left: 5px;
                    }
                }
                &:last-child {
                    a {
                        border: none;
                    }
                }
            }
            .login-out {
                float: right;
                margin-left: 15px;
            }
        }
    }
</style>
<script type="text/ecmascript-6">
    import storage from '../services/storageService.js';
    import {mapState, mapMutations} from 'vuex';

    export default {
        name:'GlobalHeader',
        data: function () {
            return {
                name: 'lilei'
            }
        },
        watch:{
            $route(){

            }
        },
        computed:{
            ...mapState(['user','isLogin']),
        },
        methods: {
            ...mapMutations(['INIT_USER']),
            loginOut(){
                this.INIT_USER(null);
                storage.remove('user');
                this.$router.push({path: '/login'})
            }
        }
    }
</script>