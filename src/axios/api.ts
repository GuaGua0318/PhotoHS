import request from './request';

//登录
export const PostLoginApi = (params:unknown) => request.post('/auth/login',params);

//注册
export const PostRegisterApi = (params:unknown) => request.post('/user/register',params);

//上传
export const PostSharedAddApi = (params:unknown) => request.post('/shared/add',params);

//请求所有共享图片
export const GetSharedAllApi = () => request.get('/shared/all');

//请求当前用户所有共享图片
export const PostMySharedAllApi = (params:unknown) => request.post('/shared/myshared',params);

