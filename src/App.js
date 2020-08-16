import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Side from "./components/Side.js";
import Main from "./components/Main.js";

const style = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
    
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  icon: {
    fontSize: 35,
    marginBottom: "-6px",
  },
}));

export const FileDataContext = React.createContext({
  data: "default",
  getData: () => {},
});

export function App() {
  const [data, setData] = useState("File raw data");
  const classes = style();

  const Header = (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h5" noWrap>
          <BubbleChartIcon className={classes.icon} /> Data Visualization
        </Typography>
      </Toolbar>
    </AppBar>
  );
  
  const getData = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = () => {
      console.log(reader.result);
      setData(reader.result);
    };
    e.target.value = null;
  };

  return (
    <div className={classes.root}>
      {Header}
      <FileDataContext.Provider value={{ data, getData }}>
        <Side />
        <Main />
      </FileDataContext.Provider>
    </div>
  );
}


