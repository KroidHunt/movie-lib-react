import { LogoutTwoTone } from "@mui/icons-material";
import { Tooltip, Avatar } from "@mui/material";
import { red } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/userLoginActions";

const LogoutBtn = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Tooltip title="logout" enterDelay={700} enterNextDelay={700}>
      <Avatar
        onClick={handleLogout}
        sx={{ cursor: "pointer", bgcolor: red[400] }}
      >
        <LogoutTwoTone />
      </Avatar>
    </Tooltip>
  );
};

export default LogoutBtn;
