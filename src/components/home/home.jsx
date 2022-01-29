import React from "react";
import LogoutBtn from "../common/logoutBtn";
import Redirect from "../common/redirect";

const Home = () => {
  return (
    <Redirect>
      <h1>HOME PAGE BRUH</h1>
      <LogoutBtn />
    </Redirect>
  );
};

export default Home;
