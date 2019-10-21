<template>
	<view>

        <view class="pad_20">
            <navigator class="loginStatus" url="./login" hover-class="none" v-if="hasLogin">
                <view class="myHeadBox">
                    <view class="myHeadImgBox">
                        <image :src="$tool.vpic(['h5','logo/logo.png'])"></image>
                    </view>
                    <view class="loginStatus" >点击登录/注册</view>
                </view>
            </navigator>
            <navigator class="loginStatus" url="../user/personalData" hover-class="none" v-else>
                <view class="myHeadBox">
                    <view class="myHeadImgBox">
                        <image :src="userInfo.thumb ? userInfo.thumb : $tool.vpic(['h5','logo/logo.png'])"></image>
                    </view>
                    <view class="loginStatus" >{{userInfo.mname}}</view>
                    <view class="loginStatus" >会员ID:{{userInfo.invitecode ? userInfo.invitecode : '(游客)'}}</view>
                </view>
            </navigator>
        </view>

        <view class="myTools"> 
            <view class="myToolBox" @tap="$tool.go('url=https://im3n.txjia.com:6443/&title=至简生活')">
                <image :src="$tool.vpic(['h5','icob/ex-jian.png'])"></image>
                <text>至简生活</text>
            </view>
            <view class="myToolBox" @tap="$tool.go('url=https://imblog.txjia.com:8443/home.php/ftree&title=家族树')">
                <image :src="$tool.vpic(['h5','icob/ex-shu.png'])"></image>
                <text>家族树</text>
            </view>
            <view class="myToolBox" @tap="$tool.go('url=https://yscode.txjia.com/&title=贴心口袋')">
                <image :src="$tool.vpic(['h5','icob/ex-kou.png'])"></image>
                <text>贴心口袋</text>
            </view>
        </view>

        <view class="title">老掉牙玩意</view>
        <uni-list>
            <uni-list-item :show-extra-icon="true" :extra-icon="icoBuild" title="(calcu24)算24小玩意" 
                @click="$tool.go('url=https://yscode.txjia.com/learn/ms-suan24.htm&title=算24小玩意')" />
            <!--uni-list-item :show-extra-icon="true" :extra-icon="icoBuild" title="(calendar)日梭万年历" 
                @click="$tool.go('url=https://txjia.com/peace/pc24/calendar.htm&title=日梭万年历')"  /-->
            <uni-list-item :show-extra-icon="true" :extra-icon="icoBuild" title="(cheese)谁动了我的奶酪" 
                @click="$tool.go('url=https://yscode.txjia.com/learn/echeese.htm&title=谁动了我的奶酪')"  />
            <uni-list-item :show-extra-icon="true" :extra-icon="icoBuild" title="(calendar)Peace月历" 
                @click="$tool.go('url=https://yscode.txjia.com/peace/cal_m2.htm&title=Peace月历')"  />
            <uni-list-item :show-extra-icon="true" :extra-icon="icoBuild" title="(english900)英语900句 " 
                @click="$tool.go('url=https://yscode.txjia.com/learn/e900full.htm&title=英语900句')" />
            <uni-list-item :show-extra-icon="true" :extra-icon="icoBuild" title="(english900)900句桌面版 " 
                @click="$tool.go('url=https://yscode.txjia.com/learn/e900desk.htm&title=900')" />
        </uni-list>

        <view class="title">扩展信息</view>
        <uni-list>
            <uni-list-item :show-extra-icon="true" :extra-icon="icoUpd" 
                @click="$tool.nav('index/about')" title="(about)系统更新•介绍" />
            <uni-list-item :show-extra-icon="true" :extra-icon="icoInfo" 
                @click="$tool.nav('index/sinfo')" title="(sinfo)系统调试信息" />
            <uni-list-item :show-extra-icon="true" :extra-icon="icoBuild" 
                @click="$tool.nav('index/read?md=sys-mpub&title=多端打包提示')" title="(diy)多端打包提示" />
            <!--uni-list-item :disabled="true" :show-extra-icon="true" :extra-icon="icoElse" 
                @click="nav('index/xxx1')" title="(xxx)神秘功能..." />
            <uni-list-item :disabled="true" :show-badge="true" :badge-text="12" note="描述信息" 
                @click="nav('index/xxx2')" title="禁用状态" /-->
            <uni-list-item :show-extra-icon="true" :extra-icon="icoFlag" 
                @click="$tool.nav('demo/index')" title="(lab)实验室" />
            <uni-list-item :show-extra-icon="true" :extra-icon="icoNav" 
                @click="gopc()" title="(publish)发布页•全端猫" />
        </uni-list>
        
        <view style="height:20rpx;"></view>
	</view>
</template>

<script>
    
    import uniList     from '@/components/uniui/lib/uni-list/uni-list' 
    import uniListItem from '@/components/uniui/lib/uni-list-item/uni-list-item'
    import uniGrid     from '@/components/uniui/lib/uni-grid/uni-grid'
    
    import {mapState,mapMutations} from 'vuex'  
    
    export default {
        components: {
            uniList, uniListItem, uniGrid
            //incNews1
        },
        data() {
            return {
                tmpd:{}, // info,refresh,paperplane,starhalf,,
                icoInfo: {size:'22', color:'#666666', type:'info'},
                icoBuild: {size:'22', color:'#666666', type:'paperplane'},
                icoUpd: {size:'22', color:'#666666', type:'refresh'},
                icoNav: {size:'22', color:'#666666', type:'navigate'},
                icoFlag: {size:'22', color:'#666666', type:'flag'},
                icoElse: {size:'22', color:'#666666', type:'starhalf'},
                
                platform: {}
            }
        },
        computed: mapState(['hasLogin','userInfo']),
        onLoad:function(){
            this.platform = this.$tool.platform()
        },
        methods: {
            nav(e) {
                uni.showToast({title:'敬请期待!', icon:'none', mask:false})
            },
            gopc(){ 
                let url = 'https://imcat.txjia.com/h5/pc.htm';
                if(this.platform.type=='h5'){
                    window.open(url)
                }else{
                    this.$tool.go('url='+url+'&title=(pc)Imcat•全端猫')
                }
            },
            jex(url){ 
                try{
                    this.$tool.go(url)
                }catch(ex){
                    uni.showToast({title:'请浏览器中手动打开:'+url, icon:'none', mask:false})
                    console.log(ex)
                }
            },
            switchChange(e) {
            	uni.showToast({
            		title: 'change:' + e.value,
            		icon: 'none'
            	})
            }
        }
    }
    
</script>

<style lang="less">
 
	@font-size: 26rpx;
    
	.pad_20{
		padding: 20px;
		background:#FFF;
	}
	.radius{
        border-radius: 50%;
	}
	.mart10{ margin-top: 10px;}
	.fontRed{ color: #e83836;}
	.fontGray{color: #9e9e9e;}
	.mySetTxt{
		font-size:@font-size+2rpx;
		line-height: 22px; 
		text-align:right;
		outline:none;
		background-color: transparent;
		float: right;
		border:none;
		position: inherit;
	}
	.myHeadBox{
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items:center;
		.myHeadImgBox{
			width: 120rpx;
			height: 120rpx;
			.radius();
			background: #ccc;
			image{
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
		}
		.loginStatus{
			 margin-top: 10rpx;
			 font-size:@font-size+4rpx;
		}
	}
	.myTools{
		display: flex;
		flex-wrap: wrap;
		flex-direction:row;
        background:#FFF;
		padding: 30rpx 0;
        border-top: 30rpx solid #DDD;
        border-bottom: 30rpx solid #DDD;
	}
	.myToolBox{
		display: flex;
		flex-wrap:wrap;
		flex-direction: column;
		justify-items: center;
		border-right:solid 1px #eee; 
		width: 33.33%;
		box-sizing: border-box;
		&{flex-grow: 1;}
		&:last-child{ border-right: none;}
		text{
			font-size:@font-size;
			text-align: center;
			margin-top:10px;
		}
		image{
			margin: 0 auto;
			width: 64rpx;
			height: 64rpx;
		}
	}
	.icoBox{
		display: flex;
		flex-wrap: wrap;
		flex-direction:row;
		padding:0 0;
		view{
			.myToolBox();
			 padding: 20px 0;
			 border-bottom:solid 1px #eee;
			 position: relative;
			 }
			.badgeBox{
			 	position: absolute; 
			 	right:85rpx; 
			 	top:5rpx;
			}
	}

	.example {
		padding: 0 30rpx 30upx
	}

	.example-body {
		padding: 0 40upx
	}
</style>




