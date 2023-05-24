import { createStore,action } from "easy-peasy";


export const store = createStore({
  todos: ['Create store', 'Wrap application', 'Use store'],
  token :'',
  addToken: action((state:any, payload) => {
    state.token = payload;
  }),
});