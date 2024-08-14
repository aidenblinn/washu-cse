import { Http } from '@/utils';
import { Toast } from 'antd-mobile';
import { history } from 'umi';
import { cookie, urlGet } from 'project-libs';

export default {
  state: {
    id: undefined,
    username: undefined,
    avatar: undefined,
    phone: undefined,
    sign: undefined
  },
  reducers: {
    getUser(state, payload){
      return {
        ...state,
        ...payload
      }
    },
    editUser(state, payload){
      return {
        ...state,
        ...payload
      }
    }
  },
  effects: {
    async getUserAsync(dispatch, rootState, payload){
      const user = await Http({
        url: '/user/detail',
        body: payload
      });
      if(user){
        dispatch({
          type: 'getUser',
          payload: user
        });
      }
    },
    async editUserAsync(dispatch, rootState, payload){
      const result = await Http({
        url: '/user/edit',
        body: payload
      });
      if (result) {
        Toast.success('Edit successfully');
        history.push('/user');
      }
    },
    async loginAsync(dispatch, rootState, payload){
      const result = await Http({
        url: '/user/login',
        body: payload
      });
      if(result){
        localStorage.setItem('token', result.token);
        localStorage.setItem('username', result.username);
        Toast.success('Login successfully');
        history.push('/');
      }
    },
    async registerAsync(dispatch, rootState, payload){
      const result = await Http({
        url: '/user/register',
        body: payload
      });
      if(result){
        localStorage.setItem('token', result.token);
        localStorage.setItem('username', result.username);
        Toast.success('Register successfully');
      }
    },
    async logoutAsync(dispatch, rootState, payload){
      await Http({
        url: "/user/logout",
        body: payload
      });
      Toast.success('Logout successfully');
      localStorage.clear();
      location.href = '/login?from=' + location.pathname;
    }
  }
};