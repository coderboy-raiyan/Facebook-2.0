import { UserActionTypes } from "./actionTypes";

interface ILogin {
    type: UserActionTypes.LOGIN;
    payload: any;
}
interface IRegister {
    type: UserActionTypes.REGISTER;
    payload: any;
}

export function login(payload: any): ILogin {
    return {
        type: UserActionTypes.LOGIN,
        payload,
    };
}
export function register(payload: any): IRegister {
    return {
        type: UserActionTypes.REGISTER,
        payload,
    };
}

type loginType = ReturnType<typeof login>;
type registerType = ReturnType<typeof register>;

export type userActionTypes = loginType | registerType;
