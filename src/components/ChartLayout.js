import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";


import Chart from "./Chart";

const style = makeStyles(() => ({
  chartContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "15px",
  },
}));

const TabPanel = (props) => {
  const { value, index, child } = props;

  return (
    <div hidden={value !== index} style={{ width: "100%" }}>
      {child}
    </div>
  );
};

function ChartLayout(props) {
  const [value, setValue] = useState(0);
  const [xData, setXData] = useState([]);
  const [yData, setYData] = useState([]);
  const classes = style();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    const clearData = props.data.replace(/^\s+|\s+$/g, "");
    const line = clearData.split("\n");
    const x = line.map((el) => el.split(",")[0]);
    const y = line.map((el) => el.split(",")[1]);
    setXData(x);
    setYData(y);
  }, [props.data]);

  return (
    <React.Fragment>
      <Paper square>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="tabs"
          variant="scrollable"
          scrollButtons="on"
        >
          <Tab label="Line" />
          <Tab label="Bar" />
          <Tab label="Area" />
          <Tab label="Horizontal Bar" />
          <Tab label="Radar" />
        </Tabs>
      </Paper>

      <div className={classes.chartContainer}>
        <TabPanel
          value={value}
          index={0}
          child={<Chart x={xData} y={yData} type="line" />}
        />

        <TabPanel
          value={value}
          index={1}
          child={<Chart x={xData} y={yData} type="bar" />}
        />
        <TabPanel
          value={value}
          index={2}
          child={<Chart x={xData} y={yData} type="area" />}
        />
        <TabPanel
          value={value}
          index={3}
          child={<Chart x={xData} y={yData} type="horizontalBar" />}
        />
        <TabPanel
          value={value}
          index={4}
          child={<Chart x={xData} y={yData} type="radar" />}
        />
      </div>
    </React.Fragment>
  );
}

export default ChartLayout;
