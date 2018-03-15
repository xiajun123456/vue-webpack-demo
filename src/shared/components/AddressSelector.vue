<template>
    <div>
        <el-select v-model="province"
                   placeholder='选择省份'
                   clearable
                   @change='handleProvinceChange()'>
            <el-option
                    v-for="provinces in provinceList"
                    :key='provinces.id'
                    :value="provinces.id"
                    :label="provinces.name">
            </el-option>
        </el-select>
        <el-select v-model="city"
                   v-if='province'
                   placeholder='选择城市'
                   clearable
                   @change='handleCityChange()'>
            <el-option
                    v-for="citys in cityList"
                    :key='citys.id'
                    :value="citys.id"
                    :label="citys.name">
            </el-option>
        </el-select>
        <el-select v-model="area"
                   v-if='city && province'
                   placeholder='选择区县'
                   clearable
                   @change='handleAreaChange()'>
            <el-option
                    v-for="areas in areaList"
                    :key='areas.id'
                    :value="areas.id"
                    :label="areas.name">

            </el-option>
        </el-select>
    </div>
</template>

<script>
    import request from 'S/request/asyncRequest';
    import {loopData, loadDistrict} from 'S/services/addressSelectorService';
    export default {
        name: 'AddressSelector',
        data(){
            return {
                province: '',
                provinceList: null,
                city: '',
                cityList: null,
                area: '',
                areaList: null,
                beforeData: {}
            }
        },
        computed: {
            areas(){
                var area = {};
                if (this.province) {
                    area.province = loopData(this.provinceList, this.province)
                }
                if (this.city) {
                    area.city = loopData(this.cityList, this.city);
                }
                if (this.area) {
                    area.area = loopData(this.areaList, this.area);
                }
                return area
            }
        },
        watch: {
            province(){
                this.$emit('input', this.areas);
            },
            city(){
                this.$emit('input', this.areas);
            },
            area(){
                this.$emit('input', this.areas)
            }
        },
        props: {
            value: {
                type: Object
            }
        },
        methods: {
            handleProvinceChange(){
                this.city = '';
                this.area = '';
                this.cityList = [];
                this.areaList = [];
                if (!this.province) {
                    return
                }
                request.area.getCitys({parent: this.province.id}).then(data => {
                    this.cityList = data.rows;
                    if (this.beforeData.city) {
                        this.city = loadDistrict(data.rows, this.beforeData.city);
                        this.beforeData.city = '';
                    }
                })
            },
            handleCityChange(){
                this.area = '';
                this.areaList = [];
                if (!this.city) {
                    return
                }
                request.area.getAreas({parent: this.city.id}).then(data => {
                    this.areaList = data.rows;
                    if (this.beforeData.area) {
                        this.area = loadDistrict(data.rows, this.beforeData.area);
                        this.beforeData.area = '';
                    }
                })
            },
            handleAreaChange(){

            }
        },
        mounted(){
            if (this.value) {
                this.beforeData = {
                    province: this.value.province ? this.value.province.id : '',
                    city: this.value.city ? this.value.city.id : '',
                    area: this.value.area ? this.value.area.id : ''
                }
            }
            request.area.getProvince({}).then(data => {
                this.provinceList = data.rows;
                if (this.beforeData.province) {
                    this.province = loadDistrict(data.rows, this.beforeData.province);
                }
            })
        }
    }
</script>