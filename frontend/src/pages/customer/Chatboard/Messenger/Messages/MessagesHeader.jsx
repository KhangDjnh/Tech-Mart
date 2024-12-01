import React from "react";
import { styled } from "@mui/system";
// import Avatar from "../../../../../component/Avatar";
import Typography from "@mui/material/Typography";
import {stringAvatar} from "../../../../../utils/avatarAbout.js";
import {Avatar} from "@mui/material";

const MainContainer = styled("div")({
  width: "98%",
  display: "column",
  marginTop: "10px",
});

const MessagesHeader = ({ name = "" }) => {
  return (
    <MainContainer >
     <div className={'flex items-center '}>
         <Avatar   {...stringAvatar(name)} className={'!w-16 !h-16'}/>
         <Typography
             variant="h6"
             sx={{
                 fontWeight: "bold",
                 color: "black",
                 marginLeft: "20px",
                 marginRight: "5px",
             }}
         >
             {name}
         </Typography>
     </div>
      <Typography
        sx={{
          color: "#b9bbbe",
          marginTop: "10px",

        }}
      >
        This is the beginning of your conversation with {name}
      </Typography>
    </MainContainer>
  );
};

export default MessagesHeader;
