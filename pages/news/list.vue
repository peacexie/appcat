<template>
	<view class="">
        <view class="ubar">
            <scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
                <view class="swiper-tab-list" :class="tabIndex==-1 ? 'active' : ''"
                    @tap="tapTab(-1)">所有</view>
                <view v-for="(tab,index) in parts" :key="tab.id" 
                    class="swiper-tab-list" :class="tabIndex==index ? 'active' : ''"
                    :id="tab.kid" :data-current="index" @click="tapTab">{{tab.title}}</view>
            </scroll-view>
        </view>
        
        <view style="height:auto;" @scrolltolower="loadMore()">
            <view v-for="(row,index2) in list" :key="index2">
                <inc-news2 :row="row" @close="close()" @click="goRow(row)"></inc-news2>
            </view>
        </view>
        
        <uni-load-more :status="status" :content-text="loadMsgs" />   
	</view>
</template>
<script>
    
	import incNews2 from '@/components/incs/incNews2.vue'
    import uniLoadMore from '@/components/uniui/lib/uni-load-more/uni-load-more'

	export default {
		components: {
			incNews2,
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
                this.status = 'loading';  
                await this.$ureq.commApi('news-list', {data:params}).then(res => {
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
                            for(let i=0;i<this.parts.length;i++){
                                if(this.parts[i].kid==this.stype){
                                    this.tabIndex = i;
                                }
                            }
                            //this.parts = this.parts.concat(this.tabBars);
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
					url: '/pages/news/view?did=' + row.did
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
                this.stype = e==-1 ? '' : this.parts[this.tabIndex].kid
                this.list = [];
                this.page = 1; 
                this.loadData(); console.log(this.tabIndex,this.stype);
			}
			
		}
	}
</script>

<style>
    .ubar{
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
