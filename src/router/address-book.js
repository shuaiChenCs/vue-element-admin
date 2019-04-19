export default [
	{
		path: '/address-book',
		name: 'addressBook',
		component: () => import(/* webpackChunkName: "addressBook" */ '../views/address-book/index'),
        meta:{title:'通讯录', hastab: true}
	},
	{
		path: '/address-book/tags',
		name: 'addressBookTags',
		component: () => import(/* webpackChunkName: "addressBook" */ '../views/address-book/tags'),
        meta:{title:'标签'}
	},
	{
		path: '/address-book/message',
		name: 'addressBookMessage',
		component: () => import(/* webpackChunkName: "addressBook" */ '../views/address-book/message'),
        meta:{title:'客户留言'}
	}
]