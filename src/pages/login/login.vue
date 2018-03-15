<template>
    <!--<div class="login-container">-->
        <!--<div class="login-header">-->
            <!--登陆-->
        <!--</div>-->
        <!--<div class="user-name">-->
            <!--<label>-->
                <!--<div class="input-title">用户名:</div>-->
                <!--<el-input-->
                        <!--type="text"-->
                        <!--v-model="loginName"-->
                        <!--placeholder="请输入用户名"-->
                        <!--name="loginName"/>-->
            <!--</label>-->
        <!--</div>-->
        <!--<div class="pass-world">-->
            <!--<label>-->
                <!--<div class="input-title">密码:</div>-->
                <!--<el-input-->
                        <!--type="text"-->
                        <!--v-model="passWord"-->
                        <!--placeholder="请输入密码"-->
                        <!--name="passWord"/>-->
            <!--</label>-->
        <!--</div>-->
        <!--<div class="login-btn">-->
            <!--<el-button-->
                    <!--type="primary"-->
                    <!--@click="login"-->
                    <!--:disabled="!loginName || !passWord">登 陆-->
            <!--</el-button>-->
        <!--</div>-->
    <!--</div>-->
    <div class="login-bg">
        <div class="login-container ">
            <div class="login-title">
                <h3>中国移动智能电表集抄管理系统</h3>
            </div>
            <div class="login-form-container">
                <form role="form" name="loginForm">
                    <div class="form-group">
                        <label class="form-label-s">
                            用户账号:
                        </label>
                        <input type="text"
                               class="form-control form-controls"
                               v-model="loginName"
                               name="loginName"
                               placeholder="请输入登录名"
                               required/>
                    </div>
                    <div class="form-group" style="margin-top:15px">
                        <label class="form-label-s">
                            输入密码:
                        </label>
                        <input type="password"
                               class="form-control form-controls"
                               name="passWord"
                               v-model="passWord"
                               placeholder="请输入密码"
                               required/>
                    </div>

                    <button @click="login"
                            type="button"
                            class="btn btn-block btn-info btn-login"
                            :disabled="!loginName || !passWord">登陆</button>
                </form>
                <div class="login-log">
                    <span class="line-left"></span>
                    <img src="../../images/login_logo.png" alt=""/>
                    <span class="line-right"></span>
                </div>
            </div>

        </div>
    </div>

</template>
<style lang="scss" type="text/scss" scoped>
    .login-container {
        width: 520px;
        position: absolute;
        top: 20%;
        left: 50%;
        margin-left: -250px;
        background: #EFF3F6;
        border-top-left-radius: 13px;
        border-top-right-radius: 13px;
        .login-title {
            h3 {
                text-align: center;
                background: #007FCC;
                line-height: 95px;
                padding: 0;
                margin: 0;
                border-top-left-radius: 12px;
                border-top-right-radius: 12px;
                color: #fff;
                font-size: 24px;
                font-weight: normal;
            }

        }
        .login-form-container {
            padding: 50px 60px 60px;
            .form-label-s {
                font-size: 17px;
                font-weight: normal;
                color: #2D3037;
                display: inline-block;
                margin-bottom: 7px;
            }
            .form-controls {
                height: 45px;
                border-color: #C5CACE;
                color: #2F2F3C;
            }
            .btn-login {
                height: 50px;
                margin-top: 40px;
            }
            .login-log {
                text-align: center;
                position: relative;
                margin-top: 50px;
                .line-left {
                    width: 130px;
                    height: 1px;
                    background: #CACED1;
                    position: absolute;
                    top: 50%;
                    left: 0;
                }
                .line-right {
                    width: 130px;
                    height: 1px;
                    background: #CACED1;
                    position: absolute;
                    top: 50%;
                    right: 0;
                }
            }
        }

    }

    .login-bg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url("../../images/pic_back.png");
    }
</style>
<script type="text/ecmascript-6">
    import storage from '../../shared/services/storageService.js';
    import request from '../../shared/request/asyncRequest.js';
    import {mapMutations} from 'vuex';

    export default {
        data(){
            return {
                loginName: '',
                passWord: ''
            }
        },
        methods: {
            ...mapMutations(['INIT_USER']),
            login(){
                if (!this.loginName || !this.passWord) {
                    return
                }
                request.user.login({
                    loginName: this.loginName,
                    passWord: this.passWord
                }).then(data => {
                    let user = data.data;
                    storage.set('user', user);
                    this.INIT_USER(user);
                    request.user.menu({}).then(data => {
                        user.menus = data.menus;
                        storage.set('user', user);
                        this.$router.push({path: '/dashboard'});
                    }).catch(err => {
                        this.$message({
                            showClose: true,
                            message: err.message || '服务器错误！',
                            type: 'warning'
                        });
                    })
                }).catch(err => {
                    this.$message({
                        showClose: true,
                        message: err.message || '服务器错误！',
                        type: 'warning'
                    });
                })
            }
        },
        mounted(){
            let _this = this;
            document.onkeyup = function (event) {
                let e = event || window.event;
                let keyCode = e.keyCode || e.which;
                if (keyCode == 13) {
                    _this.login()
                }
            }
        }
    }
</script>