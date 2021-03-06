import React,{useRef} from 'react';
import { connect } from 'react-redux';
import {
  Typography, AppBar, Toolbar, 
  Grid, FormControl, Button, InputLabel, Input
} from '@material-ui/core';
import {editData} from '../actions/contact';
import {useForceUpdate} from '../utils/forceUpdate';
import SimpleReactValidator from 'simple-react-validator';

function EditContact(props) {
  const validator = useRef(new SimpleReactValidator())
  const forceUpdate = useForceUpdate();

  const data = props.location.state.data;
const [contact, setContact] = React.useState({
  firstName: data.firstName,
  lastName: data.lastName,
  age: data.age,
  photo: data.photo
});

// const [photo, setPhoto] = React.useState({});
const [base64, setBase64] = React.useState(data.photo);

const image = (a)=>{
  const b= a.target.files[0]; 

  let reader = new FileReader();
  reader.readAsDataURL(b);
  reader.onloadend = () => {
    // setPhoto(b);
    setBase64(reader.result)
  };

}

  const change=(i, v)=> {
    setContact(c => 
      { c[i] = v; 
      return { ...c }; })
  }

  const editing = async(id,firstName,  lastName, age ,base64) => {
    if (validator.current.allValid()) {
      const newData = {
      firstName,  lastName, age , photo:base64
    }
    const res = await props.editData(id, newData);
    if(res)  props.history.push('/');
  }
 else {
    validator.current.showMessages();
    forceUpdate();
  }
  }

  return (
    <Grid container justify="center" alignItems="center">
    
    <Grid item xs={12}>
    <AppBar position="static" style={{width:'100%'}}>
  <Toolbar>
  <Grid
      justify="space-between" // Add it here :)
      container 
      spacing={24}
    >
    <Grid item>
    <Typography variant="h5" component="h2">
      Edit Contact
    </Typography>
    </Grid>

    <Grid item>

    <Button color="inherit" style={{float:'right'}}  onClick={()=>{props.history.push('/')}}>Home</Button>
    </Grid>
    </Grid>

  </Toolbar>
</AppBar>
    

    </Grid>
    <Grid item xs={10}>
    <FormControl fullWidth >
          <InputLabel htmlFor="standard-adornment-amount">First Name</InputLabel>
          <Input
            value={contact.firstName}
            onChange={(e)=>{change("firstName", e.target.value)} }
          />
    </FormControl>
    <div style={{color:"Red", fontSize: "12px"}}>
          {validator.current.message('firstName',contact.firstName, 'required|min:3')}
    </div>
    <FormControl fullWidth>
          <InputLabel htmlFor="standard-adornment-amount">Last Name</InputLabel>
          <Input
            value={contact.lastName}
            onChange={(e)=>{change("lastName", e.target.value)}}
          />
    </FormControl>
    <div style={{color:"Red", fontSize: "12px"}}>

          {validator.current.message('lastName',contact.lastName, 'required|min:3')}
          </div>
    <FormControl fullWidth>
          <InputLabel htmlFor="standard-adornment-amount">Age</InputLabel>
          <Input
            value={contact.age}
            onChange={(e)=>{change("age", e.target.value)}}
          />
    </FormControl>
    <div style={{color:"Red", fontSize: "12px"}}>
            {validator.current.message('age',contact.age, 'required|numeric')}
            </div>

    <img style={{ height: 150,width: 150, objectFit: 'cover'}} src={base64} alt="Nothing here"/>
    <FormControl fullWidth>
    <input type="file" name="image" accept="image/*" onChange={(e)=>image(e)}/>
    </FormControl>


    <FormControl>
    <Button color="inherit"  onClick={()=>{editing(data.id,contact.firstName,  contact.lastName, contact.age ,base64)}}>Submit</Button>

    </FormControl>


    </Grid>
  </Grid>
  );
}

const mapDispatchToProps = dispatch => ({
  editData: (id, newData) => dispatch(editData(id, newData))
});

export default connect(null,mapDispatchToProps)(EditContact);
