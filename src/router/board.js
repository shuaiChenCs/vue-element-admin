export default [
	{
		path: '/board',
		name: 'board',
		component: () => import(/* webpackChunkName: "addressBook" */ '../views/board/index'),
		meta:{title:'看板', hastab: true}
	}
]