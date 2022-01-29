import React from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserLogin from "./components/userLogin/userLogin";
import { updateUserDataUsingToken } from "./redux/actions/userLoginActions";
import routes from "./routes";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(updateUserDataUsingToken());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        {routes.map(({ path, Component }, index) => (
          <Route path={path} element={<Component />} key={`route_${index}`} />
        ))}
        <Route path="*" element={<UserLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
