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
    delGoods:`/app/goods/delete/`,//删除商品
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
    wxConfig:`/wx/config`, //微信jssdk
}
export default apiConfig;