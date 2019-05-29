const apiConfig = {
    login:'/simulate/login',//登录
    register: `/mini/register`, //注册
    memberInfo: `/app/member/get/info`,//获取用户信息
    cardList: `/app/card/list/page`,//获取名片列表
    getCard: `/app/card/get`,//获取个人卡片信息
    cardImageUrl: 'https://img.hrsugaphre.com/huaren/1527925870.png', //获取海报图片路径
    fileUpload: `/fileUpload`,//图片上传
    getRecommendTags: `/app/card/list/label/library`,//获取推荐标签
    getEditCard: `/app/card/get`,//获取编辑卡片信息
    editCard: `/app/card/edit`,//编辑卡片
    summitFormId: `/app/member/add/formId`,//提交formId
    recordUpload: `/mp3/fileUpload`,//录音上传
    getGoodsType: `/app/goodsType/user/list`,//获取商品分类
    getGoodsList: `/app/goods/list/page`,//获取商品列表
    getGoodDetail: `/app/goods/get`,//获取商品详情
    editGoods:`/app/goods/edit`, //编辑商品
    setGoodTop:`/app/goods/setTop`,//设置商品置顶
    addGoods:`/app/goods/add`, //新增商品
    putawayGoods:`/app/goods/putaway`,//上架/下架商品
    delGoodsType:`app/goodsType/delete/`, //删除商品类型
    saveDelicacy: `/app/card/edit/delicacy`,//保存精选照片
    getDelicacyList: `/app/card/list/delicacy`,//获取个人精选照片
    getDynamic: `/app/dynamic/list/page`,//获取动态
    addDynamicCommet: `/app/dynamicComment/add`,//添加动态评论
    addDynamic:`/app/dynamic/add`,//发布动态
    delDynamic:`/app/dynamic/delete/`,//删除动态
    dynamicPraise: `/app/dynamicPraise/edit/dynamic`,//添加动态点赞
    cardLike: `/app/card/like`,//卡片点赞
    behavior: `/app/behavior/add`,//行为操作,
    verbal:`/app/verbal/index`,//话术首页
    reponseList:`/app/verbal/response/list`,//自动回复列表
    verbalList:`/app/verbal/list`,//自定义话术库
    getVerbal:`/app/verbal/get/`, //获取话术
    editVerbal:`/app/verbal/edit`,//更新话术
    editReponseVerbal:`/app/verbal/response/edit`,//编辑自动回复话术
    addVerbal:`/app/verbal/add`, //新增话术库
    delVerbal:`/app/verbal/delete/`, // 删除话术库
    getClientList:`/app/client/list/directory`,//获取通讯录,
    officialRegister:`/official/register`, //公众号注册,
    wxConfig:`/wx/config`, //微信jssdk,
    labelLibrary:`/app/client/list/label/group`, //标签组
    userLabelLibrary:`/app/client/list/label/library/`,  //用户标签库,
    getPersonInfo:`/app/client/get/info/` ,//获取用户信息
    addUserTag:`/app/client/add/custom/label`, //添加自定义标签
    editRemark:`/app/client/edit/info`, //编辑客户信息,
    delLabel:`/app/client/delete/custom/label/`, //删除标签
    addLabel:`/app/client/add/label` ,//给用户打标签
    labelList:`/app/client/list/client/byLabel/`,//获取标签下的用户组,
    yesterdayBrowseCount:`/app/ai/yesterday/browse/count` ,//昨日浏览统计
    yesterdayBrowseGroup:`/app/ai/yesterday/browse/group`,//昨日浏览统计饼图
    yesterdayBrowseUser:`app/ai/yesterday/browse/client`, //昨日浏览用户
    yesterdayNewClient:`/app/ai/yesterday/new/client`, //昨日新增客户
    searchUser:`app/ai/potential/group/code` ,// 找客户
    goodsHeat:`/app/goods/heat`, //商品热度
    latelyBrowse:`/app/ai/behavior` ,//最近浏览
    latelyFlow:`/app/ai/lately/flow`, //最近7日流量
    browseGroup:`/app/ai/browse/group`, //互动次数
    ai:`app/ai/behavior`, //行为记录
    customer:`/app/customer/get/`, //客服
    getIMList:`app/member/list/im/account`, //根据imaccount查询会员列表,
    getFriend:`app/member/list/recommend`, //获取邀请好友,
    refreshCode:`/app/card/reset/poster`, //刷新二维码
    getCardPoster:`app/card/get/poster/`, //获取海报二维码
	messageNotity: `/app/notify/leave/notify`,//消息推送
    potential:`/app/ai/potential/code`, //找客户
    potentialWeek:`app/ai/potential/week`, //近7日潜在客戶,
    pay:`/app/memberOrder/pay`, //支付
    getIndex: 'app/index/get', //获取首页数据
    getArticle: 'app/new/list', //获取文章列表
    getArticleContent: 'app/new/view', //获取文章内容
    shareNew:`app/member/new/share`, //分享文章
    newsOther:`app/member/new/get/news/member`, //获取文章会员信息
    getShareArticleContent:`/app/member/new/get/info`, //获取分享文章信息
    changeToMy:`app/member/new/make/me`, //制作成我的文章
    getArticleQrcode:`app/member/new/generate/code`, //生成文章二维码
    wxAuthorization:`/wx/authorization`, //微信授权地址返回
    getMyArticle:`app/member/new/list/my/article`, //获取我的文章
    makeArticle:`app/member/new/generate/url`, //根据URL生成文章
    deleteMyArticle:`app/member/new/delete/news`, //删除我的文章
}
export default apiConfig;