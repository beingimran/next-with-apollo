import { gql } from "@apollo/client";

const FETCH_POSTS_QUERY = gql`
  query getPosts {
    getPosts {
      id
      title
      content
      username
      postAt
      lastActive
      likes
      category
    }
  }
`;

const FETCH_REPLIES_QUERY = gql`
  query getReplies($postId: String) {
    getReplies(postId: $postId) {
      id
      username
      content
      replyAt
      postId
    }
  }
`;

const FIND_POST_QUERY = gql`
  query findPost($findPostPostId: String) {
    findPost(postId: $findPostPostId) {
      id
      title
      content
      username
      postAt
      lastActive
      likes
    }
  }
`;

const GET_ALL_CATEGORY = gql`
  query GetAllCategory {
    getAllCategory {
      _id
      title
      description
      posts
    }
  }
`;

export { FETCH_POSTS_QUERY, FETCH_REPLIES_QUERY, FIND_POST_QUERY , GET_ALL_CATEGORY};
