
export default [
	{
		path: '/my',
		name: 'my',
		component: () => import(/* webpackChunkName: "my" */ '../views/my/index'),
		meta:{title:'我的'}
	},
    {
        path: 'my/goods',
        name: 'goods',
        component: () => import(/* webpackChunkName: "my" */ '../views/my/goods/goods'),
        meta:{title:'我的商品'}
    },
    {
        path: 'my/goods/edit',
        name: 'goods-edit',
        component: () => import(/* webpackChunkName: "my" */ '../views/my/goods/goods-edit'),
        meta:{title:'编辑商品'}
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