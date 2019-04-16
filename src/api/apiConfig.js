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
    setGoodTop:`/app/goods/setTop`,//设置商品置顶
    addGoods:`/app/goods/add`, //新增商品
    delGoods:`/app/goods/delete/`,//删除商品
    saveDelicacy: `/app/card/edit/delicacy`,//保存精选照片
    getDelicacyList: `/app/card/list/delicacy`,//获取个人精选照片
    getDynamic: `/app/dynamic/list/page`,//获取动态
    addDynamicCommet: `/app/dynamicComment/add`,//添加动态评论
    dynamicPraise: `/app/dynamicPraise/edit/dynamic`,//添加动态点赞
    cardLike: `/app/card/like`,//卡片点赞
    behavior: `/app/behavior/add`,//行为操作
}
export default apiConfig;