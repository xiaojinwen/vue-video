import { State } from './states';

export default {
    setUserInfo(state: State, userInfo: any): void {
        state.userInfo = userInfo;
    },
};
