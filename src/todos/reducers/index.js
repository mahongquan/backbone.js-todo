import { combineReducers } from 'redux'
import todos from './todos_sqlite'

const rootReducer = combineReducers({
  todos
})

export default rootReducer
