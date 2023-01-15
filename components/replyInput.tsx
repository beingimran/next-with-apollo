import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import { create } from "ts-node";
import { REPLY } from "../graphql/mutations";
import { FETCH_REPLIES_QUERY } from "../graphql/queries";

export default function ReplyInput(postId: any) {
  const router = useRouter();

  const [replyInput, setReplyInput] = useState({
    postId: postId.postId.postId,
    content: "",
    authenticated: true,
  });

  const [createReply, { loading, error, data }] = useMutation(REPLY, {
    onCompleted: ({ createReply }) => {
      if (createReply?.status === "201") {
      } else if (createReply?.status === "401") {
        setReplyInput({ ...replyInput, authenticated: false });
      }
    },
    refetchQueries: [
      {
        query: FETCH_REPLIES_QUERY,
        variables: { postId: postId.postId.postId },
      },
    ],
  });
  

  const handleChange = (e: { target: { value: any; name: string } }) => {
    const newReplyInput = { ...replyInput };
    const value = e.target.value;
    // update input value and validity
    if (e.target.name === "content") {
      newReplyInput.content = value;
    }
    // update state
    setReplyInput(newReplyInput);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // debounce and avoid empty input
    if (loading || !replyInput.content) {
      return;
    }

    if (!replyInput.content.trim()) {
      return;
    }

    await createReply({
      variables: {
        replyPostId: postId.postId.postId,
        replyContent: replyInput.content,
      },
    });
    setReplyInput({
      postId: postId.postId.postId,
      content: "",
      authenticated: true,
    });
  };

  if (!replyInput.authenticated) {
    router.push("/post");
  }
  return (
    <form className="mb-6">
      <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <label className="sr-only">Your comment</label>
        <textarea
          id="comment"
          className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
          placeholder="Write a comment..."
          value={replyInput.content}
          name="content"
          onChange={handleChange}
        ></textarea>
      </div>
      <button
        type="submit"
        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
        onClick={handleSubmit}
      >
        Post comment
      </button>
    </form>
  );
}
