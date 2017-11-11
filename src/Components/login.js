import React , {Component} from 'react'
import * as MUI from 'material-ui'
import {TextField, RaisedButton,Paper} from 'material-ui'; 
import {grey500} from 'material-ui/styles/colors';
import * as firebase from 'firebase';
import Navigation from './navigation';
import Help from 'material-ui/svg-icons/action/help-outline';


const style = {
    height: 370,
    width: 400,
    margin: 100,
    textAlign: 'center',
    display: 'inline-block',
  };
  
    export default class Login extends Component{
        
    constructor(){
        super();
        
        this.state = {
            userLogin : '',
            userPass :''
        }
        
    }

    firstvalue(event){
        this.setState({
            userLogin : event.target.value,
           
        })
    }

    secondval(pass){
        this.setState({
            userPass : pass.target.value
        })
    }
    
    checkLogin(event){
        console.log(this.state.userLogin , this.state.userPass);
      
        const email = this.state.userLogin;
        const pass = this.state.userPass;
        const auth = firebase.auth();
      
        // Sign In
        const promise = auth.signInWithEmailAndPassword(email,pass)
        promise.then(e =>  {
          console.log(e);
          if(e.uid != null){
            alert('successfull')
           {this.props.history.push('/welcome')}
          }
        })
        promise.catch(e => {
          alert(e.message)
        });
        firebase.auth().onAuthStateChanged(firebaseUser =>{
            if(firebaseUser){
         
              console.log(firebaseUser)
         
            }
          
          })
         
           
       }
        render(){
        return(
            <div className="App">
                <Navigation />
                <Paper style={style} zDepth={3} >
          <br/>
         <TextField hintText='Email' floatingLabelText="Email" style = {{width: 350}} id="userLogIn"   onChange={this.firstvalue.bind(this)} /> <br />
         <br />
         <TextField
      hintText="Password" floatingLabelText="Password" style = {{width: 350}} id='userP' type='password'
            onChange={this.secondval.bind(this) }
    /> <br /> <br />
    <div>
                <MUI.Checkbox
                  label="Remember me"
                  className="long-checkRemember"
                  labelStyle={{color: grey500, fontSize: 20, marginRight:200}}
                  iconStyle={{color: grey500,borderColor: grey500, fill: grey500 , marginLeft:2}}
                />
                
                  
     </div>
     <br />

    <RaisedButton label="Log In" primary={true} style = {{width: 350, height: 50, fontSize: 20}} onClick={this.checkLogin.bind(this)} />
            <br /> <br />
            <div>
            <MUI.FlatButton
              label="Forgot Password"
              className="long-flatButton"
              icon={<Help />}
              />
            </ div>
            </Paper>
            </div>
        );
    }
}