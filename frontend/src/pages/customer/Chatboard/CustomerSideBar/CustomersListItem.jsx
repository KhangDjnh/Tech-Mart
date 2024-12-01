import React from "react";
import Button from "@mui/material/Button";
// import Avatar from "../../../../component/Avatar";
import Typography from "@mui/material/Typography";
import { chatTypes, getActions } from "../../../../store/actions/chatAction.js";
import { connect } from "react-redux";
import OnlineIndicator from "./OnlineIndicator";
import {Avatar} from "@mui/material";
import {stringAvatar} from "../../../../utils/avatarAbout.js";

const CustomersListItem = ({ id, name, isOnline, setChosenChatDetails }) => {
  const handleChooseActiveConversation = () => {
    setChosenChatDetails({ id: id, name: name }, chatTypes.DIRECT);
  };

  return (
    <Button
      onClick={handleChooseActiveConversation}
      style={{
        width: "100%",
        height: "42px",
        marginTop: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        textTransform: "none",
        color: "black",
        position: "relative",
      }}
    >
      <Avatar  {...stringAvatar(name)} className={'!w-10 !h-10'} />
      <Typography
        style={{
          marginLeft: "4px",
          fontWeight: 500,
          color: "#8e9297",
        }}
        variant="subtitle1"
        align="left"
      >
        {name}
      </Typography>
      {isOnline && <OnlineIndicator />}
    </Button>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(CustomersListItem);
