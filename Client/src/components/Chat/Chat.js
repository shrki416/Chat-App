import React from "react";
import Navbar from "../Navbar/Navbar";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { Box, makeStyles } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
// import IconButton from "@material-ui/core/IconButton";
import "./Chat.css";

const defaultProps = {
  bgcolor: "background.paper",
  border: 1,
  borderColor: "text.primary",
};

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      // margin: theme.spacing(1),
      width: "100%",
    },
  },
  center: {
    padding: theme.spacing(3, 2),
    height: "70vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    // gridGap: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1),
    height: "500px",
    textAlign: "center",
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
    // marginBottom: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
}));

const Chat = ({ auth }) => {
  const classes = useStyles();
  return (
    <>
      <Navbar auth={auth} />
      <Paper elevation={0} className={classes.center}>
        <div className={classes.container}>
          <div style={{ gridColumnEnd: "span 2" }}>
            {/* <Paper className={classes.paper}>USERS</Paper> */}
          </div>
          <div style={{ gridColumnEnd: "span 3" }}>
            <Box {...defaultProps} borderRight={0}>
              <Paper elevation={0} className={classes.paper}>
                USERS
              </Paper>
            </Box>
          </div>
          <div style={{ gridColumnEnd: "span 5" }}>
            <Box {...defaultProps} borderLeft={0}>
              <Paper elevation={2} className={classes.paper} border={1}>
                MESSAGES
              </Paper>
            </Box>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                id="filled-basic"
                variant="filled"
                label="Type your message here"
                InputProps={{ endAdornment: <SendIcon /> }}
              />
            </form>
          </div>
          <div style={{ gridColumnEnd: "span 2" }}>
            {/* <Paper className={classes.paper}>USERS</Paper> */}
          </div>
        </div>
      </Paper>
    </>
  );
};

export default Chat;
