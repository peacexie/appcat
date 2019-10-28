<template>
    <view class="">
        <view v-if="row.title" class="doc">
            <view class="dtit">
                {{row.title}}
            </view>
            <view class="bar">
                <text v-if="row.hinfoName">{{row.hinfoName}}</text>
                <text v-else-if="row.source">{{row.source}}</text>
                <text v-else-if="row.catidName">{{row.catidName}}</text>
                <text class="time">{{row.auser}}@{{row.atimeStr}}</text> 
            </view>
            <view class="cont">
               <uParse :content="row.detail" />
            </view><!-- @preview="preview" @navigate="navigate"-->
        </view>
        <view v-else class="err">
            <text>{{ermsg}}</text>
        </view>
        <uni-load-more v-if="loading" :status="status" :content-text="loadMsgs"/>
        
        <!--view class="rem">
            rem
        </view-->
        
        <view class="uni-padding-wrap home-adv" @tap="$tool.go()">
            <image style="width:100%; max-height:60px;" mode="scaleToFill" 
                :src="$tool.vpic(['favor','adv_250x060a.jpg'])"></image>
        </view>
        
        <view class="rel">
            <view class="title">
                <view class="more" @tap="$tool.nav('news/home')">More</view>
                热门资讯
            </view>
            <view class="uni-list">
                <inc-news1 v-for="(row,k2) in rels" @click="goRow(row,'news')" :key="k2" 
                    :row="row" :dir="1"></inc-news1>
            </view>
        </view>
        
        <fab-Nav/>
        <share-pop :shareShow="shareShow" :shareParams="shareParams" isCallback="1" @hidePopup="closePop"></share-pop>
    </view>
</template>

<script>
    
    //import marked from 'marked'
    import uParse from 'gaoyia-parse';
    import incNews1 from '@/components/incs/incNews1.vue'
    import fabNav from '@/components/tool/fabNav'
    import sharePop from '@/components/tool/sharePop'
    import uniLoadMore from '@/components/uniui/lib/uni-load-more/uni-load-more'
    
    export default {
        components: {
            uParse,
            incNews1,
            fabNav,
            sharePop,
            uniLoadMore
        },
        data() {
            return {
                did: '',
                row: {},
                rels: {},
                loadMsgs: { //加载的内容
                	contentrefresh: '加载中'
                },
                shareShow: false,
                shareStatus: false,
                shareParams: {},//分享对象
                loading: '1',
                status: 'loading',
                ermsg: '', // 加载中...
                end: 1
            }
        },
        onNavigationBarButtonTap(e) {
            this.shareOpen(); 
        },
        onLoad(cfg) {
            this.did = cfg.did;
            this.loadData();
        },
        // #ifdef MP
        onShareAppMessage(res) {
        	if (res.from === 'menu') {// 来自右上角分享按钮
        		uni.showToast({title:'分享成功', icon:'none'});
        	}
        	return {
        		title: this.shareParams.title, // imageUrl,desc
        		path: '/pages/'+this.shareParams.link
        	}
        },
        // #endif
        methods: {
            
            closePop() {
            	this.shareShow = false;
            },
            closeShare(){
            	this.shareStatus = false;
            },
            shareOpen() {
                this.shareShow = true;
            },
            
            async loadData() {
                await this.$ureq.commApi('news.'+this.did, {}).then(res => {
                    if(res.data.ercode){
                        this.ermsg = res.data.ermsg
                    }else{
                        this.row = res.data.row;
                        this.rels = res.data.rels; 
                        this.shareParams = {
                        	title: res.data.row.title,
                        	//thumb: res.data.row.mpic,
                        	link: 'news/view?did='+res.data.row.did
                        };
                    }
                    this.loading = '';
                }).catch((err)=>{console.log('b');
                    console.log('加载失败', err)
                })
            },
            goRow(row, mod) { 
                uni.navigateTo({
                    url: '/pages/'+mod+'/view?did='+row.did
                });
            },
            fend() {
                
            }
        }
        
    }
    
</script>

<style>
    
    .doc>view{ padding:0.2rem 0.5rem; }
    .err{ font-size:16px; color:#FF0000; text-align:center; }
    .bar{ color:#333; background:#E0E0E0; padding:0.5rem; text-align:center; }
    .bar>text{ display:inline-block; padding:0px 0.2rem;}
    .cont{ margin:0.5rem 0rem; }
    
    .home-adv{ background:#FFF; padding-top:0.5rem; }
    .more{ display:inline-block; float:right; padding-left:0.5rem; }
    .rel .title {
        padding: 20rpx;
    }
    
</style>
