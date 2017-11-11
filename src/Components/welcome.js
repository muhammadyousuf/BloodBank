import React, { Component } from 'react';
import {FlatButton,AppBar} from 'material-ui';
import * as firebase from 'firebase'; 
import {Link} from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';


const styles = {
    customWidth: {
      width: 150,
    },
  };
  
  
  const style = {
        labelStyle: {
          color: 'white'
        }
      }
class Welcome extends Component{
    constructor(props) {
        super();
        this.state = {
            open:false
        }

    
      }
    
      handleToggle = () => this.setState({open: !this.state.open});
   
    
    Logout(){
        firebase.auth().signOut();
        this.props.history.push("/")
    }
    render(){
        return(
            <div className="App">
                <AppBar title="Blood Bank"

            
                onClick={this.handleToggle}
                
            
           iconElementRight={  <div><FlatButton  label="logout" disabled={true} labelStyle={style.labelStyle} onClick={this.Logout.bind(this)} containerElement={<Link to='/' />}
/>  
           
           </div>
            }
            
            />
           
    <Drawer width={300} openSecondary={false} open={this.state.open} >
    <AppBar title="Dashboard" />
    


<br/> <br/>
  

  <Link to='/donorRegister'> <RaisedButton
  fullWidth
    style={styles}
    onClick={this.handleTouchTap}
 
    label="Donor Register"
    primary={false}
  /></ Link><br /><br /><br />
  <Link to='/viewDonor'> <RaisedButton
  fullWidth
    style={styles}
    onClick={this.handleTouchTap}
 
    label="View Donor"
    primary={false}
  /></ Link><br /><br />
   

  </Drawer>

            <img src="https://upload.wikimedia.org/wikipedia/en/0/0a/Mother_Blood_Bank_Logo.png" alt="" width="50%"/>
            </div>
        );
        
    }
}
export default Welcome;