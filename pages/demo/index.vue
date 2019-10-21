<template>
    <view>
        
        <view class="title">index@demo</view>
        
        <navigator url="./list" hover-class="other-navigator-hover">
            <button type="default">News-List</button>
        </navigator>
        
        <navigator url="./less" hover-class="other-navigator-hover">
            <button type="default">测试less</button>
        </navigator>
        <navigator url="./cstag" hover-class="other-navigator-hover">
            <button type="default">cstag</button>
        </navigator>
        
        <navigator url="./md" hover-class="other-navigator-hover">
            <button type="default">MarkDown</button>
        </navigator>
        <navigator url="./html" hover-class="other-navigator-hover">
            <button type="default">Html</button>
        </navigator>
        <navigator url="./qrcode" hover-class="other-navigator-hover">
            <button type="default">Qrcode</button>
        </navigator>
        <navigator url="../index/sinfo" hover-class="other-navigator-hover">
            <button type="default">sinfo</button>
        </navigator>
        <navigator url="../faqs/home" hover-class="other-navigator-hover">
            <button type="default">faqs.home</button>
        </navigator>
        <view @tap="$tool.nav('faqs/list?stype=qapub')">
            <button type="default">faqs.qapub</button>
        </view>
        
    </view>
</template>


<script>
//本示例引用组件uParse forked from ：mpvue-wxparse

	import marked from 'marked'
	import uParse from 'gaoyia-parse';

    var htmlString = ''

	export default {
		components: {
			uParse
		},
		data() {
			return {
				article: htmlString
			}
		},
        onLoad() {
            let ts = `ba${+'s'}a`.toLowerCase();
            console.log(ts, `${+'s'}`);  // banana
        },
		methods: {
			preview(src, e) {
				// do something
				console.log("src: " + src);
			},
			navigate(href, e) {
				// 如允许点击超链接跳转，则应该打开一个新页面，并传入href，由新页面内嵌webview组件负责显示该链接内容
				console.log("href: " + href);
				uni.showModal({
					content : "点击链接为：" + href,
					showCancel:false
				})
			}
		}

	}
</script>

<style>
.title{ font-size:48rpx; text-align:center; }
</style>
