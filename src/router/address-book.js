export default [
	{
		path: '/address-book',
		name: 'addressBook',
		component: () => import(/* webpackChunkName: "addressBook" */ '../views/address-book/index'),
        meta:{title:'通讯录', hastab: true}
	}
]