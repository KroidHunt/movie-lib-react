import { LogoutTwoTone } from "@mui/icons-material";
import { Button, Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/userLoginActions";

const LogoutBtn = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Tooltip title="logout" enterDelay={700} enterNextDelay={700}>
      <Button
        variant="text"
        startIcon={<LogoutTwoTone />}
        onClick={handleLogout}
      />
    </Tooltip>
  );
};

export default LogoutBtn;
