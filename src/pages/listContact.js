import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getData } from '../actions/contact';
import {
  CardContent,Typography,CardMedia, AppBar, Toolbar, 
  Grid, FormControl, Button, Card, CardActions
} from '@material-ui/core';

function ListContact(props) {
  useEffect(() => {
    props.getData();
  }, []);
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
      <Card key={i} style={{width:'100%', margin:20}}>
      <Grid container justify="center" alignItems="center">
      <Grid item xs={3}>
      <CardMedia style={{width: 100}}
          image={data.photo}
          title="Paella dish"
        />
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
        <Button size="small" onClick={()=>{}}>Delete</Button>
      </CardActions>
      </Grid>
      </Grid>
  
  
      </Card>
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
  getData: () => dispatch(getData())
});
export default connect(mapStateToProps, mapDispatchToProps)(ListContact);