import React, { Component } from 'react';
import StudentDataService from '../services/student.services'

//Table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
//
import GridContainer from "../components/UiComponents/Grid/GridContainer"
import GridItem from "../components/UiComponents/Grid/GridItem"
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from "@material-ui/core/Button"
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import logo from './student.png'
export default class StudentList extends Component
{
    constructor(props) {
        super(props);
        this.retrieveStudents = this.retrieveStudents.bind(this);
        this.onChangeValue = this.onChangeValue.bind(this);
        this.state = {
            Students: [],
            temp:[],
            value:null,
            Btn_State:true,
            refr:false
          
            
          };  
    }

componentDidMount()
    {
    this.retrieveStudents();
    }

                    
componentDidUpdate(prevState)
{
    if(prevState.refr !== this.state.refr)
    {
        if(this.state.refr === true)
        {
            this.retrieveStudents();
            this.setState({refr:false});
        }
    }
}



retrieveStudents()
                    {
                        this.setState({Students: []})
                      StudentDataService.getAll()
                      .then(response =>{
                        if(response.data.length> 0)
                        {
                           this.setState({Students:response.data}); 

                           this.setState({temp:response.data.sort(this.compare)});
                        }
                      console.log(response.data)
                      })
                      .catch(e =>{console.log(e);});
                    }
onChangeValue(event) {
                      this.setState({value:event.target.value,Btn_State:false})                    
                     }

refresh() // for clearing  the text fiels
        {
           

  document.getElementById("name").value=""
    document.getElementById("division").value=""
   document.getElementById("class").value=""
    document.getElementById("dob").value=""
    
    this.setState({value:null,Btn_State:true})


        }


DeleteStudent(id) // Deleting a Particular  Row 
{
    StudentDataService.delete(id).then(alert("Successfully Deleted.."))
    .catch(e =>{alert("Unable to Delete..")});
    this.setState({refr:true});
    
}


// Adding new Student
AddStudent = e =>
  {
    e.preventDefault();
    let count;
    const{Students}=this.state
   
    let temp=Students.sort(this.rollNoGen);
             if(Students.length > 0)
                 count =temp[Students.length-1].rollno;  
             else count=100;
    
    let name = document.getElementById("name").value;
    let division = document.getElementById("division").value;
    let sclass = document.getElementById("class").value;
    let dob = document.getElementById("dob").value;
    let gender = this.state.value;
    let rollno =parseInt(count)+1;
   
    let data={ rollno,name,division,sclass,dob,gender };
 
    StudentDataService.create(data);
    this.setState({refr:true})
    this.refresh();
    
    alert("Successfully added..")
    
  }



 compare(a, b) 
 {
//  Used for converting array in ascending order
// Use toUpperCase() to ignore character casing
const nameA = a.name.toUpperCase();
const nameB = b.name.toUpperCase();

let comparison = 0;
if (nameA > nameB) {
                    comparison = 1;
                    } 
else if (nameA < nameB) {
                            comparison = -1;
                        }
                    return comparison;
                    }



checker(e) // used for validating name field 
{
let val =e.target.value;
let matches = val.match(/\d+/g); //identifiying numeric values
if (matches != null) {
let update=val.slice(0, -1);
e.target.value=update;
}

//identifiying special symbols values
let splChars = "!*|,\":<>[]{}`/';()@&$#%+-_^~?.";
for(let i=0; i<val.length;i++)
{

for(let j=0;j<splChars.length;j++)
{
        let A = splChars.charAt(j)
        let B = val.charAt(i)
        if(A === B)
                    {
                    let update=val.slice(0, -1);
                    e.target.value=update;
                    }
        }
}
}

// used to generate unique rollnumber
rollNoGen(a, b) {
    // Use toUpperCase() to ignore character casing
    const rollnoA = a.rollno
    const rollnoB = b.rollno
  
    let comparison = 0;
    if (rollnoA > rollnoB) {
      comparison = 1;
    } else if (rollnoA < rollnoB) {
      comparison = -1;
    }
    return comparison;
  }


  ListComponent() // Generate table for Student List
  {
    const{Students}=this.state
    
      return(
  <TableContainer component={Paper} style={{minHeight:650,}}>
              <Table  >
                <TableHead style={{backgroundColor:"#7DD4FF"}}>
                  <TableRow>
                  
                    <TableCell align="center">Roll No</TableCell>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Date of Birth</TableCell>
                    <TableCell align="center">Gender</TableCell>
                    <TableCell align="center">Class</TableCell>
                    <TableCell align="center">Division</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    {
                        this.state.temp.map(student =>(
                         <TableRow>
                          <TableCell align="center">{student.rollno}</TableCell>
                          <TableCell align="center">{student.name}</TableCell>
                          <TableCell align="center">{student.dob}</TableCell>
                          <TableCell align="center">{student.gender}</TableCell>
                          <TableCell align="center">{student.sclass}</TableCell>
                          <TableCell align="center">{student.division}</TableCell>
                          <TableCell align="center"> <IconButton onClick={()=>{this.DeleteStudent(student.id)}} ><DeleteIcon /></IconButton></TableCell>
                         
                          </TableRow>
                        ))
                    }
                    </TableBody>
                    </Table>
                    </TableContainer>
      );
        
  }


GetStudentData()
{
    const{value,stud_class}=this.state
    return(
        <div className="addbox">
            <form onSubmit={this.AddStudent}>
            <GridContainer xs={12} sm={12} md= {13}>
                
                <GridItem xs={12} sm={12} md= {13}>
                  <GridContainer xs={12} sm={12} md= {13}>
                  <GridItem xs={12} sm={12} md= {3}>
                    <img src={logo} alt="logo" style={{height:100}}/>
                    </GridItem>
                    <GridItem xs={12} sm={12} md= {9}>
                    <h1 style={{fontSize:36,marginTop:20}}>Add New Student</h1>   
            <p>Enter the details to add a new student</p> 
                    </GridItem>
                  

                  </GridContainer>
            
            </GridItem>
            
<GridItem xs={12} sm={12} md= {13}>
        <TextField 
            label="Name"
            id="name"
            required
            type="text"
            variant="outlined"
            onChange={this.checker}
            style={{marginTop:20}}
            fullWidth/>
</GridItem>

<GridItem xs={12} sm={12} md= {7}>
    <FormLabel style={{marginTop:50}} component="legend">Date Of Birth</FormLabel>
        <TextField 
        variant="outlined"
        id="dob"
        type="date"
        required
        style={{marginTop:5}}
        fullWidth/>
</GridItem>

<GridItem xs={12} sm={12} md= {3} style={{marginLeft:30}}>
    <FormControl  style={{marginTop:20}}  >
        <FormLabel >Gender</FormLabel>
            <RadioGroup style={{marginTop:10}} required  value={value} onChange={this.onChangeValue} >
                <GridContainer xs={12} sm={12} md= {2}>

                    <GridItem xs={12} sm={12} md= {6}>
                       <FormControlLabel value="Female"  control={<Radio />} label="Female" />
                    </GridItem>

                    <GridItem xs={12} sm={12} md= {6}>
                        <FormControlLabel value="Male"  control={<Radio />} label="Male" />
                    </GridItem>

                </GridContainer>
            </RadioGroup>
    </FormControl>
</GridItem>

    <GridItem xs={12} sm={12} md= {7} >
        <FormControl  variant="outlined" fullWidth
                style={{marginTop: 50,paddingRight:30}}>
                <InputLabel>Class</InputLabel>
                    <Select  style={{marginTop:20}} id="class" native fullWidth required onChange={this.getclass}  >
                    <option value="I"> I</option>
                    <option value="II"> II</option>
                    <option value="III"> III</option>
                    <option value="IV"> IV</option>
                    <option value="V"> V</option>
                    <option value="VI"> VI</option>
                    <option value="VII"> VII</option>
                    <option value="VIII"> VIII</option>
                    <option value="IX"> IX</option>
                    <option value="X"> X</option>
                    <option value="XI"> XI</option>
                    <option value="XII"> XII</option> 
                    </Select> 
        </FormControl>
    </GridItem>


<GridItem xs={12} sm={12} md= {5} >
    <FormControl variant="outlined" fullWidth  style={{ marginTop:50 }} >
        <InputLabel>Division</InputLabel>
            <Select  style={{marginTop:20}}  id="division" native fullWidth required onChange={() =>this.getDivision}  >
                <option value="A"> A</option>
                <option value="B"> B</option>
                <option value="C"> C</option>
            </Select> 
    </FormControl>
</GridItem>

<GridItem xs={12} sm={12} md= {13} >
    <Button fullWidth type="submit" disabled={this.state.Btn_State} style={{marginTop:30,backgroundColor:"#006CFF",height:50,color:"white"}}>Submit </Button>
</GridItem>

          </GridContainer>
        
          </form> 

        </div>
    )
}
      render()
      {
       
  return(
   

<GridContainer >
   <GridItem xs={12} sm={12} md= {5} style={{borderRadius:10,marginTop:30}} >
   {this.GetStudentData()}
</GridItem>
<GridItem xs={12} sm={12} md= {7} >
    
    {this.ListComponent()}
    </GridItem>
</GridContainer>

  );

        
      }

    
}