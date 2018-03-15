<template>
    <div id="app" :class="{'is-login':isLogin}">
        <global-header></global-header>
        <side-menu></side-menu>
        <div class="content-view">
            <router-view></router-view>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import sideMenu from './shared/components/SideMenu.vue';
    import globalHeader from './shared/components/GlobalHeader.vue';
    import {mapState, mapMutations} from 'vuex';
    import storage from './shared/services/storageService.js';
    export default {
        name: 'app',
        created(){
            let user = storage.get('user');
            if (user) {
               this.INIT_USER(user)
            }
        },
        computed: {
            ...mapState(['isLogin'])
        },
        methods:{
            ...mapMutations([
                'INIT_USER'
            ]),
        },
        components: {
            sideMenu,
            globalHeader
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
    @import "./style/_variables";

    .content-view {
        transition: all 0.2s linear;
        position: absolute;
        top: $headerHeight;
        left: $menuWidth;
        background: #f0f3f6;
        right: 0;
        bottom: 0;
        overflow: auto;
        padding: 10px 20px;
    }

    .is-login {
        .global-header {
            margin-top: -$headerHeight;
        }
        .side-menu-container {
            margin-left: -$menuWidth;
        }
        .content-view {
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: #fff;
        }
    }
</style>