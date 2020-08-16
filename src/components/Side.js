import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

import { FileDataContext } from "../App";
import Panel from "./Panel.js";
import { Typography } from "@material-ui/core";

const style = makeStyles((theme) => ({
  drawer: { width: 350, flexShrink: 0 },
  drawerPaper: {
    width: 350,
    backgroundColor: "#eeeff1",
  },
  drawerDiv: {
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
}));

function Side() {
  const classes = style();

  const sampleText = (
    <Typography style={{ color: "#95a5a6" }}>
      (.csv format) <br /> xValue,yValue <br /> value1,value2 <br />{" "}
      value3,value4
      <br /> value5,value6{" "}
    </Typography>
  );

  return (
    <Drawer
      variant="permanent"
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerDiv}>
        <Typography variant="h6" style={{marginBottom:"15px"}} >A Data Visualization application for .csv file </Typography>
        <Panel hg={35} title="File Format" data={sampleText} />

        <FileDataContext.Consumer>
          {({ data, getData }) => {
            return (
              <input
                accept=".csv"
                style={{ display: "none" }}
                type="file"
                id="file-input"
                onChange={(e) => getData(e)}
              />
            );
          }}
        </FileDataContext.Consumer>

        <label htmlFor="file-input" style={{ margin: "20px 0px" }}>
          <Button
            variant="contained"
            color="primary"
            component="span"
            size="small"
          >
            Upload File
          </Button>
              </label>
              <FileDataContext.Consumer>
                  {({data}) => {
                      return (
                        <Panel
                          hg={45}
                          title="Raw data"
                          data={data}
                        />
                      ); 
              }}
              </FileDataContext.Consumer>  
       
      
          </div>
    </Drawer>
  );
}

export default Side;
