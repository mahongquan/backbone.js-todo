import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App  from './containers/App'
import reducer from './reducers'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// Note: this API requires redux@>=3.1.0
class App2 extends React.Component{
    constructor(){
        super();
        this.store= createStore(
          reducer,
          applyMiddleware(thunk)
        );
        console.log(this.store)
    }
    render(){
	return(
	  <Provider store={this.store}>
	    <App>
	    </App>
	  </Provider>)}
}
export default App2