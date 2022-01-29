import Home from "../components/home/home";
import userLogin from "../components/userLogin/userLogin";

const routes = [
  { path: "/login", Component: userLogin },
  { path: "/home", Component: Home },
];

export default routes;
