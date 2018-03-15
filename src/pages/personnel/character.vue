<template>
    <div>
        <div class="view-header">
            用户 > 用户列表
        </div>
        <div class="search-list">
            <button class="btn-add btn btn-comm"
                    @click="addUser">
                <i class="el-icon-plus"></i> 添 加
            </button>
            <button class="btn-delete btn-comm btn"
                    @click="deleteUser">
                <i class="el-icon-delete"></i> 删 除
            </button>
            <div class="search-right">
                <div class="adderss-c">
                    <address-selector v-model="search.area"></address-selector>
                </div>
                <div class="search-key-world">
                    <input type="text" class="form-control" v-model="search.keyWord" placeholder="关键字">
                </div>
                <button class="btn-search btn " @click="searchUser">
                    <i class="el-icon-search"></i> 查 询</button>
            </div>
        </div>
        <table-view :rowDatas='transformedRowData'
                    :tableHeader='tableHeaders'
                    :loaded='loaded'
                    :searched='searched'
                    :rowSelection="rowSelection"
                    :pager='pager'
                    @pageIndexChange='pageIndexChange'>

        </table-view>
        <edit-character v-if="showEdit"
                        :edit="edit"
                        :modalTitle="modalTitle"
                        @closeDialog="close"
                        @search="search"
                        :isAdd="isAdd">

        </edit-character>

    </div>
</template>
<script>
    import addressSelector from 'S/components/AddressSelector.vue';
    import $http from 'S/request/asyncRequest';
    import tabelViewServices from 'S/services/tableViewService';
    import _ from 'lodash';
    import tableView from 'S/components/TableView.vue';
//    import $ from 'jquery';
    import editCharacter from './components/edit-character.vue';
    import formatQueryParams from 'S/services/formatQueryParamsService';

    let tableList = {
        登录名: 'loginName',
        用户名: 'userName',
        姓名: 'xname',
        联系方式: 'mobile',
        省份: 'province',
        地市: 'city',
        区县: 'area',
        备注: 'remarks',
        操作: function (item, vm) {
            return {
                controls: [
                    {
                        'text': "编辑用户",
                        'onClick': function () {
                            vm.edit = item;
                            vm.showEdit = true;
                            vm.modalTitle = '编辑用户';
                            vm.isAdd = false;
                        }
                    },
                    {
                        'text': "重置密码",
                        'onClick': function () {
                            console.log(item)
                        }
                    }
                ]
            }
        }
    };

    export default {
        name: "user",
        data() {
            return {
                startTime: '',
                endTime: '',
                startPickerOptions: {
                    disabledDate(time){
                        return time.getTime() > Date.now();

                    }
                },
                endPickerOptions: {
                    disabledDate(time){
                        return time.getTime() > Date.now();
                    }
                },
                loaded: false,
                searched: true,
                showEdit: false,
                modalTitle: '添加用户',
                isAdd: false,
                search: {
                    area: {},
                    keyWord: ''
                },
                rowSelection: true,
                transformedRowData: [],
                tableHeaders: _.keys(tableList),
                pager: {
                    total: 0,
                    currentPage: 1,
                    sizeChange: 0,
                    itemsPerPage: 10,
                    pageIndex: 10
                },
                edit: {
                    loginName: '',
                    userName: '',
                    xname: '',
                    mobile: '',
                    area: {},
                    remarks: ''
                }
            }
        },
        components: {
            addressSelector,
            tableView,
            editCharacter
        },
        methods: {
            deleteUser(){
                let ele = $('.table-view-container tbody input:checked');
                if (!ele.length) {
                    this.$message({
                        showClose: true,
                        message: '删除列表不能为空',
                        type: 'warning'
                    });
                    return
                }
                let deleteList = _.map(eles, ele => {
                    return $(ele).val()
                });
                deleteList = deleteList.join(',');
                $http.user.deleteUser(deleteList).then(data => {
                    this.getUsers();
                    this.$message({
                        message: data.message,
                        type: 'success'
                    });
                }).catch(err => {
                    this.$message({
                        showClose: true,
                        message: err.message || '服务器错误!请稍后再试...',
                        type: 'error'
                    });
                })
            },
            close(){
                this.showEdit = false
            },
            addUser(){
                this.showEdit = true;
                this.isAdd = true;
                this.modalTitle = '添加用户';
                this.edit = {
                    loginName: '',
                    userName: '',
                    xname: '',
                    mobile: '',
                    area: {},
                    remarks: ''
                }
            },
            pageIndexChange(page){
                this.getUsers();
            },

            searchUser(){
                this.pager.currentPage = 1;
                this.getUsers();
            },
            getUsers(){
                var searchData = formatQueryParams.format(this.search, this.pager.currentPage, this.pager.itemsPerPage);
                this.loaded = false;
                this.searched = true;
                this.transformedRowData = [];
                $http.user.getUser(searchData).then((data) => {
                    this.loaded = true;
                    this.searched = false;
                    this.pager.total = data.total;
                    this.transformedRowData = tabelViewServices.transformToRowData(data.rows, tableList, this);
                }).catch((err) => {
                    this.loaded = true;
                    this.searched = false;
                    this.$message({
                        showClose: true,
                        message: err.message || '服务器错误!请稍后再试...',
                        type: 'error'
                    });
                })
            }
        },
        mounted(){
            this.getUsers()
        }
    }
</script>
<style type="text/scss" scoped>
    .search-key-world {
        float: left;
        margin-right: 10px;
    }

    .search-right {
        float: right;
        &:after {
            content: '';
            display: block;
            clear: both;
        }
    }

    .extranple {
        width: 50px;
        height: 50px;
        background: #ffff4f;
        transition: all 0.4s linear;
    }

    .el-dialog--tiny {
        width: 600px;
    }

    .el-eara__inner {
        width: 100%;
        height: 50px;
        padding: 10px;
    }

    .activeClass {
        width: 200px;
        height: 200px;
        background: #f00;
    }

    .p-content {
        transition: all .5s;
        background: #f00;
        width: 200px;
        height: 200px;
    }

    .f-content {
        width: 200px;
        height: 200px;
    }

    .tans-demo {
        transition: all 0.4s linear;
    }

    .fade-enter-active, .fade-leave {
        width: 200px;
        height: 200px;
    }

    .fade-enter, .fade-leave-active {
        opacity: 0;
        width: 0px;
        height: 0px;
    }

    .before-class {
        width: 20px;
        height: 20px;
        background: #ff0000;
    }

    .end-class {
        width: 100px;
        height: 100px;
        background: #ff0000;
    }
</style>