import React, { Component } from 'react';
import * as firebase from 'firebase'; 
import {Link} from 'react-router-dom';
import {FlatButton,AppBar,SelectField,TableHeaderColumn,Table,TableHeader,TableRow,TableRowColumn,TableBody,MenuItem} from 'material-ui';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import { blue800,cyan500 } from 'material-ui/styles/colors';
import  bloodgroup from '../bloodgroup.json';


const styles = {
    customWidth: {
      width: 150,
    },
  };

  const style = {
    labelStyle: {
        color: 'white'
    },
    
   
    
    floatingLabelStyle: {
        color: blue800,
    },
    
};
 

  
  class ViewDonor extends Component{
    reff = firebase.database().ref("BloodApp");
    
    constructor(props) {
        super();
        this.state = {
          open: false,
          notes: [],
          requireBlood:""
        }
        
    
      }
      handleRequiredTypeChange = (event, index, value) => {
      
        this.setState({ requireBlood: value });
      
        var match = [];
        switch (value){
            case "A+" :
            {
            match=['A+','A-','O+','O-']
            console.log("A+",match)
            break;
            }
            case "B+" :
            {
            match=['B+','B-','O+','O-']
            console.log("B+",match)
            break;
            }
            case "AB+":
            {
            match = ['A+','O+','B+','AB+','A-','O-','B-','AB-']
            console.log("AB+",match)
            break;
            }
            case "O+":
            {
            match = ['O+','O-']
            console.log("O+",match)
            break;
            }
            case "A-":
            {
            match = ['A-','O-']
            console.log("A-",match)
            break;
            }
            case "B-":
            {
            match = ['B-','O-']
            console.log("B-",match)
            break;
            }
            case "AB-":
            {
            match = ['AB-','A-','B-','O-']
            console.log("AB-",match)
            break;
            }
            case "Select All":
            {
            this.selectAll()
            break;
            }
            default:
            match = ['O-']
            console.log("O-",match)




        }
       
        const previousNotes = [];
        for (var i = 0; i < match.length; i++) {
            this.reff.orderByChild('bloodGroup')
                .equalTo(match[i])
                .once('value')
                .then(function (snapshot) {
                    var value = snapshot.val();
                    snapshot.forEach(ChildSnapshot => {
                        var data = ChildSnapshot.val();
                        previousNotes.push({
                            id: ChildSnapshot.key,
                            FullName: ChildSnapshot.val().FullName,
                          
                           
                            bloodGroup: ChildSnapshot.val().bloodGroup,
                            Contact: ChildSnapshot.val().Contact,
                            Address: ChildSnapshot.val().Address,
                            dateOfBirth: ChildSnapshot.val().dateOfBirth,
                            
                        })
                    })

                }).then(
                () => {
                    this.setState({  notes: previousNotes })
                }

                )
        }
    


      }
      selectAll(){
        const previousNotes = [];
        
                // DataSnapshot
                this.reff.on('child_added', snap => {
                    previousNotes.push({
                        id: snap.key,
                        FullName: snap.val().FullName,
                      
                        bloodGroup: snap.val().bloodGroup,
                        Contact: snap.val().Contact,
                        Address: snap.val().Address,
                        dateOfBirth: snap.val().dateOfBirth,
                        
                    })
        
                    this.setState({
                        notes: previousNotes
                    })
                })
      }
   
      handleToggle = () => this.setState({open: !this.state.open});
    Logout(){
        firebase.auth().signOut();
        this.props.history.push("/")
    }
    handleChange = (event, index, value) => this.setState({value});

      render(){
          return(
            <div className="App">
            <AppBar  title="Blood Bank"

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
    style={styles}
    onClick={this.handleTouchTap}
 
    label="Home"
    primary={false}
  /></ Link><br /><br /><br />
  <Link to='/donorRegister'> <RaisedButton
  fullWidth
    style={styles}
    onClick={this.handleTouchTap}
 
    label="Donor Register"
    primary={false}
  /></ Link><br /><br />
   

  </Drawer>




      <SelectField
                        ref='bloodGroup'
                        name='bloodGroup'
                        required={true}
                        hintText="Blood Group"
                        floatingLabelText="Select Field"
                        floatingLabelStyle={style.floatingLabelStyle}
                        floatingLabelFocusStyle={style.floatingLabelFocusStyle}
                        value={this.state.requireBlood}
                        onChange={this.handleRequiredTypeChange.bind(this)}>
                        {
                            bloodgroup.bloodgroupsSearch.map(bldgrop => {
                                return <MenuItem key={bldgrop} value={bldgrop} primaryText={bldgrop} />
                            })

                        }

                    </SelectField> 
                    <Table>
                            <TableHeader style={{ backgroundColor: cyan500}}>
                                <TableRow>
                                    <TableHeaderColumn style={{ color: "white", backgroundColor: cyan500, fontWeight: "bold", fontSize: 16 }}>Full Name</TableHeaderColumn>
                                    <TableHeaderColumn style={{ color: "white", backgroundColor: cyan500, fontWeight: "bold", fontSize: 16 }}>Address</TableHeaderColumn>
                                    <TableHeaderColumn style={{ color: "white", backgroundColor: cyan500, fontWeight: "bold", fontSize: 16 }}>Contact No.</TableHeaderColumn>
                                    <TableHeaderColumn style={{ color: "white", backgroundColor: cyan500, fontWeight: "bold", fontSize: 16 }}>Blood Group</TableHeaderColumn>
                                    <TableHeaderColumn style={{ color: "white", backgroundColor: cyan500, fontWeight: "bold", fontSize: 16 }}>Birthdate</TableHeaderColumn>
                         
                                </TableRow>
                              </TableHeader>
                              <TableBody >
                                {this.state.notes.map((data, index) => {
                                    //alert(data.FullName)
                                    return (
                                        <TableRow key={index}>
                                            <TableRowColumn style={{ fontWeight: "bold", fontSize: 14 }}>{data.FullName}</TableRowColumn>
                                            <TableRowColumn style={{ fontWeight: "bold", fontSize: 14 }}>{data.Address}</TableRowColumn>
                                            <TableRowColumn style={{ fontWeight: "bold", fontSize: 14 }}>{data.Contact}</TableRowColumn>
                                            <TableRowColumn style={{ fontWeight: "bold", fontSize: 14 }}>{data.bloodGroup}</TableRowColumn>
                                            <TableRowColumn style={{ fontWeight: "bold", fontSize: 14 }}>{data.dateOfBirth}</TableRowColumn>
                                           
                                        </TableRow>
                                    )
                                })}

                            </TableBody>
                   </Table>
            </div>
          
          )
      }
  }
  export default ViewDonor;