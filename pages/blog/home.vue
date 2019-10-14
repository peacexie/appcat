<template>
    <view class="page">
        
        <view class="uni-padding-wrap wtop">
        	<view class="page-section swiper">
        		<view class="page-section-spacing">
        			<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" 
                        :interval="interval" :duration="duration">
                        <swiper-item v-for="(row,index) in walls" :key="index">
        					<view class="swiper-item witem" :style="{color:wColor(row,'vtxt'),backgroundColor:wColor(row,'vbg')}"
                                @tap="nav('blog/wall?stype='+row.part)">
                                <view class="wfoot">
                                    <text class="r">{{row.atimeStr}}</text>
                                    <view>
                                        {{wtab[row.part]}}
                                        <uni-icon type="eye" color="#999" style="padding:0 0.2rem;" /> 
                                        {{row.diggtop}}
                                    </view>
                                </view>
                                <view>{{row.title}}</view>
                            </view>
        				</swiper-item>
        			</swiper>
        		</view>
        	</view>
        </view>
        
        <view class="myTools">
            <view class="myToolBox" v-for="(tab,no) in wtab" :key="no" 
                @tap="nav('blog/wall?stype='+no)">
                <text>
					<text class="w3logo">{{upCase(no)}}</text>
				</text>
                <text>{{tab}}</text>
            </view>
        </view>
        
        <view v-for="(part,k1) in resd['parts']" :key="k1">
            <view class="title">
                <view class="more" @tap="nav('blog/list?stype='+k1)">More</view>
                {{ part.title }}
            </view>
            <view class="uni-list">
                <inc-blog v-for="(row,k2) in resd[k1]" :key="k2" :row="row" :showImg="showImg"></inc-blog>
            </view>
        </view>
        
        <uni-load-more v-if="loading" :status="status" :content-text="loadMsgs" />
        <view style="height:20rpx;"></view>
    </view>
</template>

<script>
    
    import {uniIcon} from '@dcloudio/uni-ui' // uniIcon,
    import incBlog from '@/components/incs/incBlog.vue'
    import {uniLoadMore} from '@dcloudio/uni-ui' // uniIcon,
    
    export default {
        components: {
            uniIcon,
            incBlog,
            uniLoadMore
        },
        data() {
            return {
                indicatorDots: true,
                autoplay: true,
                interval: 2000,
                duration: 500,
                wtab: {},
                walls: [],
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
                await this.$ureq.blogApi('info', {}).then(res => {
                    this.resd = res.data
                    this.walls = res.data.walls
                    this.wtab = res.data.wtab
                    this.showImg = 1
                    this.loading = ''
                    //this.sText = '';
                    uni.stopPullDownRefresh()
                }).catch((err)=>{
                    console.log('加载失败', err)
                })
            },
			upCase(word) {
				return word[0].toUpperCase() + word.slice(1,8);	
			},
            wColor(row,key) {
                return this.$tool.wColor(row,key)
            },
            nav(path) {
                uni.navigateTo({
                    url: '/pages/'+path
                });
            }
        }
    }
</script>

<style lang="less">
    
	.wtop{ width:730rpx; background:#FFF; font-size:lager; padding:10rpx; }
    .witem{ text-align:left !important; position:relative; padding:0.5rem; }
    .wfoot{ position:absolute; width:95%; bottom:1.5rem; text-align:left; color:#999; 
        background:#DDD; display:block; }
    .wfoot .r{ float:right; }
	.w3logo{ font-size:lager; color:#369; background:#EEE;
		border:1px solid #999; padding:0.2rem 0.5rem; border-radius:0.5rem 
	 }

    .swiper {
    	height: 300upx;
    }
    .swiper-item {
    	display: block;
    	height: 300upx;
    	line-height: 300upx;
    	text-align: center;
    }
    .swiper-list {
    	margin-top: 40upx;
    	margin-bottom: 0;
    }
    
	.myTools{
		display: flex;
		flex-wrap: wrap;
		flex-direction:row;
		background:#FFF;
		padding: 30rpx 0;
        border-top: 30rpx solid #DDD;
        border-bottom: 30rpx solid #DDD;
	}
	.myToolBox{
		display: flex;
		flex-wrap:wrap;
		flex-direction: column;
		justify-items: center;
		border-right:solid 1px #eee; 
		width: 33.33%;
		box-sizing: border-box;
		&{flex-grow: 1;}
		&:last-child{ border-right: none;}
		text{
			text-align: center;
			margin-top:5px;
		}
		text:first-child{
			margin-top:10px;
		}
		image{
			margin: 0 auto;
			width: 64rpx;
			height: 64rpx;
		}
	}
	.icoBox{
		display: flex;
		flex-wrap: wrap;
		flex-direction:row;
		padding:0 0;
		view{
			.myToolBox();
			 padding: 20px 0;
			 border-bottom:solid 1px #eee;
			 position: relative;
			 }
			.badgeBox{
			 	position: absolute; 
			 	right:85rpx; 
			 	top:5rpx;
			}
	}
    
</style>
