import {gql} from '@apollo/client'

export const ADD_BLOG = gql`
  mutation AddBlog($blog: AddBlog!) {
    addBlog(blog: $blog) {
      success
      message
      data {
        _id
      }
    }
  }
`

export const GET_STORIES = gql`
  query GetStories($filters:GetBlogs!) {
    stories(filters: $filters) {
      success
      message
      data {
        edges {
          node {
            createdAt
            title
            author {
              authId
              name
              profilePic
            }
          }
          cursor
        }
        pageInfo {
          hasNextPage
          length
          hasPerviousPage
          startCursor
          endCursor
        }
      }
    }
  }
`

export const GET_MY_BLOGS = gql`
  query GetBlogs($filters: GetMyBlogs!) {
    myBlogs(filters: $filters) {
      success
      message
      data {
        edges {
          node {
            createdAt
            title
            author {
              authId
              name
              profilePic
            }
          }
          cursor
        }
        pageInfo {
          hasNextPage
          length
          hasPerviousPage
          startCursor
          endCursor
        }
      }
    }
  }
`
