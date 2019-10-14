<template>
    <view class="uni-product" @tap="nav(row)">
    	<view class="image-view">
    		<image class="uni-product-image" mode="aspectFit" 
            :src="$tool.vpic([row.mpic,'demo_120x90.jpg'])"></image>
    	</view>
    	<view class="uni-product-title">{{row.title}}</view>
    	<view class="uni-product-price">
    		<text v-if="row.price" class="uni-product-price-favour">{{row.price+1}}</text>
    		<text class="uni-product-price-original">￥{{row.price}}</text>
    		<text class="uni-product-tip">
                <text v-if="row.brandName">{{row.brandName}}</text>
                <text v-else>{{row.catidName}}</text>
            </text>
    	</view>
    </view>
</template>
                
<script>
    
	export default {
        components: {},
        props: ['row', 'dir'],
        methods: {
            nav(item) {
                let path = 'pro/view?did=' + item.did
                this.$tool.nav(path, this.dir)
            }
        }
	}
</script>

<style>
    .uni-product{ background:#FFF; }
    .image-view{ background:#F0F0F0; }
    .xmore{  }
</style>
