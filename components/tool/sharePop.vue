<template>
	<view class="sharePopup">
		<uni-popup :show="shareShow" position="bottom" @hidePopup="togglePopup()">
            
            <view class="sharePopupTitle">
                <!-- #ifdef APP-PLUS -->
                调用系统分享
                <!-- #endif -->
                <!-- #ifndef APP-PLUS -->
                请复制分享
                <!-- #endif -->
            </view>
           
           <view class="sinfo">
               <textarea :value="shareParams.title+'\n'+baseUrl+shareParams.link" auto-height />
           </view>
            
            <!-- #ifdef APP-PLUS -->
            <view class="sharePopupContent">
				<view @tap="sysShare()">
					<view style="background-color:#009933">
						<text size="30" style="color:#FFFFFF">分享</text>
					</view>
					<text>系统分享</text>
				</view>
                <view @tap="copyShare()">
                	<view style="background-color:#333366">
                		<text size="30" style="color:#FFFFFF">链接</text>
                	</view>
                	<text>复制链接</text>
                </view>
			</view>
            <!-- #endif -->
            
            <!--
			<view class="sharePopupContent">
				<view v-for="(item,index) in shareList" :key="index" @tap="shareOp(item.type)">
					<view :style="'background-color:#'+item.color">
						<text :type="item.type" size="30" color="#FFF">{{item.type}}</text>
					</view>
					<text>{{item.text}}</text>
				</view>
			</view>
            -->
            
			<view class="sharePopupBtn" @click="togglePopup()">取消分享</view>
            
		</uni-popup>
	</view>
</template>

<script>
    //import {uniIcon} from '@/components/uniui/lib/uni-icon/uni-icon'
	import uniPopup from '@/components/uniui/lib/uni-popup/uni-popup'

	export default{
		components:{
			uniPopup
		},
		props:['shareShow','shareParams','isCallback'],
		data(){
			return{
                baseUrl: 'https://imcat.txjia.com/h5/#/pages/',
				shareList:[
					{
						type:"朋友圈",
						text:"微信朋友圈",
						color:"86ce98"
					},
					{
						type:"微好友",
						text:"微信好友",
						color:"7ab6d2"
					},
					{
						type:"微博",
						text:"微博",
						color:"e1706c"
					},
					{
						type:"Q空间",
						text:"QQ空间",
						color:"e9c86b"
					},
					{
						type:"Q好友",
						text:"QQ好友",
						color:"5d8cc4"
					},
					{
						type:"链接",
						text:"复制链接",
						color:"7ab6d2"
					}
				]
			}
		},
		methods:{
			togglePopup() {
				this.$emit('hidePopup')
			},
			shareOp(type){
				switch(type){
					case 'friends':
						this.weixinShare('WXSenceTimeline');
					break;
					case 'wechat':
						this.weixinShare('WXSceneSession');
					break;
					case 'blog':
						this.weiboShare();
					break;
					case 'qzone':
					case 'qq':
						this.qqShare();
					break;
					case 'lianjie':
						this.copyShare();
					break;
				}
			},
			weixinShare(scene){ //微信分享
			    uni.share({
					provider: "weixin",
					scene: scene,
					type: 0,
					href: this.shareParams.link,
					title: this.shareParams.title,
					summary: this.shareParams.desc,
					imageUrl: this.shareParams.img,
					success: (res) => {
						//console.log("success:" + JSON.stringify(res));
						if(this.isCallback){
							let params = {type:'weixin'};
							uni.$emit('shareYes',params);
						}else{
							uni.showToast({title:'分享成功',icon:'none'});
						}
					},
					fail: (err) => {
						console.log("fail:" + JSON.stringify(err));
						//uni.showToast({title:'分享失败',icon:'none'});
					}
				});
				this.togglePopup();
			},
			qqShare(){ //qq分享
			    uni.share({
					provider: "qq",
					type: 2,
					href: this.shareParams.link,
					title: this.shareParams.title,
					summary: this.shareParams.desc,
					imageUrl: this.shareParams.img,
					success: (res) => {
						//console.log("success:" + JSON.stringify(res));
						if(this.isCallback){
							let params = {type:'qq'};
							uni.$emit('shareYes',params);
						}else{
							uni.showToast({title:'分享成功',icon:'none'});
						}
					},
					fail: (err) => {
						console.log("fail:" + JSON.stringify(err));
						//uni.showToast({title:'分享失败',icon:'none'});
					}
				});
				this.togglePopup();
			},
			weiboShare(){ //新浪微博分享,新浪微博仅支持分享本地音视频
			    uni.share({
					provider: "sinaweibo",
					type: 0,
					href: this.shareParams.link,
					title: this.shareParams.title,
					summary: this.shareParams.desc,
					imageUrl: this.$tool.vpic(['h5','logo/logo.png']), //{"errMsg":"share:fail:分享图片仅支持本地路径"}
					success: (res) => {
						//console.log("success:" + JSON.stringify(res));
						if(this.isCallback){
							let params = {type:'weibo'};
							uni.$emit('shareYes',params);
						}else{
							uni.showToast({title:'分享成功',icon:'none'});
						}
					},
					fail: (err) => {
						console.log("fail:" + JSON.stringify(err));
						//uni.showToast({title:'分享失败',icon:'none'});
					}
				});
				this.togglePopup();
			},
			sysShare(){
                let url = this.baseUrl + this.shareParams.link,
                    data = {content:this.shareParams.title, href:url}
                plus.share.sendWithSystem(data, function(){
                		//uni.showToast({title:'分享成功', icon:'none'});
                	}, function(e){
                		uni.showToast({title:'分享失败：'+JSON.stringify(e), icon:'none'});
                });
            },
            copyShare(){
                let url = this.baseUrl + this.shareParams.link
				uni.setClipboardData({
					data:this.shareParams.title + url,
					success:function(){
						uni.showToast({title:'复制成功',icon:'none'});
					},
					fail:function(err){
						console.log(err);
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
    .sinfo{ margin:30rpx 0 10rpx 0; }
    .sinfo>textarea{ width:640rpx; text-align:left; background:#F4F4F4; padding:10rpx; margin:auto; border:1px solid #CCCCCC; } 
	.sharePopup{
		.sharePopupTitle{
			font-size: 30rpx;
			line-height: 80rpx;
			border-bottom: 1px solid #e5e5e5;
		}
		.sharePopupContent{
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			width: 700rpx;
			margin: 0 auto;
			line-height: normal;
			padding: 40rpx 0 20rpx 0;
			&>view{
				width: 200rpx;
				margin-bottom: 20rpx;
				&>view{
					width: 100rpx;
					height: 100rpx;
					line-height: 115rpx;
					border-radius: 50%;
					margin: 0 auto;
				}
				&>text{
					font-size: 26rpx;
					color: #3f3f3f;
					display: block;
					margin-top: 20rpx;
				}
			}
		}
		.sharePopupBtn{
			font-size: 30rpx;
			line-height: 80rpx;
			border-top: 1px solid #e5e5e5;
			background-color: #f9f9f9;
		}
	}
</style>
