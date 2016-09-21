/**
 * Created by Administrator on 2016/9/21 0021.
 */
$.ajax({
    url: '/getsignature', // 此处url请求地址需要替换成你自己实际项目中服务器数字签名服务地址
    type: 'post',
    data: {
        url: location.href.split('#')[0] // 将当前URL地址上传至服务器用于产生数字签名
    }
}).done(function(r) {
    console.log(r)
    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: r.appId, // 必填，公众号的唯一标识
        timestamp: r.timestamp, // 必填，生成签名的时间戳
        nonceStr: r.nonceStr, // 必填，生成签名的随机串
        signature: r.signature,// 必填，签名，见附录1
        jsApiList: [
            "checkJsApi",
            "onMenuShareTimeline",
            "onMenuShareAppMessage",
            "onMenuShareQQ",
            "onMenuShareWeibo",
            "onMenuShareQZone",
            "startRecord",
            "stopRecord",
            "onVoiceRecordEnd",
            "playVoice",
            "pauseVoice",
            "stopVoice",
            "onVoicePlayEnd",
            "uploadVoice",
            "downloadVoice",
            "chooseImage",
            "previewImage",
            "uploadImage",
            "downloadImage",
            "translateVoice",
            "getNetworkType",
            "openLocation",
            "getLocation",
            "hideOptionMenu",
            "showOptionMenu",
            "hideMenuItems",
            "showMenuItems",
            "hideAllNonBaseMenuItem",
            "showAllNonBaseMenuItem",
            "closeWindow",
            "scanQRCode",
            "chooseWXPay",
            "openProductSpecificView",
            "addCard",
            "chooseCard",
            "openCard"
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    wx.ready(function(){
        $('#btn_01').click(function(){
            wx.checkJsApi({
                jsApiList:[
                    "onMenuShareTimeline",
                    "onMenuShareAppMessage",
                    "onMenuShareQQ",
                    "onMenuShareWeibo",
                    "onMenuShareQZone",
                    "startRecord",
                    "stopRecord",
                    "onVoiceRecordEnd",
                    "playVoice",
                    "pauseVoice",
                    "stopVoice",
                    "onVoicePlayEnd",
                    "uploadVoice",
                    "downloadVoice",
                    "chooseImage",
                    "previewImage",
                    "uploadImage",
                    "downloadImage",
                    "translateVoice",
                    "getNetworkType",
                    "openLocation",
                    "getLocation",
                    "hideOptionMenu",
                    "showOptionMenu",
                    "hideMenuItems",
                    "showMenuItems",
                    "hideAllNonBaseMenuItem",
                    "showAllNonBaseMenuItem",
                    "closeWindow",
                    "scanQRCode",
                    "chooseWXPay",
                    "openProductSpecificView",
                    "addCard",
                    "chooseCard",
                    "openCard"
                ],
                success:function(res){
                    var str = '';
                    $.each(res.checkResult,function(k,v){
                        str += k+':'+ v +'\<br\>'
                    })
                    $('#p_01').html(str);

                }
            });
        });

        wx.onMenuShareTimeline({
            title: 'nodeJS真6,分享到朋友圈', // 分享标题
            link: '', // 分享链接
            imgUrl: './images/head10.jpg', // 分享图标
            success: function () {
                console.log("分享成功")
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        wx.onMenuShareAppMessage({
            title: 'nodeJS真6,分享给朋友', // 分享标题
            desc: '没什么好说的,分享', // 分享描述
            link: '', // 分享链接
            imgUrl: './images/head10.jpg', // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                console.log("分享成功")
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });

        $('#btn_02').click(function(){
            wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                }
            });
        });

        $('#btn_03').click(function(){
            wx.getNetworkType({
                success: function (res) {
                    var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
                    $('#p_03').html(networkType.toString());
                }
            });
        });

        $("#btn_04_01").click(function(){
            wx.openLocation({
                latitude: 0, // 纬度，浮点数，范围为90 ~ -90
                longitude: 0, // 经度，浮点数，范围为180 ~ -180。
                name: '', // 位置名
                address: '', // 地址详情说明
                scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
                infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
            });
        });

        $("#btn_04_02").click(function(){
            wx.getLocation({
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    var speed = res.speed; // 速度，以米/每秒计
                    var accuracy = res.accuracy; // 位置精度
                    console.log(res)
                    $('#p_04').html("纬度:"+latitude+"\<br\>经度:"+longitude+"\<br\>速度:"+speed+"\<br>位置经度:"+accuracy)
                }
            });
        });

        $("#btn_05").click(function(){
            wx.scanQRCode({
                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success: function (res) {
                    var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                    $("#p_05").html("扫描结果为:"+result.toString())
                }
            });
        })
    });
    wx.error(function(err){
        console.log(err)
    });
});
