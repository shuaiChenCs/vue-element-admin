import store from '../store.js';
export default {
    initNim(state, user) {
        window.nim = state.nim = SDK.NIM.getInstance({
            appKey: '71e5535292da57d7bb4e3205b416fef6',
            account: 'c524c94a37f54436aa4353e9e0850a6d',
            token: 'c524c94a37f54436aa4353e9e0850a6d',
            syncSessionUnread: false,
            onconnect: this.onconnect,
            onsessions: this.onsessions
        })
    },
    onconnect: () => {
        // console.log(111);
        // store.commit()
    },
    onsessions: (obj) => {
        let list = obj.map(item => {
            return {
                imAccount: item.to
            }
        })
        console.log(list)
        store.commit('setSessions', obj);
    }
}