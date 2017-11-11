import React, { Component } from 'react';
import * as firebase from 'firebase'; 
import {Link} from 'react-router-dom';
import {FlatButton,AppBar} from 'material-ui';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import * as MUI from 'material-ui'
import  bloodgroup from '../bloodgroup.json';
import styles from './donorRegisterStyle';
const stylying = {
    customWidth: {
      width: 150,
    },
  };
const style = {
    labelStyle: {
      color: 'white'
    }
  }

class Donor extends Component{
    ref = firebase.database().ref("BloodApp");
    constructor(props) {
        super();
        this.state = {
            open:false,
            FullName: "",
            Address:"",
            Contact:"",
            bloodGroup:"",
            dateOfBirth:"",
            nameArray: {}
        }
      
      

      }
    
    // handleChangeFullName (ev){
    // this.setState({FullName: ev.target.value});
    // console.log("Name",this.state.FullName)
    // }

    // handleChangeAddress (ev){
    //     this.setState({Address: ev.target.value});
    //     console.log("Address",this.state.Address)
    //     }
        sendToFirebase(ev){
           
          if(this.state.FullName ==="" || this.state.Address==="" || this.state.Contact ===""|| this.state.bloodGroup ===""|| this.state.dateOfBirth ===""){
            alert("Please fill all fields");
          } 
          else{
            
            this.ref.push({FullName: this.state.FullName,Address:this.state.Address,Contact:this.state.Contact,bloodGroup:this.state.bloodGroup,dateOfBirth:(this.state.dateOfBirth.getUTCDate()+1) +"/"+(this.state.dateOfBirth.getUTCMonth() + 1 )+"/"+this.state.dateOfBirth.getUTCFullYear()});
            this.setState({FullName: "",Address:"",Contact:"",bloodGroup:"",dateOfBirth:""})
            alert("Done")
            }
          }

        // handleChangeContact (ev){
        //     this.setState({Contact: ev.target.value});
        //     console.log("Contact",this.state.Contact)
        //     }
    
            handleChange  (event, index, value){
                this.setState({bloodGroup:value});
                console.log("Blood Group",value)
            } 
            handleChangeInDate(e,newDate){
                //this.setState({bloodGroup:newDate});
                this.setState({dateOfBirth:newDate});
                console.log("ee",e)
                console.log("DOB",newDate)
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
  

  <Link to='/welcome'> <RaisedButton
  fullWidth
    style={stylying}
    onClick={this.handleTouchTap}
 
    label="Home"
    primary={false}
  /></ Link><br /><br /><br />
  <Link to='/viewDonor'> <RaisedButton
  fullWidth
    style={stylying}
    onClick={this.handleTouchTap}
 
    label="View Donor"
    primary={false}
  /></ Link><br /><br />
   

  </Drawer>

  <div style={styles.registerDonorContainer}>
        <MUI.Paper style={styles.paper}>
          <h3 style={styles.title}>Donor Registration</h3>
          <MUI.Divider/>
          <form>

          <MUI.TextField
            ref="fullName"
            name="fullName"
            type="text"
            hintText="Full Name"
            floatingLabelText="Full Name"
            value={this.state.FullName} 
            //onChange={this.handleChangeFullName.bind(this)}
          onChange={(event)=> {this.setState({FullName : event.target.value})}}
            fullWidth={true}
          />
          <MUI.TextField
            ref="address"
            name="address"
            hintText="Address"
            floatingLabelText="Address"
            value={this.state.Address} 
            //onChange={this.handleChangeAddress.bind(this)}
            onChange={(event)=> {this.setState({Address : event.target.value})}}       
            fullWidth={true}
          />
          <MUI.TextField
            ref="contactNo"
            name="contactNo"
            
            hintText="Contact No."
            floatingLabelText="Contact No."
            
            value={this.state.Contact} 
           // onChange={this.handleChangeContact.bind(this)}
           onChange={(event)=> {this.setState({Contact : event.target.value})}}
            fullWidth={true}
          />
          <MUI.SelectField
            ref="bloodGroup"
            floatingLabelText="Blood Group"
            value={this.state.bloodGroup} 
            onChange={this.handleChange.bind(this)}
           // onChange={(esvent)=> {this.setState({bloodGroup : event.target.value})}}
            fullWidth={true}
            autoWidth={true}
           
            >
            {
                bloodgroup.bloodgroups.map(bloodgroup=>{
                return <MUI.MenuItem key={bloodgroup} value={bloodgroup} primaryText={bloodgroup}/>
              })
            }
          </MUI.SelectField>

          <MUI.DatePicker
            ref="dateOfBirth"
            hintText="Date of Birth"
            floatingLabelText="Date of Birth"
            value={this.state.dateOfBirth}
            maxDate={new Date()}
            onChange={this.handleChangeInDate.bind(this)}
            fullWidth={true}/>

          
          <div style={styles.buttons}>
            <Link to="/welcome">
              <MUI.RaisedButton label="Cancel"/>
            </Link>

            <MUI.RaisedButton label="Save"
                          style={styles.saveButton}
                          onTouchTap={this.handleSave}
                          onClick={this.sendToFirebase.bind(this)}
                          primary={true}/>
          </div>
        </form>

          <div style={styles.clear}/>
        </MUI.Paper>
      </div>
            </div>
        )
    }

}
export default Donor;