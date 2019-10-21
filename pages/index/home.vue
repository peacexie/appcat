<template>
    <view>
        
        <view class="logo">
            <view class="img"> 
                <image :src="$tool.vpic(['h5','logo/logo.png'])"></image>
            </view>
            <view class="col1">
                <view class="line1">
                    <text>App-M*p-Wap</text>
                </view>
                <view class="line2">
                    <text>Imcat•全端猫</text>
                </view>
            </view>
        </view>

        <!--swiper-start-->
        <view class="page-section swiper swbox">
            <view class="page-section-spacing">
                <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" 
                    :interval="interval" :duration="duration">
                    <swiper-item v-for="(row,index) in cargo" :key="index" @tap="$tool.go(row)">
                        <image class="swpPics" mode="aspectFit" 
                            :src="$tool.vpic([row.mpic,'demo_120x90.jpg'])"></image>  
                    <view class="uni-product-title">{{row.title}}</view>
                    </swiper-item>
                </swiper>
            </view>
        </view>
                
        <view class='home-grid'>
            <view v-if="modNavs.length>0">
                <uni-grid :options="modNavs" @click="goMod" type="oblong"/>
            </view>
        </view>

        <!--list-start-->
        <view class="title">
            <view class="more" @tap="$tool.nav('faqs/list')">More</view>
            热门问答
        </view>
        <uni-list>
            <uni-list-item v-for="(row,k2) in faqs" @click="goRow(row,'faqs')" :key="k2" :title="row.title" />
        </uni-list>
            
        <view class="home-adv" @tap="$tool.go()">
            <image style="width:100%; max-height:60px;" mode="scaleToFill" 
                :src="$tool.vpic(['favor','adv_250x060a.jpg'])"></image>
        </view>
        
        <view class="title">
            <view class="more" @tap="$tool.nav('news/home')">More</view>
            热门资讯
        </view>
        <view class="uni-list">
            <inc-news1 v-for="(row,k2) in news" @click="goRow(row,'news')" :key="k2" :row="row"></inc-news1>
        </view>
        
        <!--pro-lists-->
        <view class="title">
            <view class="more" @tap="$tool.nav('pro/home')">More</view>
            热门产品
        </view>
        <view class="uni-product-list">
            <inc-pro1 v-for="(row,index) in cargo" :key="index" :row="row"></inc-pro1>
        </view>
        
        <com-foot :name="'name'"></com-foot>
        <view style="height:20rpx;"></view>
    </view>
</template>

<!--
    @import url("./home.css");
-->
<style src="./home.scss" lang="scss"></style>
<script src="./home.js"></script>
