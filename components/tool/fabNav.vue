<template>
	<view>
		<uni-fab :pattern="pattern" :content="content" :horizontal="horizontal" :vertical="vertical" 
            :direction="direction" @trigger="trigger" ref="fab"></uni-fab>
	</view>
</template>

<script>
    
    import uniFab from '@/components/uniui/uniFab';
    
	export default {
        
        components: {
        	uniFab
        },
		data() {
			return {
				//
				horizontal: 'right',
				vertical: 'bottom',
				direction: 'vertical', // horizontal,vertical
				pattern: {
					//color: '#7A7E83',
					//backgroundColor: '#fff',
					//selectedColor: '#007AFF',
					//buttonColor: '#007AFF'
				},
				content: [{
						iconPath: '/static/icob/nav-back.png',
						selectedIconPath: '/static/icob/nav-back-cur.png',
                        path: "",
						text: '返回',
						active: false
					},
					{
						iconPath: '/static/icob/nav-user.png',
						selectedIconPath: '/static/icob/nav-user-cur.png',
                        path: "user/home",
						text: '我的',
						active: false
					},{
						iconPath: '/static/icob/nav-home.png',
						selectedIconPath: '/static/icob/nav-home-cur.png',
                        path: "index/home",
						text: '首页',
						active: false
					}
				]
			};
		},
		methods: {
			trigger(e) {
				//this.content[e.index].active = !e.item.active;
                let path = this.content[e.index].path;
                if(!path){
                    uni.navigateBack();
                }else{
                   uni.switchTab({
                       url: '/pages/' + path
                   }); 
                }
			},
		}
	};
</script>

<style>
	.btn {
		margin: 30rpx 0;
	}
</style>
