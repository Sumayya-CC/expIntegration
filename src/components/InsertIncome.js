import React from "react";
import axios from 'axios';
import {TextField,Button} from '@material-ui/core/';
import './Style.css';
import { withStyles } from "@material-ui/core/styles";
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';
 
 
 
var date = new Date();
var moment = require('moment');
var dateIn = moment(date);
var formatedDate=dateIn.format("YYYY-MM-DD");
 
 
//Adding js styles
const styles = theme => (
    {
    container: {
        display: 'flex',    
        flexWrap: 'wrap',
    },
    datepickerx:{
        width: 120,
        underline: {
            "&&&:before": {
            color: "white"
            },
            "&&:after": {
            color: "white"
            }
            },
            '&& .MuiInput-root:hover::before': {
                borderColor: 'white',
            },
            '& .MuiInput-input':{ color: "white"},
            paddingLeft: 75,
            color: "white",
            textEmphasisColor: "white",
            '& .MuiInput-underline:before': {
            borderBottomColor: "white",
            '& .MuiInput-underline:after': {
                borderBottomColor: 'white',
            },
            '& .MuiInput-underline:before': {
                borderBottomColor: 'white',
            },
            multilineColor:{
                color:'white'
            },
            '& label.Mui-focused': {
                color: 'white',
            },
            '& label': {
                color: 'white',
            },
            '&:hover fieldset': {
                borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'white',
            },
            
            
            },
        },
    Button:{
    
        background: 'grey',
        border: 0,
        borderRadius: 3,
        color: "white",
        width:350,
        height: 50,
        marginTop: 50,
        textTransform: 'none',
        backgroundColor: '#37364b',
        borderColor: '#007bff',
        // borderRadius: 10,
        '&:hover': {
        backgroundColor: 'black',
        borderColor: '#0062cc',
        },
        '&:active': {
        boxShadow: 'none',
        backgroundColor: 'black',
        borderColor: '#005cbf',
        
        },
        '&:focus': {
        boxShadow: 'black',
        },
        
        
    },

    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
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
    
  });
    
 
    //Included with material ui code for Numberbox
    function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;
    
      return (
        <NumberFormat
          {...other}
          getInputRef={inputRef}
          onValueChange={values => {
          onChange({
            target: {
              value: values.value,
            },
          });
          }}
          thousandSeparator
          prefix="₹"
        />
      );
    }
    
    NumberFormatCustom.propTypes = {
      inputRef: PropTypes.func.isRequired,
      onChange: PropTypes.func.isRequired,
    };




  // class starts here
  class InsertIncome extends React.Component {
    // constructers
    constructor(props){
    super(props);
    this.state = {
    date:formatedDate,
    item:'',
    amount:'',
    category:'',
    catId:'',
    catName:'',
    drawer: false,
    cat:'',
  }
}
 
 
  //functions for various Onchange events
 
  handleClose = () => {
    this.setState({ open: false });
  };
 
  handleChange1 = event => {
    this.setState({ date: event.target.value });
    console.log(this.state.date);
  }

  handleChange2 = event => {
    this.setState({ item: event.target.value });
    console.log(this.state.item);
    console.log("----------------",this.state.ProductData);
  }

  handleChange3 = event => {
    this.setState({ amount: event.target.value });
    console.log(this.state.amount);
    
  }
 
  handleChange4 = (category)  => {
    this.setState({ catId: category.ID });
    this.setState({ catName: category.CATEGORY_NAME });
    console.log(this.state.catId);
    console.log('category selected insert income');
 
  }

  drawerOp = () => {
    this.props.drawerOpen();
    console.log('drawer');
  }
  
 
  //Function to handle submit event
  handleSubmit = event => {
    
    event.preventDefault();
    console.log("adding income");
    axios.post(`http://localhost:8081/tracker/register/addincome?userId=${this.props.message}&item=${this.state.item}&categoryId=${this.state.catId}&amount=${this.state.amount}&transactionDate=${this.state.date}`).then(res => {
      console.log("res="+res);
      this.setState({ open: true,amount:'',item:'',catId:'',catName:'',date:formatedDate });    })
  }
 
  render() {
 
 
    const { classes } = this.props;

    
    return (
      
      <div class="textdiv">
        {/* form starts here */}
        <form onSubmit={this.handleSubmit} >
       

            {/* Datepicker */}
            <label className="labelclass"> 
              Date            
              <TextField
                onChange={this.handleChange1}
                name="date" 
                type="date"
                value={this.state.date}
                className={classes.datepickerx}
                required/>
              <CalendarTodayIcon style={{ fontSize: 25, paddingLeft:75 }} />
            </label>
 

            {/* Item Field */}
            <TextField 
              required
              InputLabelProps={{required: false}}  
              className={classes.textField} 
              label="Item" 
              name="item" 
              required
              value={this.state.item}
              onChange={this.handleChange2}/>

      
            {/* Amount field */}
            <TextField
              className={classes.textField}
              label="Amount"
              required
              InputLabelProps={{required: false}}  
              name="amount"
              required
              value={this.state.amount}
              onChange={this.handleChange3}
              InputProps={{
                inputComponent: NumberFormatCustom,
              }}
        />
            {/* Category field */}
            <TextField label="Category" name='category' id='category'
              required InputLabelProps={{required:false}} value={this.state.catName}          
              className={classes.textField} onClick={this.drawerOp}/>
            
 
            {/* Submit button */}
 
            <div> 
             <Button className={classes.Button}  variant="contained" disableElevation type="submit">
                  Add Income
             </Button>
              <Snackbar
                  open={this.state.open}
                  onClose={this.handleClose}
                  TransitionComponent={Fade}
                  autoHideDuration={1000}
                  variant="success"
                  message={<span  id="message-id">Income Insertion Successful</span>}
            /> 
           </div>
 
          
        </form>
      </div>
    )
  }
}
export default withStyles(styles)(InsertIncome);

