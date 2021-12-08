import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Link } from "react-router-dom"
const NavBar = () => {
  const [value, setValue] = useState(() => {
    let url = location.href;
    let tabName = "/favorites"
    let path = url.substring(url.length - tabName.length);

    if (path === "/favorites")
    {
      return 1;
    }
    return 0;
  });

  const handleChange = (_e, newValue) => {
    setValue(newValue);
  };

  return (
    <AppBar position="static" color="transparent" style={{ position: "fixed", top: 0 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Navigation"
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Home" component={Link} to="/" replace index={0} />
        <Tab label="Favorites" component={Link} to="/favorites"  replace index={1} />
      </Tabs>
    </AppBar>
  );
};

export default NavBar;
