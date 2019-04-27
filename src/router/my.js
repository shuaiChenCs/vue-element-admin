
export default [
	{
		path: '/my',
		name: 'my',
		component: () => import(/* webpackChunkName: "my" */ '../views/my/index'),
		meta:{title:'我的', hastab: true}
	},
    {
        path: 'my/goods',
        name: 'goods',
        component: () => import(/* webpackChunkName: "my" */ '../views/my/goods/goods1'),
        meta:{title:'我的商品'}
    },
    {
        path: 'my/goods/detail/:id',
        name: 'goods-detail',
        component: () => import(/* webpackChunkName: "my" */ '../views/my/goods/goods-detail'),
        meta: {title: '商品详情'}
    },
    {
        path: 'my/goods/edit/:id',
        name: 'goods-edit',
        component: () => import(/* webpackChunkName: "my" */ '../views/my/goods/goods-edit'),
        meta:{title:'编辑商品'}
    },
    {
        path: 'my/goods/add',
        name: 'goods-add',
        component: () => import(/* webpackChunkName: "my" */ '../views/my/goods/goods-add'),
        meta:{title:'添加商品'}
    },
    {
        path: 'my/dynamic',
        name: 'dynamic',
        component: () => import(/* webpackChunkName: "my" */ '../views/my/dynamic/dynamic'),
        meta:{title:'动态'}
    },
    {
        path: 'my/dynamic/add',
        name: 'dynamic-add',
        component: () => import(/* webpackChunkName: "my" */ '../views/my/dynamic/dynamic-add'),
        meta:{title:'发布动态'}
    },
    {
        path: 'my/chat',
        name: 'chat',
        component: () => import(/* webpackChunkName: "my" */ '../views/my/chat/chat'),
        meta:{title:'聊天选项'}
    },
    {
        path: 'my/chat/reply',
        name: 'chat-reply',
        component: () => import(/* webpackChunkName: "my" */ '../views/my/chat/reply'),
        meta:{title:'自动回复'}
    },
    {
        path: 'my/chat/speechcraft',
        name: 'chat-speechcraft',
        component: () => import(/* webpackChunkName: "my" */ '../views/my/chat/speechcraft'),
        meta:{title:'话术库'}
    },
    {
        path: 'my/chat/add/:id',
        name: 'chat-add',
        component: () => import(/* webpackChunkName: "my" */ '../views/my/chat/add'),
        meta:{title:'编辑'}
    },
    {
        path: 'my/inviteCode',
        name: 'invite-code',
        component: () => import(/* webpackChunkName: "my" */ '../views/my/invite-code'),
        meta:{title:'邀请码'}
    },
    {
        path: 'my/inviteFriend',
        name: 'invite-code',
        component: () => import(/* webpackChunkName: "my" */ '../views/my/invite-friend'),
        meta:{title:'邀请好友'}
    },
    {
        path: 'my/playbill',
        name: 'playbill',
        component: () => import(/* webpackChunkName: "my" */ '../views/my/playbill'),
        meta:{title:'海报'}
    }
]