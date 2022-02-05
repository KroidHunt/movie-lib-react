import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Typography from "@mui/material/Typography";
import { Tooltip } from "@mui/material";
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  boxShadow: "none",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const TopAppBar = ({ open, handleToggleDrawer }) => {
  return (
    <AppBar position="fixed" color="default">
      <Toolbar>
        <Tooltip
          title={open ? "Shrink Menu" : "Expand Menu"}
          enterDelay={700}
          enterNextDelay={700}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleToggleDrawer}
            edge="start"
            sx={{
              marginRight: "36px",
            }}
          >
            {open ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>
        </Tooltip>
        <Typography variant="h6" noWrap component="div">
          Movie Lib
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopAppBar;
