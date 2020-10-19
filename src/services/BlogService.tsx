import {gql} from '@apollo/client'

export const GET_STORIES = gql`
  query GetStories($filters: GetBlogs!) {
    stories(filters: $filters) {
      success
      message
      data {
        edges {
          node {
            _id
            createdAt
            title
            cover
            subtitle
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

export const GET_STORY = gql`
  query GetMyBlog($id: String!) {
    story(id: $id) {
      success
      message
      data {
        _id
        author {
          authId
          name
          profilePic
        }
        title
        subtitle
        cover
        published
        sections
        comments {
          _id
          text
        }
        createdAt
        updatedAt
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
            _id
            createdAt
            title
            subtitle
            cover
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

export const GET_MY_BLOG = gql`
  query GetMyBlog($id: String!) {
    story: myBlog(id: $id) {
      success
      message
      data {
        _id
        author {
          authId
          name
          profilePic
        }
        title
        subtitle
        cover
        published
        sections
        comments {
          _id
          text
        }
        createdAt
        updatedAt
      }
    }
  }
`

export const ADD_BLOG = gql`
  mutation AddBlog($blog: AddBlog!) {
    addBlog(blog: $blog) {
      success
      message
      data {
        _id
        title
      }
    }
  }
`

export const UPDATE_BLOG = gql`
  mutation UpdateBlog($blog: UpdateBlog!) {
    updateBlog(blog: $blog) {
      success
      message
      data {
        _id
        title
      }
    }
  }
`

export const DELETE_BLOG = gql`
  mutation DeleteBlog($id: String!) {
    deleteBlog(blogId: $id) {
      success
      message
      data {
        _id
        title
      }
    }
  }
`
