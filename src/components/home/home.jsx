import Box from "@mui/material/Box";
import React from "react";
import Nav, { DrawerHeader } from "./nav";
import Redirect from "../common/redirect";
import { CssBaseline } from "@mui/material";
import TopAppBar from "./appBar";

const Home = () => {
  const [open, setOpen] = React.useState(false);

  const handleToggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Redirect>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <TopAppBar open={open} handleToggleDrawer={handleToggleDrawer} />
        <Nav open={open} />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          Hey
        </Box>
      </Box>
    </Redirect>
  );
};

export default Home;
