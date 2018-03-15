<template>
    <el-dialog :title="title"
               v-if="showOperateManifest"
               size="tiny"
               :close-on-click-modal="false"
               :before-close="close"
               v-model="showOperateManifest">
        <slot></slot>
        <div  style="text-align: center" slot="footer" >
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="sure">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script type="text/ecmascript-6">
    export default {
        name:'CommonDialog',
        data(){
            return {
                showOperateManifest:true
            }
        },
        props:{
            title:String,
            closeDialog:Function,
            ok:Function
        },
        methods:{
            close(){
                this.$emit('closeDialog')
            },
            sure(){
               this.$emit('ok')
            }
        }
    }
</script>