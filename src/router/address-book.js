export default [
	{
		path: '/address-book',
		name: 'addressBook',
		component: () => import(/* webpackChunkName: "addressBook" */ '../views/address-book/index')
	}
]