import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router , Route} from 'react-router-dom';
import SignUp from './Components/signup';
import Login from './Components/login';
import Welcome from './Components/welcome';
import Donor from './Components/donorRegister';
import ViewDonor from './Components/viewDonor';


 


class App extends Component {
  render() {
    return (
      <Router>
      <div>
        <Route path="/viewDonor" component={ViewDonor} />
        <Route path="/donorRegister" component ={Donor} />
       <Route path="/welcome" component = {Welcome} />
        <Route exact path='/'  component={SignUp}/>
        <Route path='/login' component ={Login}/> 
      </div> 
      </Router>
      
    );
  }
}

export default App;
