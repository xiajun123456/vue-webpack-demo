<template>
    <common-dialog :title="modalTitle"
                   @ok="ok"
                   @closeDialog="close">
        <vue-form :state="formstate">
            <form-field-validate :messages="{required:'不能为空',pattern:'6到9位的大写小写数字'}"
                                 :name="'loginName'"
                                 :label="'登录名'">
                <input v-model="edit.loginName"
                       class="el-input__inner"
                       required
                       name="loginName"
                       pattern="\w{6,9}"/>
            </form-field-validate>

            <form-field-validate :messages="{required:'不能为空',pattern:'1到13位的汉字数字大写小写字母'}"
                                 :name="'userName'"
                                 :label="'用户名'">
                <input v-model="edit.userName"
                       class="el-input__inner"
                       required name="userName"
                       pattern="[\u4e00-\u9fa5a-zA-Z0-9]{1,13}"/>
            </form-field-validate>

            <form-field-validate :messages="{required:'不能为空',pattern:'1到7位的汉字数字大写小写字母'}"
                                 :name="'xname'"
                                 :label="'姓名'">
                <input v-model="edit.xname"
                       class="el-input__inner"
                       required
                       name="xname"
                       pattern="[\u4e00-\u9fa5a-zA-Z0-9]{1,7}"/>
            </form-field-validate>

            <form-field-validate :messages="{required:'不能为空',pattern:'11位电话号码'}"
                                 :name="'mobile'"
                                 :label="'联系方式'">
                <input v-model="edit.mobile"
                       class="el-input__inner "
                       required
                       name="mobile"
                       pattern="1[34578]\d{9}"/>
            </form-field-validate>

            <form-field-validate :messages="{required:'不能为空',pattern:'3到6位数字'}"
                                 :name="'area'"
                                 :label="'地区'">
                <address-selector v-model="edit.area" name="area"></address-selector>
            </form-field-validate>

            <form-field-validate :messages="{required:'不能为空'}"
                                 :name="'remarks'"
                                 :label="'备注'">
                    <textarea name="remarks"
                              class="el-eara__inner el-input__inner"
                              required
                              cols="30"
                              rows="3"
                              v-model="edit.remarks"></textarea>
            </form-field-validate>

        </vue-form>
    </common-dialog>
</template>
<script type="text/ecmascript-6">
    import formFieldValidate from 'S/components/FormFieldValidate.vue';
    import addressSelector from  'S/components/AddressSelector.vue';
    import commonDialog from 'S/components/CommonDialog.vue';
    import $http from 'S/request/asyncRequest';

    export default  {
        data(){
            return {
                formstate: {},
            }
        },
        props: ['isAdd', 'edit', 'modalTitle', 'showEdit', 'closeDialog', 'search'],
        components: {
            formFieldValidate,
            addressSelector,
            commonDialog
        },
        methods: {
            close(done){
                this.$emit('closeDialog')
            },
            ok(){
                if (!this.edit.area.area) {
                    this.$message({
                        message: '请选择地区',
                        type: 'warning'
                    });
                    return;
                }
                if (this.formstate.$invalid) {
                    this.$message({
                        message: '信息输入错误!请重新输入...',
                        type: 'warning'
                    });
                    return;
                }
                let port = this.isAdd ? 'addUser' : 'editUser';
                $http.user[port](this.edit).then(data => {
                    this.$message({
                        message: data.message,
                        type: 'success'
                    });
                    this.$emit('closeDialog');
                    this.$emit('search');
                }).catch(err => {
                    this.$message({
                        message: err.message,
                        type: 'success'
                    });
                })
            },
        }
    }
</script>