<script>
    
    import {mapMutations} from 'vuex';
    import {sroot} from './common/cfgs'
    
	export default {
		onLaunch: function() {
			//console.log('App Launch')
		},
		onShow: function() {
			//console.log('App Show')
		},
		onHide: function() {
			//console.log('App Hide')
		}
	}
</script>

<style>
    
	/*每个页面公共css */
	/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
    
	@import url('./static/3rd/uni.css');
    @import url('./static/3rd/wxParse.css');
    /*
    @import url('http://imcat.txjia.com/h5/3rd/uni.css');
    @import url('http://imcat.txjia.com/h5/3rd/wxParse.css');
    */

	/* 以下样式用于 hello uni-app 演示所需 */
	page {
		background-color: #F4F5F6; /*F4F5F6*/
		/*height: 100%;*/
        height: auto;
        min-height: 100%;
		font-size: 28rpx;
		line-height: 1.8;
        /*max-width:750px;
        margin:auto;*/
	}

    .more{ display:inline-block; float:right; padding-left:0.5rem; }
    .title {background:#F4F5F6; padding:20rpx; }
    .dtit { display:block;
        font-size:18px; text-align:center; line-height:120%;
		background:#FFF; padding:30rpx 0 !important; margin:0rpx;
    }

	.uni-header-logo {
		padding: 30rpx;
		text-align: center;
		margin-top: 10rpx;
	}

	.uni-header-logo image {
		width: 140rpx;
		height: 140rpx;
	}

	.uni-hello-text {
		color: #7A7E83;
	}

	.uni-hello-addfile {
		text-align: center;
		line-height: 300rpx;
		background: #FFF;
		padding: 50rpx;
		margin-top: 10px;
		font-size: 38rpx;
		color: #808080;
	}
</style>
