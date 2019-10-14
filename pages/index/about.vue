<template>
	<view class="uni-padding-wrap">
        
        <com-head :title="title"></com-head>
      
        <view class=" bg">
        <uParse :content="mdstr" />
        </view>

		<view class="uni-common-mt">
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-pd">
						<view class="uni-label">当前版本</view>
					</view>
					<view class="uni-list-cell-db">
						<input class="uni-input" type="text" :disabled="true" 
                            placeholder="未获取" :value="info.vnow"></input>
					</view>
				</view>
                <view class="uni-list-cell">
					<view class="uni-pd">
						<view class="uni-label">最新版本</view>
					</view>
					<view class="uni-list-cell-db">
						<input class="uni-input" type="text" :disabled="true" 
                            placeholder="未获取" :value="info.vsrv"></input>
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-pd">
						<view class="uni-label">更新地址</view>
					</view>
					<view class="uni-list-cell-db">
						<input class="uni-input" type="text" :disabled="true" 
                            placeholder="未获取" :value="info.url"></input>
					</view>
				</view>
				
			</view>
            
		</view>
	</view>
</template>
<script>

    import marked from 'marked' 
    import uParse from 'gaoyia-parse';
    import {cver} from '@/common/cfgs.js'
    import comHead from '@/components/incs/comHead'
    import comFoot from '@/components/incs/comFoot'
    
	export default {
        components: {
            uParse,
            comHead, comFoot
        },
		data() {
			return {
				title: '(about)系统介绍•更新',
                mdstr: '<div style="padding:2rem">加载中...</div>',
                info: {vnow:'', vsrv:'', url:''}
			}
		},
		onLoad() {
		    this.loadData();
		},
		methods: {
			async loadData() {
                this.info.vnow = 'v'+cver.val+' ('+cver.key+')'
			    await this.$ureq.commApi('root-abupd', {}).then(res => { 
                    let row = res.data
                    this.info.vsrv = 'v'+row.val+' ('+row.key+')'
                    this.info.url = row.url
                    let mdstr = row.about ? row.about : '<div style="padding:1rem">(数据待完善)...</div>'
                    this.mdstr = marked(mdstr)
                    if(cver.key==row.key){
                        this.info.vnow += ' (已是最新)'
                    }
			    }).catch((err)=>{
			        console.log('加载失败', err);
			    })
			}
		}
	}
</script>

<style>
    .bg{ }
</style>
