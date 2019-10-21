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
            <view v-if="row.detail" class="cont">
                <uParse v-if="row.mdshow=='md'" :content="mdstr" />
                <text v-else>{{row.detail}}</text> 
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
                <view class="more" @tap="$tool.nav('faqs/home')">More</view>
                热门问答
            </view>
            <view class="uni-list">
                <inc-faqs1 v-for="(row,k2) in rels" @click="goRow(row,'faqs')" :key="k2" 
                    :row="row" :dir="1"></inc-faqs1>
            </view>
        </view>
        
        <fab-Nav/>
    </view>
</template>

<script>

    import marked from 'marked'
    import uParse from 'gaoyia-parse';
    import incFaqs1 from '@/components/incs/incFaqs1.vue'
    import fabNav from '@/components/tool/fabNav'
    import uniLoadMore from '@/components/uniui/lib/uni-load-more/uni-load-more' // uniIcon,
    
    export default {
        components: {
            uParse,
            incFaqs1,
            fabNav,
            uniLoadMore
        },
        data() {
            return {
                did: '',
                row: {},
                rels: {},
                mdstr: '',
                loadMsgs: { //加载的内容
                	contentrefresh: '加载中'
                },
                loading: '1',
                status: 'loading',
                ermsg: '', // 加载中...
                end: 1
            }
        },
        onNavigationBarButtonTap(e) {
            this.$tool.tab()
        },
        onLoad(cfg) {
            this.did = cfg.did
            this.loadData()
        },
        methods: {
            async loadData() {
                await this.$ureq.commApi('faqs.'+this.did, {}).then(res => {
                    if(res.data.ercode){
                        this.ermsg = res.data.ermsg
                    }else{
                        this.row = res.data.row
                        this.rels = res.data.rels
                        this.mdstr = marked(this.row.detail)
                    }
                    this.loading = ''
                }).catch((err)=>{
                    console.log('加载失败', err)
                })
            },
            goRow(row, mod) { 
                uni.navigateTo({
                    url: '/pages/'+mod+'/view?did='+row.did
                })
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
    .cont{ color:#666; margin:0.5rem 0rem; }
    
    .home-adv{ background:#FFF; padding-top:0.5rem; }

</style>
