import {useQuery} from '@apollo/client'
import {BlogCard, Col, Loader, Masonry, Row, Text} from 'components'
import {BlogDto, PaginatedBlogs, QueryStoriesArgs} from 'models'
import React, {useCallback} from 'react'
import {GET_STORIES} from 'services'
import shortid from 'shortid'
import {blockCenter, history} from 'utils'
import NoDataImg from 'images/no_data.svg'

export const LandingView = () => {
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
      {loading && (
        <Col xs={12} style={{marginTop: data?.stories?.data?.edges.length ? '' : '200px'}}>
          <Loader />
        </Col>
      )}
      {!loading && !data?.stories?.data?.edges.length && (
        <Col xs={12} sm={5}>
          <img src={NoDataImg} width="55%" style={{...blockCenter, marginTop: '100px'}} alt="No Stories Yet !" />
          <Text level="content" align="center" style={{marginTop: '20px'}}>
            No Stories Yet !
          </Text>
        </Col>
      )}
    </Row>
  )
}
