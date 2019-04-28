import store from '../store.js';
import api from '../api/apiConfig.js';
import event from './eventBus';
function getListByImaccount(obj) {
    let sessions = obj;
    let list = obj.map(item => {
        return {
            imAccount: item.to
        }
    });
    axios.post(api.getIMList, list).then(res => {
        if(res.data.code == 0) {
            store.commit('setUserList', res.data.data);
            buildSession(sessions);
        }
    });
}

function buildSession(sessions) {
    sessions = sessions.map((item) => {
        item.card = getUserBytoken(store.state.userList, item.to);
        return item;
    });
    
    store.commit('setSessions', sessions);
}

function getUserBytoken(list,token) {
    return list.find(item => item.imAccount == token);
}

export default {
    initNim(state, user) {
        window.nim = state.nim = SDK.NIM.getInstance({
            appKey: '71e5535292da57d7bb4e3205b416fef6',
            account: store.state.user.imAccount,
            token: store.state.user.imToken,
            syncSessionUnread: false,
            onconnect: this.onconnect,
            onsessions: this.onsessions,
            onupdatesession: this.onupdatesession,
            onmsg: this.onmsg
            // syncSessionUnread: true // 是否同步未读数
        });
    },
    onconnect: () => {
        // nim.deleteSession({
        //     scene: 'p2p',
        //     to: '9208df43412f43eda307b108cb41edca'
        // });
    },
    onsessions: (obj) => {
        getListByImaccount(obj);
    },
    onupdatesession(obj) {
        let sessions = nim.mergeSessions(store.state.sessions, obj);
        if(store.state.userList.length == sessions.length) {
            buildSession(sessions);
        }else{
            getListByImaccount(sessions)
        }
    },
    onmsg(msg) {
        event.$emit('onmsg', msg);
    }
}