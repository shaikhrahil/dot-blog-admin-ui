import {useQuery} from '@apollo/client'
import {BlogCard, Col, Masonry, Row} from 'components'
import {BlogDto, PaginatedBlogs, QueryStoriesArgs} from 'models'
import React, {useCallback} from 'react'
import {GET_STORIES} from 'services'
import shortid from 'shortid'
import {history} from 'utils'

export const DashboardView = () => {
  const storiesArgs: QueryStoriesArgs = {
    filters: {
      first: 10,
      pageCursor: '',
    },
  }

  const {data, error, loading} = useQuery<{stories: PaginatedBlogs}>(GET_STORIES, {
    variables: storiesArgs,
    onError: (err) => {
      console.error({err})
    },
  })

  const openBlog = useCallback((blog: BlogDto) => {
    history.push(`/blog/${blog.title.toLowerCase().replaceAll(' ', '-')}-${blog._id}`, {blog})
  }, [])

  return (
    <Row justify="center">
      <Col xs={12} sm={10} lg={8}>
        <Masonry
          breakpointCols={{
            default: 3,
            1100: 3,
            700: 2,
            500: 1,
          }}
          className=""
          columnClassName=""
          style={{display: 'flex'}}
        >
          {data?.stories?.data?.edges.map(({node}) => (
            <BlogCard key={shortid()} blog={node} onClick={() => openBlog(node)} />
          ))}
        </Masonry>
      </Col>
    </Row>
  )
}
