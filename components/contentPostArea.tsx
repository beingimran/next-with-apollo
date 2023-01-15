import { useQuery } from "@apollo/client";
import moment from "moment";
import { title } from "process";
import { FETCH_POSTS_QUERY } from "../graphql/queries";
import ContentDeleteBtn from "./contentDeleteBtn";
import GETREPLY from "./contentReplies";

export default function ContentPostArea() {
  const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);
  let post = [];
  if (!loading) {
    post = data?.getPosts;
  }
  const getCurrentDate = (e: String) => {
    const t = new Date(+e);
    const date = moment(t).format("ll");
    return date;
  };
  return (
    <div className="overflow-auto">
      {post.map((index: any) => (
        <div key={index.id} className="p-4 ">
          <div className=" w-3/5 dark:bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4l p-2">
            <div className="flex flex-col divide-y divide-y pb-4">
              <div className="flex flex-row justify-between">
                <div className="flex pb-2 justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-8 h-9 pr-1"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>

                  <div className="pt-2">{index.username}</div>
                </div>
                <div className="text-xs pt-2">
                  Post at:{getCurrentDate(index.postAt)}
                </div>
                <ContentDeleteBtn postId={index.id}/>
              </div>
              <div className="flex flex-col justify-evenly ">
                <div className="pb-4">
                  <div className="p-1 text-lg font-bold">{index.title}</div>
                  <div className=" pr-3 text-xs text-gray-800 italic">
                    {index.category}
                  </div>
                </div>
                <div className=" pt-5 container h-50 bg-white rounded  ">
                  <p className="p-4 text-sm">{index.content}</p>
                </div>
              </div>
              <div className="flex flex-row justify-around pt-4">
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-7 h-9 pr-2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                    />
                  </svg>

                  <div className="pt-1">{index.likes.length}</div>
                </div>

                <div className="text-xs pt-1">
                  Updated At:{getCurrentDate(index.lastActive)}
                </div>
              </div>
            </div>
            <GETREPLY postId={index.id} />
          </div>
        </div>
      ))}
    </div>
  );
}
