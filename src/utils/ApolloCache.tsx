import {InMemoryCache} from '@apollo/client'
import produce from 'immer'
import {PaginatedBlogs} from 'models'

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        stories: {
          keyArgs: false,
          merge: (prev: PaginatedBlogs, incoming: PaginatedBlogs) => {
            if (!incoming) return prev
            if (!incoming.data) return prev
            const res = produce(incoming, (draftState) => {
              draftState.data?.edges.unshift(...(prev?.data?.edges || []))
            })
            return res
          },
        },
        myBlogs: {
          keyArgs: false,
          merge: (prev: PaginatedBlogs, incoming: PaginatedBlogs) => {
            // if (!incoming) return prev
            // if (!incoming.data) return prev
            // const res = produce(incoming, (draftState) => {
            //   draftState.data?.edges.unshift(...(prev?.data?.edges || []))
            // })
            return incoming
          },
        },
      },
    },
  },
})
