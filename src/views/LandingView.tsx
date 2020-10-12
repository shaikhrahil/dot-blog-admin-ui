import {useQuery} from '@apollo/client'
import {Col, Loader, Row, Text} from 'components'
import {BlogList} from 'components/BlogList'
import NoDataImg from 'images/empty_street.svg'
import produce from 'immer'
import {BlogDto, PaginatedBlogs, QueryStoriesArgs} from 'models'
import React, {useCallback, useEffect, useMemo} from 'react'
import {GET_STORIES} from 'services'
import {blockCenter, history} from 'utils'
// const options = {
//   root: null,
//   rootMargin: '0px',
//   threshold: 1.0,
// }

const storiesArgs: QueryStoriesArgs = {
  filters: {
    first: 10,
    pageCursor: '',
  },
}

export const LandingView = () => {
  const {data, error, fetchMore, loading} = useQuery<{stories: PaginatedBlogs}>(GET_STORIES, {
    variables: storiesArgs,
    notifyOnNetworkStatusChange: true,
    onError: (err) => {
      console.error({err})
    },
  })

  const openBlog = useCallback((blog: BlogDto) => {
    history.push(`/blog/${blog.title.toLowerCase().replaceAll(' ', '-')}-${blog._id}`, {blog})
  }, [])

  const loadMore = useCallback(() => {
    storiesArgs.filters.pageCursor = data?.stories?.data?.pageInfo.endCursor || ''
    fetchMore({
      variables: storiesArgs,
      updateQuery: (prev, {fetchMoreResult}) => {
        if (!fetchMoreResult?.stories.success) return prev
        const res = produce(fetchMoreResult, (draft) => {
          draft!.stories.data!.edges.unshift(...(prev.stories?.data?.edges || []))
        })
        return res!.stories.data ? res! : prev
      },
    })
  }, [data?.stories?.data?.pageInfo.endCursor])

  // useEffect(() => {
  //   window.onscroll = () => {
  //     if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
  //       storiesArgs.filters.pageCursor = data?.stories?.data?.pageInfo.endCursor || ''
  //       console.log(storiesArgs)
  //       if (data?.stories.data?.pageInfo.endCursor) fetchMore({variables: storiesArgs})
  //     }
  //   }

  //   return () => {
  //     window.onscroll = null
  //   }
  // }, [data?.stories?.data?.pageInfo.endCursor])

  return useMemo(() => {
    return (
      <Row justify="center">
        <Col xs={12} sm={10} lg={8}>
          <BlogList nodes={data?.stories.data?.edges || []} openBlog={openBlog} loadMore={loadMore} />
        </Col>

        {!loading && !data?.stories?.data?.edges.length && (
          <Col xs={12} sm={5}>
            <img src={NoDataImg} width="55%" style={{...blockCenter, marginTop: '100px'}} alt="No Stories Yet !" />
            <Text level="content" align="center" style={{marginTop: '20px'}}>
              No Stories Yet !
            </Text>
          </Col>
        )}

        {loading && (
          <Col xs={12} style={{marginTop: data?.stories?.data?.edges.length ? '' : '200px'}}>
            <Loader />
          </Col>
        )}
      </Row>
    )
  }, [data?.stories.data?.edges.length])
}
