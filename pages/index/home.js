
import uniList     from '@/components/uniui/lib/uni-list/uni-list' 
import uniListItem from '@/components/uniui/lib/uni-list-item/uni-list-item'
import uniGrid     from '@/components/uniui/lib/uni-grid/uni-grid'

import sroot from '@/common/cfgs.js'
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
            indicatorDots: true,
            autoplay: true,
            interval: 2000,
            duration: 500,
            modNavs: [],
            faqs:[], news:[], cargo:[], 
            text: '',
            end: '1'
        };
    },
    onNavigationBarButtonTap(e) {
        this.$tool.nav('index/sinfo')
    },
    onLoad() {
        setTimeout(()=> {
            this.renderImage = true;
        }, 300);
        // #ifdef APP-PLUS
        plus.nativeUI.showWaiting('加载中……');
        // #endif
        this.getData();
        this.showGrid();
    },
    onPullDownRefresh() {
        this.getData();
    },
    onReady() {
        // #ifdef APP-PLUS
        plus.nativeUI.closeWaiting();
        // #endif
    },
    // #ifdef MP
    onShareAppMessage(res) {
    	if (res.from === 'menu') {// 来自右上角分享按钮
    		uni.showToast({title:'分享成功', icon:'none'});
    	}
    	return {
    		title: 'Imcat•全端猫', // imageUrl,desc
    		path: '/pages/index/home'
    	}
    },
    // #endif
    methods: {
        vpic(fp) { 
            return this.$tool.vpic(['h5','icob/mod-'+fp+'.png'])
        },
        showGrid(){
            this.modNavs = [
                {nid:12, text:'博文',   image:this.vpic('1info'), path:'news/home'},
                {nid:14, text:'产品',   image:this.vpic('2pro'),  path:'pro/home', cls:'uni-text-gray' },
                {nid:16, text:'问答',   image:this.vpic('3faqs'), path:'faqs/list'},
                {nid:22, text:'博客',   image:this.vpic('boke'),  path:'index/read?md=pro-blog&title=博客'},
                {nid:24, text:'房产',   image:this.vpic('lou'),   path:'index/read?md=pro-house&title=房产'},
                {nid:26, text:'企业站', image:this.vpic('corp'),  path:'index/read?md=pro-corp&title=企业站'}
            ]; //console.log(this.modNavs);
        },
        goMod(e) { //console.log('b', e)
            let path = this.modNavs[e.index].path
            if(path.indexOf('url=')==0){
                this.$tool.go(path)
            }else{
                this.$tool.nav(path)
            }
            /*if(this.modNavs[e.index].nid>20){
                uni.showToast({title:'敬请期待!', icon:'none', mask:false})
                return
            }*/
        },
        goRow(row, mod) { 
            this.$tool.nav(mod+'/view?did='+row.did)
        },

        async getData() {
            await this.$ureq.commApi('root',{}).then(res => { 
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
