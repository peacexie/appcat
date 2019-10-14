<template>
    <view>
        <web-view v-if="url" :src="url" @message="getMessage"></web-view>
    </view>
</template>

<script>
	export default {
		data() {
			return {
				url: 'http://txjia.com'
			}
		},
		onLoad(options) {
			if (options && options.url) {
				let url = options.url;
                let title = options.title;
				this.url = url; console.log(url,title)
                title && uni.setNavigationBarTitle({title})
			}
		},
		methods: {
			getMessage(event) {
				uni.showModal({
					//content: JSON.stringify(event.detail),
					showCancel: true
				});
			}
		}
        /*  - demo - 调用外部page:百度地图显示google坐标
            let url = this.$api.apiTab().worldUrl + 'etools/mapos.html'
            let title = row.subject;
            let point = row.dt_1+','+row.dt_0;
            url += '?point='+point+'&title='+title+'&conv=1&';
            let param = "?url="+encodeURIComponent(url)+"&title="+encodeURIComponent(title)
            uni.navigateTo({
                url:"/pages/index/webView" + param
            })
        */
	}
</script>

<style>

</style>
