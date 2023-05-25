import { createStore,action } from "easy-peasy";


export const store = createStore({
  todos: ['Create store', 'Wrap application', 'Use store'],
  token: '',
  isAdmin:false,
  addToken: action((state:any, payload) => {
    state.token = payload;
  }),
  changeAdmin: action((state:any,payload) => {
    state.isAdmin = payload;
  })
});