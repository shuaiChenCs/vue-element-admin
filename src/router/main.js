export default [
	{
		path: '/main',
		name: 'main',
		component: () => import(/* webpackChunkName: "addressBook" */ '../views/main/index'),
        meta:{title:'首页'}
	}
]