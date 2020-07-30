import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getData, deleteData } from '../actions/contact';
import {
  CardContent,Typography, AppBar, Toolbar, 
  Grid, Button, Card, CardActions
} from '@material-ui/core';

function ListContact(props) {
  useEffect(() => {
    props.getData();
  }, []);
  
  const deleting =async(id) =>{
    if (window.confirm("Delete the item?")) {
    await props.deleteData(id);
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
      spacing={4}
    >
    <Grid item>
    <Typography variant="h5" component="h2">
      List Contact
    </Typography>
    </Grid>

    <Grid item>

    <Button color="inherit" style={{float:'right'}}  onClick={()=>{props.history.push('/add')}}>Add</Button>
    </Grid>
    </Grid>

  </Toolbar>
</AppBar>
    

    </Grid>
    <Grid item xs={10}>

    {
      props.contacts && props.contacts.data.map((data, i) =>
      {
        let urlphoto = "";
        if(data.photo === "N/A"){
          urlphoto= "../../public/no-image.jpg"
        }else{
          urlphoto=data.photo
        }
        return (
      <Card key={i} style={{width:'100%', margin:20}}>
      <Grid container justify="center" alignItems="center">
      <Grid item xs={3}>
      <CardContent>
      
      <img style={{ height: 150,width: 150, objectFit: 'cover'}}  src={urlphoto} alt="Nothing here"/>

      </CardContent>
          
      </Grid>
      <Grid item xs={6}>
      <CardContent>
          <Typography variant="h5" component="h2">
          {data.firstName} {data.lastName}
          </Typography>
          <Typography  color="textSecondary">
          Age {data.age}
          </Typography>
        </CardContent>
        <CardActions>
        <Button size="small" onClick={()=>{props.history.push('/edit',{ id:data.id, data })}}>Edit</Button>
        <Button size="small" onClick={()=>{deleting(data.id);}}>Delete</Button>
      </CardActions>
      </Grid>
      </Grid>
  
  
      </Card>
      );}
      )
    }

    </Grid>
  </Grid>
  );
}

const mapStateToProps = ({ data }) => {
  return { contacts : data.contacts }
};
const mapDispatchToProps = dispatch => ({
  getData: () => dispatch(getData()),
  deleteData: (id) => dispatch(deleteData(id))
  
});
export default connect(mapStateToProps, mapDispatchToProps)(ListContact);
