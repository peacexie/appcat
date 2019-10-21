<template>
    <view class="page">
        
        <view v-for="(part,k1) in resd['parts']" :key="k1">
            <view class="title">
                <view class="more" @tap="nav('faqs/list?stype='+k1)">More</view>
                {{ part.title }}
            </view>
            <view class="uni-list">
                <inc-faqs1 v-for="(row,k2) in resd[k1]" :key="k2" :row="row" :showImg="showImg"></inc-faqs1>
            </view>
        </view>
        
        <uni-load-more v-if="loading" :status="status" :content-text="loadMsgs" />
    </view>
</template>

<script>
    
    import incFaqs1 from '@/components/incs/incFaqs1.vue'
    import uniLoadMore from '@/components/uniui/lib/uni-load-more/uni-load-more' // uniIcon,
    
    export default {
        components: {
            incFaqs1,
            uniLoadMore
        },
        data() {
            return {
                resd: {},
                showImg: 0,
                loadMsgs: { //加载的内容
                	contentrefresh: '加载中'
                },
                loading: '1',
                status: 'loading'
            }
        },
        onLoad() {
            this.loadData();
        },
        methods: {
            async loadData() {
                await this.$ureq.commApi('faqs', {}).then(res => {
                    this.resd = res.data;
                    this.showImg = 1;
                    this.loading = '';
                    //this.sText = '';
                    uni.stopPullDownRefresh();
                }).catch((err)=>{
                    console.log('加载失败', err);
                })
            },
            nav(path) {
                uni.navigateTo({
                    url: '/pages/'+path
                });
            }
        }
    }
</script>

<style>
    .more{ display:inline-block; float:right; padding-left:0.5rem; }
    .title {
        padding: 20rpx;
    }
</style>
