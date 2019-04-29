export default [
	{
		path: '/chat',
		name: 'chat',
		component: () => import(/* webpackChunkName: "chat" */ '../views/chat/chat'),
        meta:{title:'聊天'}
	},
	{
		path: '/group-chat',
		name: 'groupChat',
		component: () => import(/* webpackChunkName: "chat" */ '../views/chat/group-chat'),
        meta:{title:'群发'}
	}
]