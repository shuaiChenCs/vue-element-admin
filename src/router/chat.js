export default [
	{
		path: '/chat',
		name: 'chat',
		component: () => import(/* webpackChunkName: "chat" */ '../views/chat/chat'),
        meta:{title:'聊天'}
	}
]