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
	},
	{
		path: '/address-book/group-send',
		name: 'addressBookGroup',
		component: () => import(/* webpackChunkName: "addressBook" */ '../views/address-book/group-send'),
        meta:{title:'群发消息'}
	},
	{
		path: '/address-book/person/:id',
		name: 'addressBookPerson',
		component: () => import(/* webpackChunkName: "addressBook" */ '../views/address-book/person'),
        meta:{title:'编辑'}
	},
	{
		path: '/address-book/addTags/:id',
		name: 'addressBookAddTags',
		component: () => import(/* webpackChunkName: "addressBook" */ '../views/address-book/add-tags'),
        meta:{title:'添加标签'}
	},
	{
		path: '/address-book/tag-type/:id',
		name: 'addressBookTagType',
		component: () => import(/* webpackChunkName: "addressBook" */ '../views/address-book/tag-type'),
        meta:{title:'标签成员'}
	},
]