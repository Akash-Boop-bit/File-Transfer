import React, { useEffect } from "react";
import classes from "./Home.module.css";


const Home = () => {
  
  return (
    <div className={classes.main}>
      <h1 className={classes.head}>P2P file Transfer</h1>
      <div className={classes.main1}>
        <h2 className={classes.head2}>Team Members</h2>
        <div className={classes.main2}>
          <p className={classes.para}>GOKUL R </p>
          <p className={classes.para}>113120UG07030</p>
          <br></br>
          <p className={classes.para}>LOKESH Y</p>
          <p className={classes.para}>113120UG07056</p>
          <br></br>
          <p className={classes.para}>SARAVANAN S</p>
          <p className={classes.para}>113120UG07086</p>
          <br></br>
          <p className={classes.para}>PRADEESH KUMAR R</p>
          <p className={classes.para}>113120UG07071</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
