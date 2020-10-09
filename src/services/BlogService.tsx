import {gql} from '@apollo/client'

export const ADD_BLOG = gql`
  mutation AddBlog($blog: AddBlog!) {
    addBlog(blog: $blog) {
      _id
      user
    }
  }
`
