<template>
    <view>
        <uni-load-more v-if="loading" :status="status" :content-text="loadMsgs"/>
        
        <!--swiper-start-->
        <view class="page-section swiper" style="background:#FFFFFF;">
            <view class="page-section-spacing">
                <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" 
                    :interval="interval" :duration="duration"> 
                    <swiper-item v-for="(itm,index) in pics" :key="index" @tap="$tool.go(itm)">
                        <image class="swpPics" mode="aspectFit" 
                            :src="$tool.vpic([itm[0],'demo_120x90.jpg'])"></image>  
                    <view class="uni-product-title">{{itm[1]}}</view>
                    </swiper-item>
                </swiper>
            </view>
        </view>
          
        <view class="title">
            <view class="more" @tap="$tool.nav('cargo/home')">More</view>
            基本参数
        </view>
        <view class="uni-list">
            <block v-for="(itm,index) in attr" :key="index">
                <view v-if="itm.key!='end'" class="uni-list-cell" hover-class="uni-list-cell-hover">
                    <view class="uni-triplex-row">
                        <view class="uni-triplex-left uni-attr-left">
                            <text class="uni-ellipsis">{{itm.key}}</text>
                        </view>
                        <view class="uni-triplex-right uni-attr-right">
                            <text class="">{{itm.val}}</text>
                        </view>
                    </view>
                </view>
            </block>
        </view>
        
        <view class="title">
            <view class="more" @tap="$tool.nav('cargo/home')">More</view>
            详情介绍
        </view>
        <view class="cont">
           <view v-if="!detail" class="nodetail">(暂无介绍)</view>
           <uParse v-else :content="detail" />
        </view>
          
        <view class="uni-padding-wrap home-adv" @tap="$tool.go()">
            <image style="width:100%; max-height:60px;" mode="scaleToFill" 
                :src="$tool.vpic(['favor','adv_250x060a.jpg'])"></image>
        </view>

        <!--pro-lists-->
        <view class="title">
            <view class="more" @tap="$tool.nav('pro/home')">More</view>
            热门产品
        </view>
        <view class="uni-product-list">
            <inc-pro1 v-for="(itm,index) in rels" :key="index" :row="itm" :dir="1"></inc-pro1>
        </view>
        
        <fab-Nav/>
    </view>
</template>

<script>

    import {uniList,uniListItem,uniGrid} from '@dcloudio/uni-ui'
    import uParse from 'gaoyia-parse';
    import incPro1 from '@/components/incs/incPro1.vue'
    import fabNav from '@/components/tool/fabNav'
    import {uniLoadMore} from '@dcloudio/uni-ui' // uniIcon,
    
    export default {
        components: {
            uniList, uniListItem, uniGrid,
            uParse, incPro1, 
            fabNav, uniLoadMore
        },
        data() {
            return {
                did: '',
                row: [],
                pics: [],
                rels: [],
                attr: [],
                detail: '(...加载中...)',
                // swiper-start
                indicatorDots: true,
                autoplay: true,
                interval: 2000,
                duration: 500,
                loadMsgs: { //加载的内容
                	contentrefresh: '加载中'
                },
                loading: '1',
                status: 'loading',
                ermsg: '', // 加载中...
                end: 1
            };
        },
        onNavigationBarButtonTap(e) {
            this.$tool.tab();
        },
        onLoad(cfg) {
            this.did = cfg.did;
            this.loadData();
        },
        methods: {
            goRow(row, mod) { 
                uni.navigateTo({
                    url: '/pages/'+mod+'/view?did='+row.did
                });
            },
            async loadData() {
                await this.$ureq.commApi('cargo.'+this.did, {}).then(res => { console.log(res.data)
                    this.row = res.data.row
                    this.pics = res.data.pics
                    this.rels = res.data.rels
                    this.loading = ''
                    let row = this.row
                    this.attr = [
                        {key:'产品名称', val:row.title},
                        {key:'产品规格', val:row.guige},
                        {key:'产品型号', val:row.xinghao},
                        {key:'最新更新', val:row.etimeStr},
                        {key:'网购价格', val:''+row.price+''},
                        {key:'end', val:1}
                    ]
                    this.detail = row.detail ? row.detail : '';
                }).catch((err)=>{
                    console.log('request fail', err)
                })   
            }
        }
    }
</script>

<style lang="less">

    .cont{ background:#FFFFFF; padding:0.5rem; margin:0 0.5rem 1rem 0.5rem; }
    .cont .nodetail{ height:3rem; background:#EEE; text-align:center; padding:0.5rem; }
    .uni-attr-left{ width:30%; text-align:left; color:#666666; }
    .uni-attr-right{ width:70%; text-align:right; }

    .home-adv{ background:#FFF; padding-top:0.5rem; }

    /* swiper-start */
    .swiper {
        height: 300rpx;
    }
    .swiper-item {
        display: block;
        height: 300rpx;
        line-height: 300rpx;
        text-align: center;
    }
    .swiper-list {
        margin-top: 40rpx;
        margin-bottom: 0;
    }
    .uni-common-mt{
        margin-top:60rpx;
        position:relative;
    }
    .info {
        position: absolute;
        right:20rpx;
    }
    /* swiper-end */
 
    .uni-swiper__box {
        margin-top: 30rpx;
    }
    
    .uni-swiper__info {
        display: flex;
        padding: 0 15rpx;
    }
    
    .uni-swiper__info-item {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 15rpx;
        height: 60rpx;
        width: 100%;
        font-size: 28rpx;
        color: #333;
        border: 1px #eee solid;
        border-radius: 10rpx;
    }
    .swpPics{ width:100%; height:100%; }
    .swpPic2{ 
        text-align: center;
        image{ width:50%; height:300rpx; }
    }
    
    page {
        height: auto;
        min-height: 100%;
    }

    .v01{
        font-size: 30rpx;
        margin:1rem auto;
    }
    
</style>