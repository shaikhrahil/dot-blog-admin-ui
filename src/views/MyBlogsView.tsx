import {useMutation, useQuery} from '@apollo/client'
import {BookOpen} from '@styled-icons/boxicons-regular/BookOpen'
import {Edit} from '@styled-icons/boxicons-regular/Edit'
import {TrashAlt} from '@styled-icons/boxicons-regular/TrashAlt'
import {BlogCard, Button, Col, Masonry, Modal, Row, Text} from 'components'
import {BlogDto, ModalProps, PaginatedBlogs, QueryMyBlogsArgs} from 'models'
import React, {useCallback, useRef} from 'react'
import {DELETE_BLOG, GET_MY_BLOGS} from 'services'
import shortid from 'shortid'
import styled from 'styled-components'
import {history} from 'utils'
const CardActions = styled.div`
  transition: color 0.2s;
  color: inherit;
  cursor: pointer;
  :hover {
    color: ${(props) => props.theme.secondary};
  }
  text-align: center;
`

export const MyBlogsView = () => {
  const blogArgs: QueryMyBlogsArgs = {
    filters: {
      drafts: true,
      first: 10,
      pageCursor: '',
      published: true,
    },
  }

  const {data, error, loading} = useQuery<{myBlogs: PaginatedBlogs}>(GET_MY_BLOGS, {
    variables: blogArgs,
    onError: (err) => {
      console.error({err})
    },
  })

  const openBlog = useCallback((blog: BlogDto) => {
    history.push(`/blog/${blog.title.toLowerCase().replaceAll(' ', '-')}-${blog._id}`, {blog})
  }, [])

  const editBlog = useCallback((blog: BlogDto) => {
    history.push(`/edit/${blog.title.toLowerCase().replace(' ', '-')}`, {blog})
  }, [])

  const [deleteBlog, deleteBlogReq] = useMutation(DELETE_BLOG, {
    onError: (err) => {
      console.log({err})
    },
  })

  const modalRef = useRef<ModalProps<BlogDto>>(null)

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
          {data?.myBlogs?.data?.edges.map(({node}) => (
            <BlogCard
              key={shortid()}
              blog={node}
              onClick={() => editBlog(node)}
              actionOverlay={
                <Row justify="space-around" align="center" style={{height: '100%'}}>
                  <Col xs={node.cover ? 2 : 0.8}>
                    <CardActions onClick={() => openBlog(node)}>
                      <BookOpen title="View" />
                      <div>View</div>
                    </CardActions>
                  </Col>
                  <Col xs={node.cover ? 2 : 0.8}>
                    <CardActions onClick={() => editBlog(node)}>
                      <Edit title="Edit" />
                      <div>Edit</div>
                    </CardActions>
                  </Col>
                  <Col xs={node.cover ? 2 : 0.8}>
                    <CardActions onClick={() => modalRef.current?.toggle(true, node)}>
                      <TrashAlt title="Delete" />
                      <div>Delete</div>
                    </CardActions>
                  </Col>
                </Row>
              }
            />
          ))}
        </Masonry>

        <Modal ref={modalRef} size="sm">
          <Row justify="center" gutter={['md', 'xl']}>
            <Text level="subtitle">Are you sure you want to delete this blog ? </Text>
            <Row justify="center" gutter={['md', 'md']} style={{width: '100%'}}>
              <Button
                onClick={() => {
                  deleteBlog({variables: {id: modalRef.current?.getData()?._id}})
                }}
                disabled={deleteBlogReq.loading}
              >
                Yes
              </Button>
              <Button
                onClick={() => {
                  modalRef.current?.toggle(false)
                }}
                disabled={deleteBlogReq.loading}
              >
                No
              </Button>
            </Row>
          </Row>
        </Modal>
      </Col>
    </Row>
  )
}
