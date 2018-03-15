<template>
    <div class="table-view-container">
        <div class="table-view-table ">
            <table class="table" v-if="rowDatas.length && loaded">
                <thead>
                <tr>
                    <th ng-if="rowSelection" class="td-checkbox">
                        <input type="checkbox"
                               v-model="checkedAll"
                               @change="selectItemsInCurrentPage"/>
                    </th>
                    <th v-for="th in tableHeader">
                        {{th}}
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="rowData in rowDatas">
                    <td ng-if="rowSelection" class="td-checkbox">
                        <input type="checkbox"
                               :checked='selected'
                               :value="rowData.raw.userId"/>
                    </td>
                    <td v-for="td in rowData.data">
                        <div :title="td.val">{{td.val}}</div>
                        <button v-if="td.arrays && td.arrays.length"
                              class="task-reve"
                              v-for="btn in td.arrays"
                              @click="btn.onClick($event)">
                            <span>{{btn.text}}</span>
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="panel panel-default" v-if="!loaded && searched">
            <div class="panel-body center-inline">
                <img class="load-icon" src="../../images/loading.gif" alt=""/>
                数据加载中…
            </div>
        </div>
        <div class="panel panel-default" v-if="!rowDatas.length && loaded">
            <div class="panel-body center-inline">
                <span class="">): 没有数据</span>
            </div>
        </div>
        <el-pagination v-if="rowDatas.length && loaded"
                       :current-page="pager.currentPage"
                       :page-size='pager.itemsPerPage'
                       :total="pager.total"
                       layout="total,prev,pager,next"
                       @current-change="pageIndexChange">

        </el-pagination>
    </div>
</template>
<style type="text/scss" lang="scss" scoped>
    .table {
        width: 100%;
        overflow: auto;
        text-align: center;
        background: #fff;
        input[type='checkbox'] {
            background: #fff;
            width: 15px;
            height: 15px;
            border: 1px solid #D0D0D0;
            cursor: pointer;
        }
        thead {

            tr {
                height: 24px;
                line-height: 24px;
            }
        }
        tbody {

            tr {
                height: 26px;
                line-height: 26px;
            }
        }
    }

    table.table {
        text-align: center;
        font-size: 13px;
        margin-bottom: 0;
        th {
            font-size: 14px;
            text-align: center;
        }
        .btn {
            font-size: 13px;
        }

    }

    .table-view-container {
        background: #fff;
        padding-bottom: 15px;
    }

    .table-view-container .table-view-table thead tr th {
        border: none;
        background: #FCFCFC;
        border-bottom: 2px solid #dcdcdc;
        color: #676767;
        height: 46px;
        font-weight: normal;
        font-size: 14px;

    }

    .table-view-container .table-view-table tbody tr td {
        border: none;
        background: #FFFFFF;
        height: 56px;
        color: #202023;
        font-size: 14px;
        border-bottom: 1px solid #dcdcdc;

    }

    .backTab .table tr:nth-child(4n+3) {
        background: #FCFCFC
    }

    .backTab .table tr:nth-child(4n+4) {
        background: #FCFCFC
    }

    .backTab .table tr:nth-child(4n+1) {
        background: #fff !important;
    }

    .backTab .table tr:nth-child(4n+2) {
        background: #fff !important;
    }

    .table-view-container .table-view-table tbody tr .mark-prompt {
        color: #E25017;
    }

    .task-reve {
        color: #42a1ea;
        background: #fff;
        text-decoration: underline;
        border: none;
        outline: none;
        border-right: 2px solid #B2C6E1;
        cursor: pointer;
        padding: 0 7px;
        &:hover {
            color: #2C8BD8;
        }

    }

    .table-view-table tbody td .task-reve:last-child {
        border: none;
    }
</style>
<script type="text/ecmascript-6">
    export default{
        name:'TableView',
        props: {
            rowDatas:Array,
            tableHeader:Array,
            loaded:Boolean,
            searched:Boolean,
            rowSelection:Boolean,
            pager:Object
        },
        data(){
            return {
                checkedAll: false,
                selected: false
            }
        },
        methods: {
            pageIndexChange(page){
                this.pager.currentPage = page;
                this.$emit('pageIndexChange', page)
            },
            selectItemsInCurrentPage(){
                this.selected = this.checkedAll
            }
        }
    }
</script>