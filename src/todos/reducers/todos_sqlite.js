import { LOAD_TODO_RES} from '../constants/ActionTypes'
const initialState = [
  {
    text: 'Use Redux',
    completed: false,
    id: 0
  }
]

export default function todos(state = initialState, action) {
  let new_state;
  console.log(action);
  switch (action.type) {
    case LOAD_TODO_RES:
      if(action.res)
        new_state=action.res.data;
      else
        new_state=[];
      return new_state;

    default:
      return state
  }
  localStorage.setItem('mytodos', JSON.stringify(new_state));
  return new_state;
}
