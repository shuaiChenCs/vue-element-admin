export default [
	{
		path: '/my',
		name: 'my',
		component: () => import(/* webpackChunkName: "addressBook" */ '../views/my/index')
	}
]