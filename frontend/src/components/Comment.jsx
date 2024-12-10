import React, {useEffect, useState} from 'react';
import Comments from "./comments/Comments.jsx";

function Comment({productID}) {
    const {userDetails} = JSON.parse(localStorage.getItem('session'))
    console.log('userDetails: ', userDetails)
    return (
        <div>
            <Comments currentUserId={userDetails._id} productID={productID} />
        </div>
    );
}

export default Comment;