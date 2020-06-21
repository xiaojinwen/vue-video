

export interface UserInfo {
    nickName: string;
    name: string;
    id: string | number;
    qq: string | number;
}

export interface State {
    userInfo: UserInfo;

}

export const state: State = {
    userInfo: {
        nickName: "何为不可",
        name: "xiaojinwen",
        id: "1058330410",
        qq: "1058330410",
    }
};
