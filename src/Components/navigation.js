import React from 'react';
import AppBar from 'material-ui/AppBar';

import FlatButton from 'material-ui/FlatButton';
import {Link} from 'react-router-dom';

const styles = {
    labelStyle: {
      color: 'white',
      fontSize: '18px'
    }
  }



 class Navigation extends React.Component {
     render(){
         return(
            <AppBar
            
            
            
            iconElementRight={  <div><FlatButton label="Sign Up" disabled={true} labelStyle={styles.labelStyle} containerElement={<Link to='/' />}/>        
            <FlatButton  label='Log In' disabled={true} labelStyle={styles.labelStyle} containerElement={<Link to="/Login" />}/>
            
            </div>
            }
            
          />
        
         );
     }
 }


export default Navigation;