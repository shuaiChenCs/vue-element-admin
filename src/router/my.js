
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
        component: () => import(/* webpackChunkName: "my" */ '@/views/my/goods/goods'),
        meta:{title:'我的商品'}
    }
]