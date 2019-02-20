import React from 'react'
import { render } from 'react-dom'
import Model from './Model'
import App  from './containers/App'
class App2 extends React.Component{
    constructor(){
        super();
        this.store= new Model();
    }
    render(){
	  return(
	    <App store={this.store}>
	    </App>);
	}
}
export default App2