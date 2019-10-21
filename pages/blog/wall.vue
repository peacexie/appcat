<template>
	<view class="">
        <view class="ubar">
            <scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
                <view class="swiper-tab-list" :class="tabIndex==-1 ? 'active' : ''"
                    @tap="tapTab(-1)">所有</view>
                <view v-for="(tab,index) in parts" :key="index" 
                    class="swiper-tab-list" :class="tabIndex==index ? 'active' : ''"
                    :id="index" :data-current="index" @click="tapTab">{{tab}}</view>
            </scroll-view>
        </view>
        
        <view style="height:auto;" @scrolltolower="loadMore()">
            <view v-for="(row,index2) in list" :key="index2">
                <inc-wall :row="row" :parts="parts" @close="close()" @click="goRow(row)"></inc-wall>
            </view>
        </view>
        
        <uni-load-more :status="status" :content-text="loadMsgs" />   
	</view>
</template>
<script>
    
	import incWall from '@/components/incs/incWall.vue'
    import uniLoadMore from '@/components/uniui/lib/uni-load-more/uni-load-more' // uniIcon,

	export default {
		components: {
			incWall,
            uniLoadMore
		},
		data() {
			return {
				scrollLeft: 0,
				isClickChange: false,
				tabIndex: -1,
                
                parts: [],
                list: [],
                
                page:1, //页数
                stype: '',
                keyword: '',
                loadMsg: '加载更多...',
                reload: false, //重新加载标志
                status: 'loading', //加载的状态
                loadMsgs: { //加载的内容
                	contentdown: '上拉加载更多',
                	contentrefresh: '加载中',
                	contentnomore: '没有更多'
                },
                //ermsg: '', // 加载中...
                dEnd: 1
                }
		},
		onLoad(cfg) {
            this.stype = cfg.stype ? cfg.stype : '';
            this.keyword = cfg.keyword ? cfg.keyword : '';
            this.loadData();
		},
        onPullDownRefresh() {
        	this.reload = true;
        	this.page = 1;
        	this.loadData();
        },
        onReachBottom() {
            if(this.status=='noMore'){ return }
        	this.status = 'more';
        	this.loadData();
        },
		methods: {
            async loadData() {
                let params = {page:this.page, stype:this.stype, keyword:this.keyword};
                this.status = 'loading'
                await this.$ureq.blogApi('info-wall', {data:params}).then(res => {
                    if(res.data.ercode){
                        this.ermsg = res.data.ermsg
                    }else{
                        if(this.page == 1){
                            uni.showToast({
                                title: '请求成功',
                                duration:500,
                                icon: 'success',
                                mask: true
                            })
                            this.list = res.data.list;
                            this.parts = res.data.parts; 
                            for(var i in this.parts){
                                if(i==this.stype){
                                    this.tabIndex = i;
                                }
                            }
                        }else{
                            this.list = this.list.concat(res.data.list);
                        }
                    }
                    this.reload && uni.stopPullDownRefresh();
                    this.status = 'more';
                    if(this.list.length >= res.data.recs) this.status = 'noMore';
                    ++this.page;
                    this.reload = false;
                }).catch((err)=>{
                    console.log('加载失败', err)
                })
            },
			goRow(row) {
				uni.navigateTo({
					url: '/pages/blog/view?did=' + row.did
				});
			},
			loadMore(e) {
                if(this.loadMsg=='没有更多'){ return }
                this.page++
                this.loadData()
			},
			async tapTab(e) { //点击tab-bar
                let no = this.tabIndex;
                this.tabIndex = e==-1 ? -1 : e.target.dataset.current
                if(no==this.tabIndex) return;
                this.stype = e==-1 ? '' : this.tabIndex
                this.list = [];
                this.page = 1; 
                this.loadData(); 
			}
		}
	}
</script>

<style>
    .ubar{
        text-align:center;
        background:#FFF;
        padding: 0 0.5rem;
    }
    #tab-bar .active {
    	color: #007AFF;
    }
    .swiper-tab-list{ display:inline-block !important; border-left:1px solid #CCC;}
    .swiper-tab-list:first-child{ border-left:0;}
	.uni-tab-bar-loading {
		text-align: center;
		font-size: 28rpx;
		color: #999;
	}
</style>
