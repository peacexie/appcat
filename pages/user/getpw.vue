<template>
	<view class="pswCon">
		<view class="fixBox">已向手机号码{{hidePhone}}发送验证码</view>
		<view class="pswBox">
			<view class="pswList pswBox">
				<view class="">
					<input class="pwsInput" type="number" v-model="code" placeholder="请输入短信验证码" placeholder-style="color:#9e9e9e;"/>
				</view>
				<view><button class="yzmButtom" :class="{cur:isActive}" @tap="getSmsCode">{{verifyMsg}}</button></view><!--有两个状态，颜色不同-->
			</view>
			<view class="pswList">
				<view class="pwsRight">
					<input type="password" v-model="pwd" placeholder="请输入新密码（6~20位英文或数字）" placeholder-style="color:#9e9e9e;"/>
				</view>
			</view>
			<view class="pswList">
				<view class="pwsRight">
					<input type="password" v-model="repwd" placeholder="确认密码" placeholder-style="color:#9e9e9e;"/>
				</view>
			</view>
			<button type="primary" class="pwsButtom" :class="{active: pwsButtom}" hover-class="" @tap="doSubmit">提交</button><!--输入电话时增加样式active-->
		</view>
	</view>
</template>

<script>
	//import util from '../../common/util'
	import {mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				isActive:1,
				tel:'', //手机号
				second:0, //倒数秒
				code:'', //验证码
				pwd:'', //密码
				repwd:'', //确认密码
				timer:null
			}
		},
		onLoad(){
			/*if(!this.hasLogin || !this.userInfo){
				uni.redirectTo({
					url:'./login'
				})
				return;
			}
			if(!this.userInfo.mtel){
				uni.redirectTo({
					url:'./bindTel'
				})
				return;
			}
			this.tel = this.userInfo.mtel;
			this.second = 60;
			this.isActive = 0;
			this.timer = setInterval(() => {
				this.second--;
				if (this.second < 1) {
					this.isActive = 1;
					clearInterval(this.timer);
				}
			},1000);*/
		},
		computed: {
			...mapState(['hasLogin','userInfo']),
			hidePhone() {
				//let tel = util.hideTel(this.userInfo.mtel);
				return 'tel123';
			},
			verifyMsg(){
				if(this.second == 0){
					return '获取验证码';
				}else{
					if(this.second < 10){
						return '重新发送(0'+this.second+'s)';
					}else{
						return '重新发送('+this.second+'s)';
					}
				}
			},
			pwsButtom(){
				if(this.code && this.pwd && this.repwd){
					return true;
				}else{
					return false;
				}
			}
		},
		methods: {
			getSmsCode(){
				if(this.second > 0){
					return;
				}
				if(!this.tel || this.tel.length !== 11 || !/^1[345678]\d{9}$/.test(this.tel)){
					uni.showToast({icon: 'none',title: '手机号不正确'});
					return;
				}
				this.second = 60;
				this.isActive = 0;
				this.$http.post(this.$api.userApi('pwGetCode'), {data: {tel:this.tel},header: {
					'Content-Type': 'application/x-www-form-urlencoded',
				}}).then(res => {
					if (res.statusCode == 200) {
						if(res.data.status){
							uni.setStorageSync('code',res.data.info);
							this.timer = setInterval(() => {
								this.second--;
								if (this.second < 1) {
									this.isActive = 1;
									clearInterval(this.timer);
								}
							},1000);
						}else{
							uni.showToast({title:res.data.info,icon:'none'});
							this.second = 0;
							this.isActive = 1;
						}
					}else{
						uni.showToast({title:res.statusCode,icon:'none'});
					}
				}).catch(error => {
					console.error('error:',error);
				});
			},
			doSubmit() {
				if(!this.pwsButtom) return;
				if(!this.tel || this.tel.length !== 11 || !/^1[345678]\d{9}$/.test(this.tel)){
					uni.showToast({icon: 'none',title: '手机号不正确'});
					return false;
				}
				if(!this.code){
					uni.showToast({icon: 'none',title: '请输入验证码'});
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
				if (this.pwd !== this.repwd) {
					uni.showToast({icon: 'none',title: '两次输入的密码不一致'});
					return false;
				}
				let params = {tel:this.tel,pwd:this.pwd,repwd:this.repwd,code:this.code,authCode:uni.getStorageSync('code')};
				this.$http.post(this.$api.userApi('changePwd'), {data: params,header: {
					'Content-Type': 'application/x-www-form-urlencoded',
				}}).then(res => {
					if (res.statusCode == 200) {
						if(res.data.status){
							uni.removeStorageSync('code');
							uni.showToast({title:res.data.info,icon:'none'});
							setTimeout(() => {
								uni.redirectTo({
									url:'./personalData'
								})
							},1500)
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
.uniRow{
	display: flex;	
	flex-direction:row;
	}
.bg-gray{background-color: #666;}
.bg-red{background-color: #e83836;}
.pswCon{
	position: relative;
	padding-top:64rpx;
	.fixBox{
		width: 100%;
		position: absolute;
		height:64rpx;
		line-height: 64rpx;
		background-color: rgba(232, 56, 54,0.3);
		color: #e83836;
		text-align: center;
		font-size: 24rpx;
		top: 0;
		left: 0;
		z-index: 999;
	}
	.pswBox{
		 .pswList{
			position: relative;
			background-color: #fff;
			padding: 14rpx 20rpx;
			box-sizing: border-box;
			font-size: 28rpx;
			.uniRow();
			align-items: center;
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
			.pwsLeft{
				font-size: 28rpx;
				line-height: 52rpx;
			}
			.pwsRight{
				flex: 1;
			}
		 }
		 .pwsButtom{
			width:42.6%;
			height: 70rpx;
			line-height: 70rpx;
			font-size: 32rpx;
			margin: 100rpx auto;
			background-color: #666666;
			.bg-gray()
		}
		& .active{
			.bg-red();
		}
		.yzmButtom{
			padding: 0 10rpx;
			color: #fff;
			height: 40rpx;
			line-height:40rpx;
			font-size: 24rpx;
			background-color: #999;
			&.cur{
				.bg-red();
			}
		}
		& .pswBox{
			justify-content: space-between;
			align-items: center;
		}
	}
}
</style>
