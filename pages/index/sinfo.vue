<template>
	<view class="uni-padding-wrap">
		<com-head :title="title"></com-head>
		<view class="uni-common-mt">
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-pd">
						<view class="uni-label">platform</view>
					</view>
					<view class="uni-list-cell-db">
						<input class="uni-input" type="text" :disabled="true" placeholder="未获取" :value="systemInfo.platform"></input>
					</view>
				</view>
                <view class="uni-list-cell">
					<view class="uni-pd">
						<view class="uni-label">手机型号</view>
					</view>
					<view class="uni-list-cell-db">
						<input class="uni-input" type="text" :disabled="true" placeholder="未获取" :value="systemInfo.model"></input>
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-pd">
						<view class="uni-label">语言</view>
					</view>
					<view class="uni-list-cell-db">
						<input class="uni-input" type="text" :disabled="true" placeholder="未获取" :value="systemInfo.language"></input>
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-pd">
						<view class="uni-label">版本</view>
					</view>
					<view class="uni-list-cell-db">
						<input class="uni-input" type="text" :disabled="true" placeholder="未获取" :value="systemInfo.version"></input>
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-pd">
						<view class="uni-label">屏幕宽度</view>
					</view>
					<view class="uni-list-cell-db">
						<input class="uni-input" type="text" :disabled="true" placeholder="未获取" :value="systemInfo.windowWidth"></input>
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-pd">
						<view class="uni-label">屏幕高度</view>
					</view>
					<view class="uni-list-cell-db">
						<input class="uni-input" type="text" :disabled="true" placeholder="未获取" :value="systemInfo.windowHeight"></input>
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-pd">
						<view class="uni-label">DPI</view>
					</view>
					<view class="uni-list-cell-db">
						<input class="uni-input" type="text" :disabled="true" placeholder="未获取" :value="systemInfo.pixelRatio"></input>
                    </view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-pd">
						<view class="uni-label">平台.{{platform.type?platform.type:'...'}}</view>
					</view>
					<view class="uni-list-cell-db">
						<input class="uni-input" type="text" :disabled="true" placeholder="未获取" :value="platform.val"></input>
                    </view>
				</view>
			</view>
			
            <view class="uni-btn-v">
                <button type="primary" @tap="getSystemInfo">获取系统信息</button>
            </view>
			
            <view class="uni-list-cell">
                <view class="notes">
                    systemInfo: {{systemInfo}} 
                </view>
            </view>
		</view>
	</view>
</template>
<script>
         
    import comHead from '@/components/incs/comHead'
    import comFoot from '@/components/incs/comFoot'
    
	export default {
        components: {
            comHead, comFoot
        },
		data() {
			return {
				title: '系统调试信息',
				systemInfo: {},
                platform: {}
			}
		},
		onUnload:function(){
			//
		},
		methods: {
			getSystemInfo: function () {
				uni.getSystemInfo({
					success: (res) => {
						this.systemInfo = res
                        this.platform = this.$tool.platform()
					}
				})
			}
		}
	}
</script>

<style>
	.uni-pd {
		padding-left: 30rpx;
	}
    .notes {
        font-size:small;
        color:#999999;
    	padding:20rpx 30rpx;
    }
</style>
