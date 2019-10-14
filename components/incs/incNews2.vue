<template>
	<view class="">
		<view class="list-cell" hover-class="uni-list-cell-hover" @click="bindClick">
			<view class="media-list" v-if="row.title">
				<view :class="'media-image-left'"><!--right|left-->
					<text class="media-title" :class="'media-title2'">{{row.title}}</text>
					<view v-if="row.imgList || row.mpic" class="image-section image-section-left"><!--right|left-->
						<image class="image-list1" :class="'image-list2'"
						 v-if="row.mpic" :src="row.mpic"></image>
						<image class="image-list3" v-if="row.imgList" :src="source.url" v-for="(source, i) in row.imgList"
						 :key="i" />
					</view>
				</view>
				<view class="media-foot">
					<view class="media-info">
						<text class="info-text">{{row.catidName}}</text>
						<text class="info-text">{{row.atimeStr}}</text>
					</view>
					<view class="max-close-view" @click.stop="close">
                        <uni-icon type="eye" color="#999" style="padding-right:0.2rem;" /> 
                        <text class="info-text">{{row.click}}</text>
						<!--view class="close-view"><text class="close">×</text></view-->
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
    
    import {uniIcon} from '@dcloudio/uni-ui'
    
	export default {
        components: {
        	uniIcon
        },
		props: {
			row: {
				type: Object,
				default: function(e) {
					return {}
				}
			}
		},
		methods: {
			close(e) {
				this.$emit('close');
			},
			bindClick() {
				this.$emit('click');
			}
		}
	}
</script>

<style>
	view {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
	}

	.list-cell {
        background:#FFF;
		width: 750rpx;
		padding: 0 30rpx;
	}

	.uni-list-cell-hover {
		background-color: #eeeeee;
	}

	.media-list {
		flex: 1;
		flex-direction: column;
		border-bottom-width: 1rpx;
		border-bottom-style: solid;
		border-bottom-color: #c8c7cc;
		padding: 20rpx 0;
	}

	.media-image-right {
		flex-direction: row;
	}

	.media-image-left {
        /*width:160px;
        height:120px;*/
		flex-direction: row-reverse;
	}

	.media-title {
		flex: 1;
	}

	.media-title {
		lines: 3;
		text-overflow: ellipsis;
		font-size: 32rpx;
		color: #555555;
	}

	.media-title2 {
		flex: 1;
		margin-top: 6rpx;
		line-height: 40rpx;
	}

	.image-section {
		margin-top: 20rpx;
		flex-direction: row;
		justify-content: space-between;
	}

	.image-section-right {
		margin-top: 0rpx;
		margin-left: 10rpx;
		width: 225rpx;
		height: 146rpx;
	}

	.image-section-left {
		margin-top: 0rpx;
		margin-right: 10rpx;
		width: 225rpx;
		height: 146rpx;
	}

	.image-list1 {
		width: 690rpx;
		height: 481rpx;
	}

	.image-list2 {
		width: 225rpx;
		height: 146rpx;
	}

	.image-list3 {
		width: 225rpx;
		height: 146rpx;
	}

	.media-info {
		flex-direction: row;
	}

	.info-text {
		margin-right: 20rpx;
		color: #999999;
		font-size: 24rpx;
	}

	.media-foot {
		margin-top: 20rpx;
		flex-direction: row;
		justify-content: space-between;
	}

	.max-close-view {
		align-items: center;
		justify-content: flex-end;
		flex-direction: row;
		height: 40rpx;
		width: 80rpx;
	}

	.close-view {
		border-style: solid;
		border-width: 1px;
		border-color: #999999;
		border-radius: 10rpx;
		justify-content: center;
		height: 30rpx;
		width: 40rpx;
		line-height: 30rpx;
	}

	.close {
		text-align: center;
		color: #999999;
		font-size: 28rpx;
	}
</style>
