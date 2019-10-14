<template>
    <view class="">
        <text>sample</text>
    </view>
</template>

<script>
    
    //import incNews1 from '@/components/incs/incNews1.vue'
    
    export default {
        components: {
            //incNews1
        },
        data() {
            return {
                //resd: {},
                end: 1
            }
        },
        onLoad() {
            //this.loadData();
        },
        methods: {
            /*async loadData() {
                await this.$http.commApi('news', {}).then(res => {
                    this.resd = res.data;
                }).catch((err)=>{
                    console.log('加载失败', err);
                })
            }*/
        }
    }
    
</script>

<style>
</style>
