export default [
	{
		path: '/board',
		name: 'board',
		component: () => import(/* webpackChunkName: "addressBook" */ '../views/board/index'),
		meta:{title:'看板', hastab: true}
	},
	{
		path: '/board/card',
		name: 'boardCard',
		component: () => import(/* webpackChunkName: "addressBook" */ '../views/board/card'),
		meta:{title:'名片'}
	},
	{
		path: '/board/AI',
		name: 'boardAI',
		component: () => import(/* webpackChunkName: "addressBook" */ '../views/board/AI'),
		meta:{title:'AI'}
	},
	{
		path: '/board/scview',
		name: 'boardScview',
		component: () => import(/* webpackChunkName: "addressBook" */ '../views/board/scview'),
		meta:{title:'浏览量'}
	},
	{
		path: '/board/last-add',
		name: 'boardLastadd',
		component: () => import(/* webpackChunkName: "addressBook" */ '../views/board/last-add'),
		meta:{title:'昨日新增'}
	},
	{
		path: '/board/last-scview',
		name: 'boardLastscview',
		component: () => import(/* webpackChunkName: "addressBook" */ '../views/board/last-scview'),
		meta:{title:'昨日浏览'}
    },
    {
        path: '/board/share-count',
        name: 'boardShareCount',
        component: () => import(/* webpackChunkName: "addressBook" */ '../views/board/share-count'),
        meta:{title:'转发次数'}
    },
    {
        path: '/board/lately-browse',
        name: 'boardLatelyBrowse',
        component: () => import(/* webpackChunkName: "addressBook" */ '../views/board/lately-browse'),
        meta:{title:'最近浏览'}
    }
    ,
	{
		path: '/board/new-friend',
		name: 'boardNewFriend',
		component: () => import(/* webpackChunkName: "addressBook" */ '../views/board/new-friend'),
		meta:{title:'新增客户'}
	}
]