import {useQuery} from '@apollo/client'
import {useAuth0} from '@auth0/auth0-react'
import {Col, Row} from 'components'
import {EditorBlockConfig} from 'editor/EditorBlockConfig'
import {Blog, BlogDto, EditorBlock, QueryStoryArgs} from 'models'
import React from 'react'
import {useLocation} from 'react-router-dom'
import {GET_MY_BLOG, GET_STORY} from 'services'
import shortid from 'shortid'
import 'styles/editor.scss'

export const BlogView = () => {
  const location = useLocation<{blog: BlogDto}>()

  const blogParams: QueryStoryArgs = {
    id: location.state.blog._id,
  }

  const {isAuthenticated} = useAuth0()

  const {data} = useQuery<{story: Blog}>(isAuthenticated ? GET_MY_BLOG : GET_STORY, {
    variables: blogParams,
    onError: (err) => {
      console.error({err})
    },
  })

  const sections = data?.story?.data?.sections ? JSON.parse(data?.story?.data?.sections) : []
  return (
    <Row id="blogViewSection" direction="column" align="center" justify="center">
      {sections.map((x: EditorBlock) => {
        const props = x.data
        const Component = EditorBlockConfig[x.type]
        return props.stretched ? (
          <Col key={shortid()}>
            <Component {...props} />
          </Col>
        ) : (
          <Col xs={10} md={6} key={shortid()}>
            <Component {...props} />
          </Col>
        )
      })}
    </Row>
  )
}
