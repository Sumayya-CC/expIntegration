import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import InsertExpense from './InsertExpense';
import InsertIncome from './InsertIncome';
import './Style.css';
import { withStyles } from "@material-ui/core/styles";


//Imported code for fullwidth tabs from material UI


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}


const styles = theme => ({
    root: {
      backgroundColor: '#69B5FF',
      textTransform: 'none',
      font: "Bold 35px/37px source sans pro",

    
    color: "white",
    '&:hover': {
      backgroundColor: '#69B5FF',
      borderColor: '#69B5FF',
      textColor:"white"
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#69B5FF',
      borderColor: '#69B5FF',
      textColor:"white"

    },
    '&:focus': {
      boxShadow: '#69B5FF',
    },

    
     
    },
  });


// class starts here
class FullWidthTabs extends React.Component {
  // constructers
  constructor(props){
  super(props);
  this.state = {

    categoryE:'',
    categoryI:'',
    value:0,
  }
  this.exp = React.createRef()
  this.inc = React.createRef()
}

  handleChange = (event, newValue) => {
    this.setState({value:newValue});
  };

  handleChangeIndex = (index) => {
    this.setState({value:index});
  };

  handleChangeExp = (category) => {
    this.exp.current.handleChange4(category);
    console.log('selected expense category center tab');
  };

  handleChangeInc = (category) => {
    this.inc.current.handleChange4(category);
    console.log('selected income category center tab');
  };

  render() {

    const { classes } = this.props;
    
  return (
    <div >
      <AppBar position="static" color='transparent' >
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="white"
          textColor="white"
          variant="fullWidth"
          aria-label="full width tabs example"
          color ='transparent'
        >
          {/* Tab header names */}
          <Tab className={classes.root} 
            style={{ fontSize: 35, backgroundColor:'#F35B8C', height:100, color:"white", textTransform: 'none', font: "Bold 35px/37px source sans pro", }}
            label="Expense" {...a11yProps(0)} />
          <Tab className={classes.root} label="Income" {...a11yProps(1)} />
        </Tabs>
      </AppBar >
      <SwipeableViews 
        axis={this.props.theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={this.state.value}
        onChangeIndex={this.handleChangeIndex}
        >

          {/* Specifying Tab contents */}
        <TabPanel className="reddiv"  value={this.state.value} index={0} dir={this.props.theme.direction}>
        <InsertExpense message={this.props.message} drawerOpen={this.props.drawerOpenE} 
        handleChangeExp={this.props.handleChange4} ref={this.exp}/>

        </TabPanel>
        <TabPanel className="bluediv"  value={this.state.value} index={1} dir={this.props.theme.direction}>
        <InsertIncome message={this.props.message} drawerOpen={this.props.drawerOpenI} 
        handleChangeInc={this.props.handleChange4} ref={this.inc}/>
        </TabPanel>
      </SwipeableViews>
    </div>
  );}
}
export default withStyles(styles, {withTheme: true})(FullWidthTabs);





// import React from 'react';
// import PropTypes from 'prop-types';
// import SwipeableViews from 'react-swipeable-views';
// import { makeStyles, useTheme } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';
// import InsertExpense from './InsertExpense';
// import InsertIncome from './InsertIncome';
// import './Style.css';
// import { Input, Button } from '@material-ui/core';


// //Imported code for fullwidth tabs from material UI


// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`full-width-tabpanel-${index}`}
//       aria-labelledby={`full-width-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box p={2}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `full-width-tab-${index}`,
//     'aria-controls': `full-width-tabpanel-${index}`,
//   };
// }

// //minor changes in default styles
// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: '#F35B8C',
//     height:100,
//     fontSize:35,
//     color: "white",
//     textTransform: 'none',
//     font: "Bold 35px/37px source sans pro",

   
   
//   },
  
// }));

// const useStyles1 = makeStyles((theme) => ({
//     root: {
//       backgroundColor: '#69B5FF',

//       textTransform: 'none',
//       font: "Bold 35px/37px source sans pro",

    
//     color: "white",
//     '&:hover': {
//       backgroundColor: '#69B5FF',
//       borderColor: '#69B5FF',
//       textColor:"white"
//     },
//     '&:active': {
//       boxShadow: 'none',
//       backgroundColor: '#69B5FF',
//       borderColor: '#69B5FF',
//       textColor:"white"

//     },
//     '&:focus': {
//       boxShadow: '#69B5FF',
//     },

    
     
//     },
//   }));

// export default function FullWidthTabs(props) {

 
//   const classes = useStyles();
//   const classes1 = useStyles1();

//   const theme = useTheme();
//   const [value, setValue] = React.useState(0);
//   const [category, setCat] = React.useState('');
//   const exp = React.useRef();

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const handleChangeIndex = (index) => {
//     setValue(index);
//   };

//   const handleChangeExp = (category) => {
//     setCat(category);
//     console.log(category);
//     exp.current.handleChange4(category);
//   };

//   return (
//     <div >
//       <AppBar position="static" color='transparent' >
//         <Tabs
//           value={value}
//           onChange={handleChange}
//           indicatorColor="white"
//           textColor="white"
//           variant="fullWidth"
//           aria-label="full width tabs example"
//           color ='transparent'
//         >
//           {/* Tab header names */}
//           <Tab className={classes.root}  label="Expense" {...a11yProps(0)} />
//           <Tab className={classes1.root} label="Income" {...a11yProps(1)} />
          
//         </Tabs>
//       </AppBar >
//       <SwipeableViews 
//         axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
//         index={value}
//         onChangeIndex={handleChangeIndex}
//         >

//           {/* Specifying Tab contents */}
//         <TabPanel className="reddiv"  value={value} index={0} dir={theme.direction}>
//         <InsertExpense message={props.message} drawerOpen={props.drawerOpen} 
//         handleChange={props.handleChange4} ref={exp}
//         category={props.category}/>

//         {/* <Button onClick={()=>handleChangeExp(props.category)}> click</Button> */}

//         </TabPanel>
//         <TabPanel className="bluediv"  value={value} index={1} dir={theme.direction}>
//         <InsertIncome message={props.message}/>
//         </TabPanel>
//       </SwipeableViews>
//     </div>
//   );
// }

