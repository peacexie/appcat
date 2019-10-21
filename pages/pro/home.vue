<template>
    <view>

        <view class="soConts">
            <view class="soBar">
                <view v-for="(item,index) in menuTop" :key="index" :class="item.class" @tap="doTab(index)">
                    <text>{{item.name}}</text>
                    <text>{{item.arrow}}</text>
                </view>
            </view>
            
            <view class="soItems">
                <view>
                    <view v-for="(item,no1) in subList" :key="no1" v-if="tabIndex==no1">
                        <view :class="[ctab[no1]['val']=='0' ? 'active' : '']" @tap.stop="setOption(no1,'0')">
                            不限
                        </view>
                        <view v-if="(!item.pid || item.pid=='0')" v-for="(item,no2) in item.subs" 
                            :key="item.kid" :class="[ctab[no1]['val']==item.kid ? 'active' : '']" 
                            @tap.stop="setOption(no1,item.kid)">
                            {{item.title}}
                        </view>
                    </view>
                </view>
            </view>
            <view class="soMask" @tap.stop="doTab(-1)" v-show="show"></view>
        </view>

        <view class="uni-product-list">
            <inc-pro1 v-for="(row,index) in listData" :key="index" :row="row"></inc-pro1>
        </view>
        
        <uni-load-more :status="status" :content-text="loadMsgs" />
    </view>
</template>

<script>
	
    import incPro1 from '@/components/incs/incPro1'
    import uniLoadMore from '@/components/uniui/lib/uni-load-more/uni-load-more'
	
	export default{
        components:{
        	incPro1,
            uniLoadMore
        },
		data(){
			return{
                listData: [],
                ctab: { 
                    '0': {key:'stype', val:'0'},
                    '1': {key:'brand', val:'0'},
                    '2': {key:'price', val:'0'}
                },
				tabIndex:-1,
				show:false,
				menuTop:[ // ▼▲arrow
					{name:"类别", arrow:"▲", class:""},
					{name:"品牌", arrow:"▲", class:""},
					{name:"价格", arrow:"▲", class:""}
				],
				subList:[{},{},{}],
                page:1, //页数
                keyword:'', //关键字
                reload: false, //重新加载标志
                status: 'loading', //加载的状态
                loadMsgs: { //加载的内容
                	contentdown: '上拉加载更多',
                	contentrefresh: '加载中',
                	contentnomore: '没有更多'
                }
			}
		},
        onLoad() {
        	this.getData();
        },
        onPullDownRefresh() {
        	this.reload = true;
        	this.page = 1;
        	this.getData();
        },
        onReachBottom() {
            if(this.status=='noMore'){ return }
        	this.status = 'more';
        	this.getData();
        },
		methods:{
            async getData(){ 
                let params = {page:this.page}
                if(this.keyword) params['keyword'] = this.keyword
                if(this.ctab['0']['val']>'0') params['stype'] = this.ctab['0']['val']
                if(this.ctab['1']['val']>'0') params['brand'] = this.ctab['1']['val']
                if(this.ctab['2']['val']>'0') params['prcie'] = this.ctab['2']['val']
                this.status = 'loading';  
                await this.$ureq.commApi('cargo-list', {data:params}).then(res => {
                    this.show = false;
                    if(this.page == 1){
                        uni.showToast({
                            title: '请求成功',
                            duration:500,
                            icon: 'success',
                            mask: true
                        })
                        this.listData = res.data.list
                        this.subList[0].subs = res.data['parts']
                        this.subList[1].subs = res.data['brands']
                        this.subList[2].subs = res.data['prices']
                    }else{
                        let list = res.data.list;
                        this.listData = this.reload ? list : this.listData.concat(list);
                    }
					this.reload && uni.stopPullDownRefresh();
                    this.status = 'more';
					if(this.listData.length >= res.data.recs) this.status = 'noMore';
					++this.page;
					this.reload = false;
            	}).catch(error => {
            		uni.showToast({title:'加载数据失败', duration:2000});
            	})
            },
            onPageScroll(e) {
            	let tmpY = 150;
            	e.scrollTop = e.scrollTop > tmpY ? 150 : e.scrollTop;
            	this.colorFlag = e.scrollTop * (1 / tmpY);
            	if(this.colorFlag < 0.5){
            		this.fzgIconColor="#FFF";
            		this.inputBackgroundColor="#FFF";
            		this.lxlocationIcon="#FFF";
            		this.talknewsIcon="#FFF";
            	}else{
            		this.fzgIconColor="#333";
            		this.inputBackgroundColor="#efefef";
            		this.lxlocationIcon="#333";
            		this.talknewsIcon="#333";						
            	}
            },
            doTab(index){ // 0,1,2,-1
            	this.menuTop.forEach((item,index)=>{
            		item["arrow"] = "▲";
            		item["class"] = "";
            	})
                if(index==-1 || this.tabIndex==index){
                    this.tabIndex = -1;
                    this.show = false;
                    return;
                }
                this.tabIndex = index;
                this.show = true;
            	this.menuTop[index]["class"] = "active";
            	this.menuTop[index]["arrow"] = "▼";
            },
            setOption(pid, val){
            	this.ctab[pid]['val'] = val
                this.doTab(-1)
                this.page = 1
                this.getData()
            },
			goBack(){
				uni.navigateBack();
			},
			goSearch(){
				uni.navigateTo({
					url: '/pages/world/search'
				});
			}, 
			goPath(){
				uni.navigateTo({
					url: "/pages/world/houseView"
				});
			}
		}
	}
</script>

<style lang="less" scoped>

    .soBar{
        height: 67rpx;
        border-top: 1px solid #e5e5e5;
        display: flex;
        justify-content: space-between;
        z-index: 9;
        background-color: #ffffff;
        padding-top: 0.2rem;
        &>view{
            width: 250rpx;
            text-align: center;
            border-right: 1px solid #e5e5e5;
            border-bottom: 1px solid #e5e5e5;
            &>text{
                font-size: 28rpx;
                color: #333333;
                margin-right: 10rpx;
            }
        }
        &>view:last-child{
            border-right: none;
        }
        .active{
            border-bottom: none;
            &>text{
                color: red;
            }
        }
    }
    .soItems{
        &>view{
            width: 750rpx;
            background-color: #ffffff;
            z-index: 9;
            &>view{
                padding-bottom: 20rpx;
                width: 710rpx;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                &>view{
                    width: 210rpx;
                    height: 60rpx;
                    line-height: 60rpx;
                    text-align: center;
                    color: #3f3f3f;
                    border-radius: 10rpx;
                    border: 1px solid #e5e5e5;
                    font-size: 28rpx;
                    margin-top: 20rpx;
                }
                &>view.active{
                    background-color: #E83836;
                    color: #ffffff;
                    border: none;
                }
            }
        }
    }
    .soMask{
    	width: 100%;
    	height: 100%;
    	background-color: #000000;
    	opacity: .3;
    	z-index: 7;
    }
</style>
