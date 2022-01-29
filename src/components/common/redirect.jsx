import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Redirect = ({ children, to = "/index", ifSignedIn = false }) => {
  const isSignedIn = useSelector((state) => state.user.signed_in);
  const [redirect, setRedirect] = React.useState(false);

  React.useEffect(() => {
    if (ifSignedIn && isSignedIn) {
      setRedirect(true);
    } else if (!ifSignedIn && !isSignedIn) {
      setRedirect(true);
    }
  }, [isSignedIn, ifSignedIn]);

  return redirect ? <Navigate to={to} /> : children;
};

export default Redirect;
