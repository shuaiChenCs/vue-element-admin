
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
        path: 'my/goods/detail',
        name: 'goods-detail',
        component: () => import(/* webpackChunkName: "my" */ '../views/my/goods/goods-detail'),
        meta: {title: '商品详情'}
    },
    {
        path: 'my/goods/edit',
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
        path: 'my/dynamic/edit',
        name: 'dynamic-edit',
        component: () => import(/* webpackChunkName: "my" */ '../views/my/dynamic/dynamic-edit'),
        meta:{title:'发布动态'}
    }
]