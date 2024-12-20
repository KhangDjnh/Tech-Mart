import { useEffect, useState } from "react";
import { createComment, getComments, updateComment } from "../../store/actions/commentsProductAction.jsx";
import CommentForm from "./CommentForm.jsx";
import CommentChild from "./Comment.jsx";

const Comments = ({ currentUserId, productID }) => {
    const [comments, setComments] = useState([]);

    const fetchComments = async () => {
        const fetchedComments = await getComments(productID);
        console.log('fetchedComments :', fetchedComments);
        setComments(fetchedComments);
    };

    useEffect(() => {
        fetchComments();
    }, [productID]);

    const addComment = async (text) => {
        const newComment = {
            id_product: productID,
            userId: currentUserId,
            content: text,
            rating : 4.6
        };
        console.log('newComment: ',newComment );
        await createComment(newComment);
        fetchComments()
    };

    const replyComment = async (text, commentId) => {
        const newComment = {
            id_product: productID,
            userId: currentUserId,
            content: text,
            rating : '4.6'
        };
        await updateComment(productID, commentId, newComment);
        fetchComments();
    };

    const getReplies = (commentId) => {
        const comment = comments.find(comment => comment._id === commentId);
        return comment ? comment.subComments : null;
    };

    return (
        <div className="p-4">
            <CommentForm handleSubmit={addComment} submitLabel="Post" />
            <div className="mt-4 space-y-4">
                {comments.map((rootComment) => (
                    <CommentChild
                        key={rootComment._id}
                        comment={rootComment}
                        replies={getReplies(rootComment._id)}
                        currentUserId={currentUserId}
                        replyComment={replyComment}
                        beReply={true}
                    />
                ))}
            </div>
        </div>
    );
};

export default Comments;
