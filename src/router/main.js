export default [
	{
		path: '/main',
		name: 'main',
		component: () => import(/* webpackChunkName: "addressBook" */ '../views/main/index'),
        meta:{title:'首页', hastab: true}
	},
	{
		path: '/main/article-type',
		name: 'articleType',
		component: () => import(/* webpackChunkName: "addressBook" */ '../views/main/article-type'),
        meta:{title:'筛选分类'}
	}
]