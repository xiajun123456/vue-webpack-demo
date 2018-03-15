<template>

        <validate class="form-content">
            <div class="form-group">
                <label class="form-label">
                    {{label}}:
                </label>
                <div class="input-container">
                    <slot></slot>
                </div>
            </div>

            <field-messages :name="name" show="$touched || $dirty">
                <div v-for="(message,key) in messages"
                     :slot="key"
                     class="text-warning">
                    {{message}}
                </div>
            </field-messages>
        </validate>

</template>
<style type="text/scss" lang="scss">
    .form-label {
        font-weight: normal;
        margin-bottom: 0;
        text-align: right;
        font-size: 14px;
        color: #7C7F90;
        display: block;
        line-height: 36px;
        width: 15%;
        float: left;
        padding-right: 10px;
        box-sizing: border-box;
    }

    .form-content {
        height: 60px;
    }

    .form-group:after {
        content: '';
        display: block;
        clear: both;
    }

    .text-warning {
        font-size: 12px;
        color: #ff0000;
        display: inline-block;
        margin-right: 5px;
    }

    .form-content .text-warning:nth-child(1) {
        padding-left: 15%;
    }

    .input-container {
        float: left;
        width: 83%;
    }
</style>
<script type="text/ecmascript-6">
    export default{
        name: 'FormFieldValidate',
        props: {
            messages: {
                type: Object
            },
            name: {
                type: String
            },
            label: {
                type: String
            }
        }
    }
</script>