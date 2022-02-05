import React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector } from "react-redux";
import { Avatar, capitalize, ListItemAvatar, Tooltip } from "@mui/material";
import { blue } from "@mui/material/colors";
import LogoutBtn from "../common/logoutBtn";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Nav = ({ open }) => {
  const userDP = useSelector((state) => state.user.dp);
  const firstName = useSelector((state) => state.user.first_name);

  const listItems = [
    {
      text: firstName ? capitalize(firstName) : "Profile",
      icon: userDP ? <img src={userDP} alt="profile" /> : <AccountCircleIcon />,
      isComponent: false,
      tipLabel: "Profile",
      color: blue[400],
    },
    {
      isComponent: true,
      component: <LogoutBtn />,
      text: "Logout",
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader />
        <Divider />
        <List>
          {listItems.map(
            ({ text, icon, isComponent, component, tipLabel, color }, index) =>
              isComponent ? (
                <ListItem button key={text + index}>
                  <ListItemAvatar>{component}</ListItemAvatar>
                  <ListItemText primary={text} />
                </ListItem>
              ) : (
                <ListItem button key={text + index}>
                  <ListItemAvatar>
                    <Tooltip
                      title={tipLabel}
                      enterDelay={700}
                      enterNextDelay={700}
                    >
                      <Avatar sx={{ bgcolor: color }}>{icon}</Avatar>
                    </Tooltip>
                  </ListItemAvatar>
                  <ListItemText primary={text} secondary="Jan 7, 2014" />
                </ListItem>
              )
          )}
        </List>
      </Drawer>
    </Box>
  );
};

export default Nav;
