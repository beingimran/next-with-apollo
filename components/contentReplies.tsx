import { useQuery } from "@apollo/client";
import { FETCH_REPLIES_QUERY } from "../graphql/queries";
import { FaCaretRight } from "react-icons/fa";
import ReplyInput from "./replyInput";
import moment from "moment";
import ReplyDeleteBtn from "./replyDeletebtn";

export default function GETREPLY(postId: any) {
  const { loading, error, data } = useQuery(FETCH_REPLIES_QUERY, {
    variables: { postId: postId.postId },
  });
  let reply = [];
  if (!loading) {
    reply = data?.getReplies;
  }
  const getCurrentDate = (e: String) => {
    const t = new Date(+e);
    const date = moment(t).format("ll");
    return date;
  };
  return (
    <>
      <section className="bg-white dark:bg-gray-900 py-8 lg:py-16">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
              Discussion ({reply.length})
            </h2>
          </div>
          <ReplyInput postId={postId} />
          {reply.map((index: any) => (
            <div>
              <div className="flex justify-between">
                <div className=" text-gray-500 dark:text-gray-400 mx-3 text-xs">
                  @{index.username}
                </div>
                <div className=" text-gray-500 dark:text-gray-400 mx-3 text-xs">
                  {getCurrentDate(index.replyAt)}
                </div>
              </div>
              <article
                key={index.id}
                className="p-6 mb-6 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900"
              >
                <div className="flex items-center text-gray-500 dark:text-gray-400 mx-3 justify-between">
                  <div className="flex justify-center">
                  <FaCaretRight />
                  
                  <p>{index.content}</p>
                  </div>
                  <ReplyDeleteBtn replyId={index.id} postId={postId.postId}/>
                 
                </div>
              </article>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
