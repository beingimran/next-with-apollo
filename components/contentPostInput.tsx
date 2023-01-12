import { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../graphql/mutations";
import SelectField from "./selectfeild";

export default function ContentPostInput() {
  const router = useRouter();

  const [postInput, setPostInput] = useState({
    title: "",
    content: "",
    category: "",
    authenticated: true,
  });

  const [createPost, { loading, error, data }] = useMutation(CREATE_POST, {
    onCompleted: ({ createPost }) => {
        console.log(createPost);
      if (createPost?.status === "201") {
        console.log("created");
      } else if (createPost?.status === "401") {
        // Rejected, not authenticated
        setPostInput({ ...postInput, authenticated: false });
      }
    }
  });
  const handleChange = (e: { target: { value: any; name: string } }) => {
    const newPostInput = { ...postInput };
    const value = e.target.value;
    console.log(e.target.name);
    // update input value and validity
    if (e.target.name === "title") {
      newPostInput.title = value;
    } else if (e.target.name === "content") {
      newPostInput.content = value;
      
    } else {
      newPostInput.category = value;
    }

    // update state
    setPostInput(newPostInput); 
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // debounce and avoid empty input
    if (
      loading ||
      !postInput.title ||
      !postInput.content ||
      !postInput.category
    ) {
      return;
    }

    if (
      !postInput.title.trim() ||
      !postInput.content.trim() ||
      !postInput.category.trim()
    ) {
      return;
    }

    await createPost({
      variables: {
        createPostPostInput: {
          title: postInput.title,
          content: postInput.content,
          category: postInput.category,
        },
      },
    });
  };

  if (!postInput.authenticated) {
    router.push("/post");
  }

  return (
    <div>
      <form className="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="text-center pb-4 text-lg">Create Post</div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <input
              type="title"
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Title"
              name="title"
              value= {postInput.title}
              onChange={handleChange}
            />
          </div>
          <SelectField onChange={handleChange}/>
          <div className="flex flex-wrap mb-6 pt-4 w-full">
            <div className="w-full px-3">
              <div className="mb-6">
                <textarea
                  id="large-input"
                  placeholder="Content"
                  name="content"
                  value= {postInput.content}
                  className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="text-center pt-1 mb-12 pb-1">
          <button
            className="bg-green inline-block px-6 py-2.5 text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
            type="button"
              onClick={handleSubmit}
          >
            Create Post
          </button>
          <p></p>
        </div>
      </form>
    </div>
  );
}
