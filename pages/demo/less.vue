<template>
    <view>

        <view class='mgp' id='header'>
            header--- Less 浏览器端用法
        </view>
        
        <view class="mgp">
            <view id='menu'>
                <a href="#">Menu.A</a>
            </view>
            <view class='post'>
                <a href="#">Post.A</a>
            </view>
        </view>
        <view class='mgp' id='footer'>
            --- footer ...
        </view> 
         
    </view>
</template>

<script>
    
</script>

<style lang="less">
    
    .mgp{ margin:1rem; }

    @nice-blue: #333399;
    @light-blue: @nice-blue + #111;

    #header {
        color: @light-blue;
    }

    .bordered {
      border-top: dotted 1px black;
      border-left: solid 2px black;
    }

    #menu a {
      color: #111;
      .bordered;
    }

    .post a {
      color: red;
      .bordered;
    }

    .roundeds (@radius: 5px) {
        -webkit-border-radius: @radius;
        -moz-border-radius: @radius;
        -ms-border-radius: @radius;
        -o-border-radius: @radius;
        border-radius: @radius;
        padding: 1rem;
        border: 1px solid #CCC;
    }
    /*
    泪如雨下啊：有了这个函数，以后再也不用每个样式里面写那么多兼容了，
    每次只要.rounded-corners(8px) .rounded-corners(10px).  Awesome
    */
     
    #header {
        .roundeds;
    }
    #footer {
        .roundeds(10px);
    }

</style>

