<template>
	<view class="pswCon">
		<view class="pswList">
			<view class="pwsLeft">中国+86</view>
			<view class="pwsRight">
				<input class="" type="number" v-model="tel" placeholder="请输入手机号码" maxlength="11" placeholder-style="color:#9e9e9e;"/>
			</view>
		</view>
		<!-- <view class="pswList">
			<view class="yzmRight"><input class="" type="text" v-model="yzm" placeholder="请输入验证码"  placeholder-style="color:#9e9e9e;"/></view>
			<view><image style="width: 150rpx; height: 60rpx;" :src="yzmSrc" @tap="chageCode"></image></view>
		</view> -->
		<view class="pswList">
			<view class="yzmRight"><input class="" type="number" v-model="code" placeholder="请输入短信验证码"  placeholder-style="color:#9e9e9e;"/></view>
			<view><button class="yzmButtom" :class="{cur:isActive}"  @tap="getSmsCode">{{verifyMsg}}</button></view>
		</view>
		<view class="pswList">
			<view class="yzmRight">
				<input type="text" password="true" v-model="pwd" placeholder="请重新输入密码（6~20位英文或者数字）" placeholder-style="color:#9e9e9e;"/>
			</view>
		</view>
		<view class="pswList">
			<view class="yzmRight">
				<input type="text" password="true" v-model="repwd" placeholder="确认密码" placeholder-style="color:#9e9e9e;"/>
			</view>
		</view>
		<view class="pswList">
			<view class="yzmRight">
				<input type="text" v-model="tjcode" placeholder="请填写推荐码（选填）" placeholder-style="color:#9e9e9e;"/>
			</view>
		</view>
		<button type="primary" class="pwsButtom" :class="{active: pwsButtom}" hover-class="" @tap="register">注册</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tel:'', //手机号
				//yzm:'', //图形验证码
				code:'', //短信验证码
				pwd:'', //密码
				repwd:'', //确认密码
				tjcode:'', //推荐码
				second:0, //倒数时间(秒)
				isActive:1,
				//pwsButtom:0,
				//yzmSrc:'' ,//验证码图片
				timer:null,
			}
		},
		onLoad(){
			//this.getCode();
		},
		computed:{
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
				if(this.tel && this.code && this.pwd && this.repwd){
					return true;
				}else{
					return false;
				}
			}
		},
		methods: {
			/* getCode(){
				this.yzmSrc = 'http://user.fzg360.com/index.php?m=site&a=getCaptcha';
			},
			chageCode(){
				uni.redirectTo({
					url: '/pages/register/register'
				});
			}, */
			getSmsCode(){
				if(this.second > 0){
					return;
				}
				if(!this.tel || this.tel.length !== 11 || !/^1[345678]\d{9}$/.test(this.tel)){
					uni.showToast({icon: 'none',title: '手机号不正确'});
					return;
				}
				/* if(!this.yzm){
					uni.showToast({icon: 'none',title: '请输入图形验证码'});
					return;
				} */
				this.second = 60;
				this.isActive = 0;
				this.$http.post(this.$api.userApi('getCode'), {data: {tel:this.tel},header: {
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
			register() {
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
				if(this.tjcode){ //推荐码不为空
					let tjcode_reg = /^[0-9a-zA-Z]{1,10}$/g;
					if(!tjcode_reg.test(this.tjcode)){
						uni.showToast({icon: 'none',title: '请填写正确的推荐码'});
						return false;
					}
				}
				let params = {tel:this.tel,pwd:this.pwd,newPwd2:this.repwd,code:this.code,city:uni.getStorageSync('city'),authCode:uni.getStorageSync('code'),'tjcode':this.tjcode};
				this.$http.post(this.$api.userApi('register'), {data: params,header: {
					'Content-Type': 'application/x-www-form-urlencoded',
				}}).then(res => {
					if (res.statusCode == 200) {
						if(res.data.status){
							uni.removeStorageSync('code');
							uni.showToast({title:res.data.info,icon:'none'});
							setTimeout(() => {
								uni.navigateBack();
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
		.pswList{
			position: relative;
			background-color: #fff;
			padding: 14rpx 20rpx;
			box-sizing: border-box;
			font-size: 28rpx;
			.uniRow();
			/* justify-items: center; */
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
				border-right:solid 1px #e5e5e5;
				font-size: 28rpx;
				padding-right:20rpx;
				line-height: 52rpx;
			}
			.pwsRight{
				flex: 1;
				padding: 0 20rpx;
			}
			.yzmRight{
				flex: 1;
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
	}
</style>
