import { getLists } from '@/services/search' 
export default {
  namespace: 'search',
  state: {
    text: 'dva',
    lists: []
  },
  // sync
  reducers: {
    getLists(state, action){

      return {
        ...state,
        lists: action.payload
      }
    }
  },
  // async
  effects: {
    *getListsAsync({payload}, {call, put}){
      const res = yield call(getLists, payload);
      yield put({
        type: 'getLists',
        payload: res.lists
      })
    }
  }
}