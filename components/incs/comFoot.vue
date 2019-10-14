<template name="page-foot">
	<view class="page-share-title">
		<text class="submit" @tap="submit">贴心猫(imcat)</text>
        <text>©2016和平鸽</text>
	</view>
</template>

<script>
	export default {
		name: "page-foot",
		props: {
			name: {
				type: String,
				default: ""
			}
		},
		methods: {
			submit() {
                this.$tool.go('url=http://imcat.txjia.com/index.php?home-tips&title=贴心猫')
                //this.$tool.nav('index/read?md=pro-imcat&title=贴心猫')
				/*uni.showModal({
					content:"hello uni-app开源地址为https://github.com/dcloudio/uni-app/tree/master/examples，请在这个开源项目上贡献你的代码",
					showCancel:false
				})*/
			}
		}
	}
</script>
<style>
    
	.page-share-title {
		text-align: center;
		font-size: 24rpx;
		color: #BEBEBE;
        background:#DDD;
		padding: 16rpx 0;
        margin-top:1rem;
	}

	.submit {
		border-bottom: 1rpx solid #BEBEBE;
	}
</style>
