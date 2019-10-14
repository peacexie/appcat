<template>
	<view class="uni-padding-wrap">
		<com-head :title="title"></com-head>
        
		<view class="bg">
			<uParse :content="mdstr" />
		</view>
        
        <view class="rfoot">
            <com-foot :name="'name'"></com-foot>
        </view>
	</view>
</template>
<script>
    
    import marked from 'marked' 
    import uParse from 'gaoyia-parse';
    import comHead from '@/components/incs/comHead'
    import comFoot from '@/components/incs/comFoot'
    
	export default {
        components: {
            uParse, // marked,
            comHead, comFoot
        },
		data() {
			return {
                md: '',
                mdstr: '<div style="padding:2rem">加载中...</div>',
                title: '',
                dend: 1
			}
		},
		onLoad(ops) {
            //let title = '加载中...';
            this.md = ops.md
            if(ops.title){ 
                this.title = '['+ops.md+']'+ops.title
                uni.setNavigationBarTitle({title:ops.title})
            }
		    this.loadData()
		},
		methods: {
			async loadData() {
                let params = {mds:this.md}
			    await this.$ureq.commApi('root-mds', {data:params}).then(res => { 
                    let mdstr = res.data[this.md] ? res.data[this.md] : '(数据待完善)...'
                    this.mdstr = marked(mdstr)
			    }).catch((err)=>{
			        this.mdstr = marked('<div style="padding:2rem">(加载失败)...</div>')
			    })
			}
		}
	}
</script>

<style>
    .bg{ }
    .rfoot{ margin-left:-30rpx; margin-right:-30rpx; }
</style>
