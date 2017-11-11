import React, { Component } from 'react';
import {TextField , RaisedButton,Paper} from 'material-ui'; 
import '../config/firebase.js';
import Navigation from './navigation';
import * as firebase from 'firebase'
const style = {
  height: 400,
  width: 400,
  margin: 120,
  
  display: 'inline-block',
};


class SignUp extends Component {
     
  constructor(props){
    super(props);
    this.state = {
      name :'',
      username : '',
      userpassword :''
    }
   
  }

   componentWillMount(){
     console.log('componentwillmount');
   }



 checkfields(){
   if(this.state.name ==="" || this.state.username==="" || this.state.userpassword ===""){
    alert("Please fill all fields");
  } 
  else{

  
    console.log( this.state.name , this.state.username , this.state.userpassword);
    const email = this.state.username ;
    const pass = this.state.userpassword ;
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email , pass)
    promise.then(  (aaa) => {
        console.log(">>>>>>>>>>>", aaa);
        if(aaa.uid != null){
           alert('successfull');


           
         } 
        } );
         promise.catch(e =>alert(e.message));
        }
      
    
      }
 

  render() {
    return (
      

      <div className="App">
        <Navigation />
        <div>
        <Paper style={style} zDepth={3} >
          <br/>
         <TextField hintText='Enter Name'   floatingLabelText="Enter Name" style = {{width: 350}} onChange={(event) => this.setState({
           name : event.target.value,
      
           })} /> <br />   <br />
         <TextField hintText='Email' id='usersignname' floatingLabelText="Email" style = {{width: 350}} onChange={(event) => this.setState({
           username : event.target.value
           })}/> <br />  <br />

         <TextField
      hintText='Password'
        id='usersetpass'type='password' floatingLabelText="Password" style = {{width: 350}} onChange ={(event) => this.setState({userpassword : event.target.value})}
    /> < br /> <br />  <br />
    <RaisedButton label="Sign Up" primary={true} style = {{width: 350, height: 50, fontSize: 20}} id="btnSignUp" onClick={this.checkfields.bind(this)} />
        <div >
          
        </div>
        
        </Paper>
      </div>
      
      </div>
    );
  }
}

export default SignUp;

