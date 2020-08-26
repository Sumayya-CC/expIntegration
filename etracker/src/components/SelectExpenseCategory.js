import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import GridList from '@material-ui/core/GridList';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import * as API from '../constants/Api';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import './Style.css';


const useStyles = makeStyles((theme) => ({
   
 drawerPaper:{
  left: '31.5%',
  width: '31.5%',
  //  width:"2420px",
  backgroundColor:"#F35B8C",
   
  },

  root: {
    marginTop:'-40px',

  },
 
  list: {
    width: 421,
    marginTop: 40,
    marginLeft:20,
  },
   
  fullList: {
    width: 'auto',
  },
  
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 350,
    paddingTop: 10,
    marginTop: 20,
    color: "white",
    
    '& label.Mui-focused': {
    color: 'white',
    },
    '& label': {
    color: 'white',
    },
    '& .MuiInput-underline:after': {
    borderBottomColor: 'white',
    },
    '& .MuiInput-underline:before': {
    borderBottomColor: 'white',
    },
    
    '&.Mui-focused fieldset': {
    borderColor: 'white',
    },
    '&& .MuiInput-root:hover::before': {
    borderColor: 'white',
    } 
    },
    
  
  }));
  
  const useStyles1 = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: "hidden",
      alignItems: 'center',
      paddingleft: '10px',
      marginLeft: '10px',
    },
    gridList: {
      // width: 420,
      alignContent: 'center',
      overflow: "scroll",
    },
  }));

  const useStyles2 = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    
    paper: {
      flexDirection:'row',
      marginLeft:"20px",
      marginRight:"10px",
      paddingTop:"35px",
      textAlign:"center",
      position:"justify",
      color:"#F35B8C",
      padding:"5px",
      height:"70px",width:"100px",
      marginBottom:"5px",marginTop:"35px",
      backgroundColor:"#ecc1c1",
      maxWidth: '110px',
      
    },
    
  
  }));

  const useStyles3 = makeStyles((theme) => ({
    root: {
      fontsize:'35px',
      fontfamily: 'Bold 35px/37px source sans pro',
    },
    
    paper: {
      flexDirection:'row',
      marginLeft:"28px",
      marginRight:"10px",
      paddingTop:"35px",
      textAlign:"center",
      position:"justify",
      color:"#F35B8C",
      padding:"5px",
      height:"70px",width:"100px",
      marginBottom:"5px",marginTop:"-16px",
      backgroundColor:"#ecc1c1",
      maxWidth: '110px',
    },
    
  }));
  
  


export default function SelectExpenseCategory(props) {
  const classes = useStyles();
  const classes1 = useStyles1();
  const classes2 = useStyles2();
  const classes3 = useStyles3();
  const [state, setState] = React.useState(false);
  const [open, setOpen] = React.useState(true);
  const [open1, setOpen1] = React.useState(false);
 

  const handleClickCat = (tile) => {
    console.log(tile);
    props.onSelectedCat(tile);
  };

  const handleClickDialog = () => {
    setOpen1(true);
  };

  const handleChange = (event) => {
    setState({ newCategory:event.target.value});
    console.log(state.newCategory);
  };
      


  const handleClose = () => {
    setOpen(false);
    props.onClose();

  };
  
  const handleClose1 = () => {
    setOpen1(false);

  };

  const handleAdd = event => {
    event.preventDefault();
    console.log("Adding");
    axios.post(`http://localhost:8081/tracker/register/addexpensecategory?userId=${props.message}&categoryName=${state.newCategory}`).then(res => {
      console.log("res="+res);
      setOpen1(false);
      setState({ newCategory:'', });    })
  };



  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(API.CAT_LIST_EXPENSE,{ params: {userId:props.message}})
      .then(response  => setData(response.data));
      console.log("success"+data);
  },[]);

  
  const gridList = (
    <div>
      <Drawer classes={{ paper: classes.drawerPaper}}  variant='persistent' 
          anchor='top' open={props.open}  onClose={handleClose}>

        <div className={clsx(classes.list)}
          role="presentation"
          onClick={handleClose}
          onKeyDown={handleClose}>
          
          <GridList cellHeight={160} className={classes1.root} marginLeft='50px' className={classes1.gridList} cols={3}>
            <Grid key="Subheader" cols={3}  style={{ height: 'auto', marginLeft:'15px' }}>
              <Typography style={{ color: 'white', fontsize:"45px", fontfamily: 'Bold 35px/37px source sans pro' }}>Select Category</Typography>
            </Grid>
          {data.map((tile) => (
            <Grid container className={classes.root} direction="column" xs={4} spacing={3} item cols={1}>
              <Grid container direction="column"  justify="center" alignItems="center" item xs={2} spacing={2}> 
                <Paper className={classes2.paper} onClick={()=>handleClickCat(tile)}> 
                  <Typography color= '#F35B8C'> {tile.CATEGORY_NAME} </Typography>
                </Paper>
              </Grid>
            </Grid>
          ))}
      
            <Grid container direction="column"  justify="center" alignItems="center" item xs={4} spacing={4}> 
              <Paper className={classes3.paper} onClick={handleClickDialog}> 
                <Typography color= '#F35B8C'> + New </Typography>
              </Paper>
            </Grid>

          </GridList>

        </div>
      </Drawer>

      <Dialog color='red' open={open1} onClose={handleClose1} maxWidth='sm' aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add new category name here.
          </DialogContentText>
          <TextField autoFocus fullWidth
            margin="dense" label="New Category" name="newCategory"
            id="newCategory" type='text'  
            value={state.newCategory}
            onChange={handleChange}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      
    </div>
  );


  return (
    <div >
        <React.Fragment>
          
          {gridList}

        </React.Fragment>
    </div>
  );
}
