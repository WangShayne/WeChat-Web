# WeChat-Web
微信开发之nodeJS调用JS-SDK

##思路
  >这个鸟东西不就是搞个JS-SDK么.
    1. 后台发GET请求拿access_token,7200过期,要缓存
    2. 后台拿access_token再发GET请求拿jsapi_ticket
    3. 页面发当前url给后台
    4. 后台拿时间戳,随机字符,jsapi_ticket,url  sha1加密向微信要signature
    5. 返回给页面上面这些值
    6. 页面 wx.config({})调用相关接口
    