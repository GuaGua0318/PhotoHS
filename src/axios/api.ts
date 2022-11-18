import request from './request';

//登录
export const PostLoginApi = (params:unknown) => request.post('/auth/login',params);

//注册
export const PostRegisterApi = () => request.post('/register');

//上传
export const PostSharedAddApi = (params:unknown) => request.post('/shared/add',params);

