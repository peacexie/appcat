<template>
    <view>
        <!--swiper-start-->
        <view class="page-section swiper">
            <view class="page-section-spacing">
                <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" 
                    :interval="interval" :duration="duration"> 
                    <swiper-item v-for="(row,index) in cargo" :key="index" @tap="$tool.go(row)">
                        <image class="swpPics" mode="aspectFit" 
                            :src="$tool.vpic([row.mpic,'demo_120x90.jpg'])"></image>  
                    <view class="uni-product-title">{{row.title}}</view>
                    </swiper-item>
                </swiper>
            </view>
        </view>
        
        <view class='home-grid'>
            <uni-grid :options="modNavs" @click="goMod" type="oblong"/>
        </view>

        <!--list-start-->
        <view class="title">
            <view class="more" @tap="$tool.nav('faqs/home')">More</view>
            热门问答
        </view>
        <uni-list>
            <uni-list-item v-for="(row,k2) in faqs" @click="goRow(row,'faqs')" :key="k2" :title="row.title" />
        </uni-list>
            
        <view class="uni-padding-wrap home-adv" @tap="$tool.go()">
            <image style="width:100%; max-height:60px;" mode="scaleToFill" 
                :src="$tool.vpic(['favor','adv_250x060a.jpg'])"></image>
        </view>
        
        <view class="title">
            <view class="more" @tap="$tool.nav('news/home')">More</view>
            热门资讯
        </view>
        <view class="uni-list">
            <inc-news1 v-for="(row,k2) in news" @click="goRow(row,'news')" :key="k2" :row="row"></inc-news1>
        </view>
        
        <!--pro-lists-->
        <view class="title">
            <view class="more" @tap="$tool.nav('pro/home')">More</view>
            热门产品
        </view>
        <view class="uni-product-list">
            <inc-pro1 v-for="(row,index) in cargo" :key="index" :row="row"></inc-pro1>
        </view>
        
        <!--grid-start-->
        <view class="uni-swiper__box" style="background:#FFF;">
            <!-- -->
            <view class="uni-swiper__info">
                <view class="uni-swiper__info-item" @click="$tool.nav('news/home')">
                    <image class="ico-mod" src="../../static/icob/mod-1info.png"></image>
                    <text>资讯</text>
                </view>
                <view class="uni-swiper__info-item" @click="$tool.nav('pro/home')">产品</view>
                <view class="uni-swiper__info-item" @click="$tool.nav('faqs/home')">问答</view>
            </view>
            <view class="uni-swiper__info">
                <view class="uni-swiper__info-item" @click="$tool.tab('demo/index')">测试</view>
                <view class="uni-swiper__info-item uni-text-gray" @click="$tool.tab('demo/null')">期待中...</view>
                <view class="uni-swiper__info-item" @click="$tool.tab('user/home')">我的</view>
            </view>
        </view>

        <!--hot-lists-->
        <swiper style="height:350rpx;" autoplay="true" circular="true" interval="5000" display-multiple-items="2" next-margin="30px">
            <swiper-item v-for="row in cargo" :key="row.did">
                <view class="iViewSwiper">
                    <view>
                        <view class="swpPic2">
                            <image mode="aspectFit" 
                                :src="row.mpic ? row.mpic : $tool.sroot.basic+'demo_120x90.jpg'"></image>
                        </view>
                        <view>
                            <text>{{row.area_id}}</text>
                        </view>
                    </view>
                    <view>
                        <view>
                            <text>{{row.title}}</text>
                        </view>
                        <view>
                            <text>{{row.mj}}</text>
                            <text>{{row.price}}</text>
                        </view>
                    </view>
                </view>
            </swiper-item>                    
        </swiper>
        
        <com-foot :name="'name'"></com-foot>
    </view>
</template>

<script>

    //import {uniList,uniListItem,uniGrid} from '@dcloudio/uni-ui'
    import {uniList}     from '@/components/uniui/lib/uni-list/uni-list'
    import {uniListItem} from '@/components/uniui/lib/uni-list-item/uni-list-item'
    import {uniGrid}     from '@/components/uniui/lib/uni-grid/uni-grid'
    import incNews1 from '@/components/incs/incNews1.vue'
    import incPro1 from '@/components/incs/incPro1.vue'
    import comFoot from '@/components/incs/comFoot'
    
    export default {
        components: {
            uniList, uniListItem, uniGrid,
            incNews1, incPro1,
            comFoot
        },
        data() {
            return {
                // swiper-start
                indicatorDots: true,
                autoplay: true,
                interval: 2000,
                duration: 500,
                // grid
                modNavs: [
                    {id:12, image:'/static/icob/mod-1info.png', path:'news/home', text:'资讯'},
                    {id:14, image:'/static/icob/mod-2pro.png', path:'pro/home', text:'产品', class:'uni-text-gray' },
                    {id:16, image:'/static/icob/mod-3faqs.png', path:'faqs/home', text:'问答'},
                    {id:22, image:'/static/icob/mod-house.png', path:'house/home', text:'楼盘'},
                    {id:24, image:'/static/icob/mod-sale.png', path:'house/home', text:'出售'},
                    {id:26, image:'/static/icob/mod-rent.png', path:'house/home', text:'出租'}
                ],
                // 
                productList: [],
                renderImage: false,
                // 
                faqs:{}, news:{}, cargo:{},
                                
                text: '',
                // end
                end: '1'
            };
        },
        onNavigationBarButtonTap(e) {
            uni.navigateTo({
                url: '/pages/index/sinfo'
            });
        },
        onLoad() {
            this.loadData();
            setTimeout(()=> {
                this.renderImage = true;
            }, 300);
            // #ifdef APP-PLUS
            plus.nativeUI.showWaiting('加载中……');
            // #endif
            this.getData();
        },
        onPullDownRefresh() {
            this.loadData('refresh');
            this.getData();
        },
        onReachBottom() {
            this.loadData();
        },
        onReady() {
            // #ifdef APP-PLUS
            plus.nativeUI.closeWaiting();
            // #endif
        },
        methods: {
            loadData(action = 'add') {
                if (action === 'refresh') {
                    this.productList = [];
                }
            },
            goMod(e) {
                uni.navigateTo({
                    url: '/pages/'+this.modNavs[e.index].path
                });
            },
            goRow(row, mod) { 
                uni.navigateTo({
                    url: '/pages/'+mod+'/view?did='+row.did
                });
            },
            
            async getData() {
                await this.$ureq.commApi('root',{}).then(res => { 
                    //uni.showToast({title:'请求成功',icon:'success', mask:true});
                    //console.log(res.data);
                    this.faqs = res.data.faqs;
                    this.news = res.data.news;
                    this.cargo = res.data.cargo;
                    uni.stopPullDownRefresh();
                }).catch((err)=>{
                    console.log('request fail', err);
                })   
            }
        }
    }
</script>

<style lang="less">
    
    .home-grid{ background:#FFF; padding:0.5rem 0; }
    
    .home-adv{ background:#FFF; padding-top:0.5rem; }
    .ico-mod{
        /*display:block !important;
        clear:both;
        margin: 0 auto;*/
        width: 48rpx;
        height: 48rpx;
    }
    .more{ display:inline-block; float:right; padding-left:0.5rem; }
    .title {
        padding: 20rpx;
    }
    
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