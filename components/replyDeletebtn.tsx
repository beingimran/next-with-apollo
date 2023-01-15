import { useMutation } from "@apollo/client";
import { useState } from "react";
import { DELETE_REPLY } from "../graphql/mutations";
import { FETCH_REPLIES_QUERY } from "../graphql/queries";

export default function ReplyDeleteBtn(replyId:any){
    console.log(replyId.postId)
    const [deleted, setDeleted]= useState({});

    const [deleteReply, { loading, error }] = useMutation(DELETE_REPLY, {
        variables: { deleteReplyReplyId: replyId.replyId },
        onCompleted: ({ deletePost }) => {
            if(deletePost?.status === '401' || deletePost?.status === '403'){
                // rejected, not logged in, or user doesn't have authority (not author, if user changed username in localstorage)
               
            }else if(deletePost?.status === '404'){
                // post doesn't exist anymore, shouldn't happen if database isn't directly touched.
            }else if(deletePost?.status === '204'){
                // Successful
                setDeleted(true);
            }
        },
        refetchQueries: [
            {
              query: FETCH_REPLIES_QUERY,
              variables: { postId:replyId.postId},
            },
          ],
    });
    
    const handleClick = async () => {
        // debounce
        if(loading){
            return;
        }

        await deleteReply();
    };

    return(
        <>
        <button className="text-white" onClick={handleClick}>delete</button>
        </>
    );
}