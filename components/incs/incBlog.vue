<template>
    <view class="uni-list-cell" hover-class="uni-list-cell-hover" @tap="nav(row)">
        <view class="uni-media-list">
            <view class="uni-media-list-logo">
                <image class="uni-product-image" mode="aspectFit" 
                    :src="$tool.vpic([row.mpic,'demo_120x90.jpg'])"></image>
            </view>
            <view class="uni-media-list-body">
                <view class="uni-media-list-text-top uni-ellipsis">
                    {{row.title}}
                </view>
                <view class="uni-media-list-text-bottom uni-ellipsis">
                    <view class="more"> {{row.atimeStr}}</view>
                    <view>
                        <uni-icon type="eye" color="#999" style="padding-right:0.2rem;" /> 
                        <text>{{row.click}}</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>
                
<script>
    
    import {uniIcon} from '@dcloudio/uni-ui' // uniIcon,
    
	export default {
        components: {
        	uniIcon
        },
        data() {
            return {
                end: 1
            }
        },
        props: ['row', 'dir'],
        methods: {
            nav(item) {
                let path = 'blog/view?did=' + item.did
                this.$tool.nav(path, this.dir)
            }
        }
	}
</script>

<style>
    .more{ display:inline-block; float:right; padding-left:0.5rem; }
    .list-cell {
        background:#FFF;
    }
</style>
