import { useMutation } from "@apollo/client";
import { useState } from "react";
import { DELETE_POST } from "../graphql/mutations";
import { FETCH_POSTS_QUERY } from "../graphql/queries";

export default function ContentDeleteBtn(postId:any){
    const [deleted, setDeleted]= useState({});

    const [deletePost, { loading, error }] = useMutation(DELETE_POST, {
        variables: { deletePostPostId: postId.postId },
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
        refetchQueries:[{query:FETCH_POSTS_QUERY}]
    });
    
    const handleClick = async () => {
        // debounce
        if(loading){
            return;
        }

        await deletePost();
    };

    return(
        <>
        <button className="bg-white rounded p-2 hover:bg-black hover:text-white"  onClick={handleClick}>Delete post</button>
        </>
    );


}