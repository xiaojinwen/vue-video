import { State, UserInfo } from './states';

export default {
    getUserInfo(state: State): UserInfo {
        return state.userInfo;
    },
};
