import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";

import { FileDataContext } from "../App";
import ChartLayout from "./ChartLayout";

const style = makeStyles(() => ({
  chart: {
    width: "100%",
    textAlign: "center",
    overflow: "hidden",
  },
  icon: {
    fontSize: 35,
    marginBottom: "-6px",
  },
  backText: {
    color: "#d3d4d9",
    fontSize: "60px",
    padding: "50px",
  },
}));

function Main() {
  const classes = style();
  return (
    <div className={classes.chart}>
      <Toolbar />

      <FileDataContext.Consumer>
        {({ data }) => {
          return data === "File raw data" ? (
            <Typography className={classes.backText}>
              {" "}
              <BubbleChartIcon
                className={classes.icon}
                style={{ fontSize: "80px" }}
              />{" "}
              Data Visualization
            </Typography>
          ) : (
            <ChartLayout data={data} />
          );
        }}
      </FileDataContext.Consumer>
    </div>
  );
}

export default Main;
