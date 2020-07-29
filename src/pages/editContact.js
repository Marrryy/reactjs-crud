import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  CardContent,Typography,CardMedia, AppBar, Toolbar, 
  Grid, FormControl, Button, Card, CardActions, InputLabel, Input
} from '@material-ui/core';


function PostContact(props) {

  const id = props.location.state.id;
  const data = props.location.state.data;
console.log(props)
const [contact, setContact] = React.useState({
  firstName: "",
  lastname: "",
  age: "",
  photo: ""
});


  const change=(i, v)=> {
    setContact(c => 
      { c[i] = v; 
      return { ...c }; })
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
      Add Contact
    </Typography>
    </Grid>

    <Grid item>

    <Button color="inherit" style={{float:'right'}}  onClick={()=>{props.history.push('/home')}}>Home</Button>
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
    <FormControl fullWidth>
          <InputLabel htmlFor="standard-adornment-amount">Last Name</InputLabel>
          <Input
            value={contact.lastname}
            onChange={(e)=>{change("lastname", e.target.value)}}
          />
    </FormControl>
    <FormControl fullWidth>
          <InputLabel htmlFor="standard-adornment-amount">Age</InputLabel>
          <Input
            value={contact.age}
            onChange={(e)=>{change("age", e.target.value)}}
          />
    </FormControl>
    <FormControl fullWidth>
          <InputLabel htmlFor="standard-adornment-amount">Url Picture</InputLabel>
          <Input
            value={contact.photo}
            onChange={(e)=>{change("photo", e.target.value)}}
          />
    </FormControl>

    <FormControl>
    <Button color="inherit"  onClick={()=>{props.history.push('/home')}}>Submit</Button>

    </FormControl>


    </Grid>
  </Grid>
  );
}

export default PostContact;