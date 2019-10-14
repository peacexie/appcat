<template>
	<view class="loginCon">
 		<view class="loginLog">
			<image src="../../static/logo.png"></image>
		</view>
		<view class="loginInputBox">
			<view class="loginList">
				<input class="loginInput" type="number" v-model="tel" placeholder="请输入手机号" maxlength="11" placeholder-style="color:#9e9e9e;"/>
			</view>
			<view class="loginList">
				<input class="loginInput"  type="password" v-model="pwd" placeholder="请输入登录密码" placeholder-style="color:#9e9e9e;"/>
			</view>
		</view>
		<button type="primary" hover-class="bg-red1" class="loginBottom" @tap="doLogin">登录</button>
		<view class="loginTxt">
			<navigator url="/pages/user/getpw" hover-class="none">忘记密码？</navigator>
			<navigator url="/pages/user/reg" hover-class="none">新用户注册</navigator>
		</view>
		<view class="loginModeBox">
			<view class="loginTitel">快速登录方式</view> 
			<view class="loginMode">
				<view v-for="(item,index) in loginMode" :style="'background-color:'+item.color" :key="index" @tap="goPath(item)">
					<uni-icon :type="item.type" color="white" :size="item.size"></uni-icon> 
				</view>
			</view>
		</view> 
	</view>
</template>

<script>
	import {uniIcon} from '@dcloudio/uni-ui'
	import {mapMutations} from 'vuex'
	export default {
		components: {uniIcon},
		data() {
			return {
				loginMode:[
					{type:"weixin",color:"#46ab44", size:30,path:"/"},
					{type:"qq",color:"#0093dd",size:30,path:"/"},
					{type:"weibo",color:"#e22429",size:34,path:"/"},
				],	
				tel:'', //手机号
				pwd:'', //密码
			}
		},
		onLoad() {

		},
		methods: {
			...mapMutations(['login']),
			doLogin(){
				if(!this.tel || this.tel.length !== 11 || !/^1[345678]\d{9}$/.test(this.tel)){
					uni.showToast({icon: 'none',title: '手机号不正确'});
					return false;
				}
				if(!this.pwd){
					uni.showToast({icon: 'none',title: '请输入密码'});
					return false;
				}
				if (this.pwd.length < 6) {
				    uni.showToast({icon: 'none',title: '密码长度不能低于6位'});
				    return false;
				}
				let params = {tel:this.tel,pwd:this.pwd};
				this.$http.post(this.$api.userApi('login'), {data: params,header: {
					'Content-Type': 'application/x-www-form-urlencoded',
				}}).then(res => {
					if (res.statusCode == 200) {
						if(res.data.status){
							uni.showToast({title:'登录成功',icon:'none'});
							this.login(res.data.info);
							setTimeout(() => {
								//uni.navigateBack();
								uni.switchTab({
									url: '/pages/user/index'
								});
							},1000)
						}else{
							uni.showToast({title:res.data.info,icon:'none'});
						}
					}else{
						uni.showToast({title:res.statusCode,icon:'none'});
					}
				}).catch(error => {
					console.error('error:',error);
				});
			}
		}
	}
</script>

<style lang="less">
	page{
	 background-color: #f7f7f7;
	}
	.bg-red{background-color: #e83836;}
	.bg-red1{ background-color: #cd0402;}
	.uniRow{
	display: flex;	
	flex-direction:row;
	}
	.uniColumn{
	display: flex;
	flex-direction: column;
	}
	.loginCon{
		.loginLog{
			width:178rpx;
			height:178rpx;
			margin: 8% auto 5% auto;
			image{
				width:178rpx;
				height:178rpx;
			}
		}
		.loginInputBox{
			 background-color: #fff;
			 .loginList{
				 position: relative;
				 padding: 15rpx 20rpx;
				 &:after{
				 position: absolute;
				 z-index:9;
				 right: 0;
				 bottom: 0;
				 left: 0;
				 height: 1px;
				 content: '';
				 -webkit-transform: scaleY(.5);
				 -ms-transform: scaleY(.5);
				 		transform: scaleY(.5);
				 background-color: #e5e5e5;
				 }
				 &:last-child:after{
				 	 background-color: transparent;
				 }
				 .loginInput{
					 width:100%;
					 font-size: 28rpx;
				 }
			 }
		}
		.loginBottom{
			margin: 90rpx auto 60rpx auto;
			width: 78.5%;
			height: 70rpx;
			line-height: 70rpx;
			.bg-red();
			font-size: 32rpx;
		}
		.loginTxt{
			width: 90%;
			margin: 0 auto 26% auto;
			.uniRow();
			justify-content: space-between;
			font-size: 28rpx;
			color: #e83836;
		}
		.loginModeBox{
			position: relative;
			width: 90%;
			margin: 0 auto;
			padding-top:48rpx;
			&:after{
			position: absolute;
			z-index:9;
			right: 0;
			top: 0;
			left: 0;
			height: 1px;
			content: '';
			-webkit-transform: scaleY(.5);
			-ms-transform: scaleY(.5);
					transform: scaleY(.5);
			background-color: #e5e5e5;
			}
			.loginTitel{
				position: absolute;
				top:-23rpx;
				left: 50%;
				margin-left: -69rpx;
				 width: 178rpx;
				 height: 46rpx;
				 background-color: #f7f7f7;
				 font-size: 22rpx;
				 text-align:center;
				 line-height: 46rpx;
				 z-index: 10;
				}
			.loginMode{
				width: 90%;
				margin: 0 auto;
				position: relative;
				.uniRow();
				justify-content: center;
				align-items: center;
				view{
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
					.uniRow();
					align-items:center;
					justify-content:center;
					margin: 0 50rpx;
				}
			}	
		}
	}
</style>
