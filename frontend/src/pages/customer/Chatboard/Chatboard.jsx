import React, { useEffect } from "react";
import { styled } from "@mui/system";
import CustomersSideBar from "./CustomerSideBar/CustomersSideBar";
import Messenger from "./Messenger/Messenger";
import AppBar from "./AppBar/AppBar";
import { connectWithSocketServer } from "../../../realtimeCommunication/socketConnection";

const Wrapper = styled("div")({
  display: "flex",
});

const Chatboard = () => {
  useEffect(() => {
    const userDetails = localStorage.getItem("token");
    connectWithSocketServer(userDetails);
  }, []);

  return (
    <Wrapper className={'!w-full h-[calc(100vh-200px) !bg-white -m-6 '}>
      <CustomersSideBar />
      <Messenger />
      <AppBar />
    </Wrapper>
  );
};

export default Chatboard;
