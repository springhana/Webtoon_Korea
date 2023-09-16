export interface ReduxType {
  detail_search: detail_search;
  login: login;
  loginCheck: loginCheck;
  register: register;
  yesNo: yesNo;
}
interface detail_search {
  data: any;
}
interface loginType {
  isOpen: boolean;
}
interface loginCheck {
  login: boolean;
  _id: string;
}
interface register {
  isOpen: boolean;
}
interface yesNo {
  open: boolean;
  yes: boolean;
}
