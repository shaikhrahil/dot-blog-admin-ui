import {useMutation, useQuery} from '@apollo/client'
import {BookOpen, Edit, TrashAlt} from '@styled-icons/boxicons-regular'
import {Button, Col, Loader, Modal, Row, Text} from 'components'
import {BlogList} from 'components/BlogList'
import {useToast} from 'hooks/useToast'
import NoDataImg from 'images/no_data.svg'
import produce from 'immer'
import {BlogDto, ModalProps, PaginatedBlogs, QueryMyBlogsArgs} from 'models'
import React, {useCallback, useRef} from 'react'
import {DELETE_BLOG, GET_MY_BLOGS} from 'services'
import styled from 'styled-components'
import {blockCenter, history} from 'utils'
const CardActions = styled.div`
  transition: color 0.2s;
  color: inherit;
  cursor: pointer;
  :hover {
    color: ${(props) => props.theme.secondary};
  }
  text-align: center;
`

const blogArgs: QueryMyBlogsArgs = {
  filters: {
    drafts: true,
    first: 7,
    pageCursor: '',
    published: true,
  },
}

export const MyBlogsView = () => {
  const {notify, closeNotification} = useToast()

  const {data, loading, fetchMore} = useQuery<{myBlogs: PaginatedBlogs}>(GET_MY_BLOGS, {
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
      closeNotification('blog-delete')
      notify({level: 'error', message: err.message, id: 'blog-delete'})
      console.error({err})
    },
    update: (cache, {data}) => {
      if ((data as any).deleteBlog?.success) {
        closeNotification('blog-delete')
        notify({level: 'success', message: 'Deleted successfully', id: 'blog-delete'})

        const blogs = cache.readQuery<{myBlogs: PaginatedBlogs}>({
          query: GET_MY_BLOGS,
        })

        const newBlogs = produce(blogs, (draftState) => {
          draftState!.myBlogs!.data!.edges = draftState?.myBlogs?.data?.edges.filter((x) => x.node._id !== (data as any).deleteBlog.data._id) || []
        })

        cache.writeQuery({
          query: GET_MY_BLOGS,
          data: newBlogs,
        })

        cache.evict({
          fieldName: 'stories',
        })

        deleteModalRef.current?.toggle(false)
      }
    },
  })

  const deleteModalRef = useRef<ModalProps<BlogDto>>(null)

  const endCursor = data?.myBlogs?.data?.pageInfo.endCursor

  const loadMore = useCallback(() => {
    blogArgs.filters.pageCursor = endCursor || ''
    fetchMore({
      variables: blogArgs,
      updateQuery: (prev, {fetchMoreResult}) => {
        if (!fetchMoreResult?.myBlogs.success) return prev
        const res = produce(fetchMoreResult, (draft) => {
          draft!.myBlogs.data!.edges.unshift(...(prev.myBlogs?.data?.edges || []))
        })
        return res!.myBlogs.data ? res! : prev
      },
    })
  }, [endCursor, fetchMore])

  const actionOverlay = (node: BlogDto) => (
    <Row justify="space-around" align="center" style={{height: '100%'}}>
      <Col xs={node.cover ? 2 : 1.3}>
        <CardActions onClick={() => openBlog(node)}>
          <BookOpen title="View" />
          <div>View</div>
        </CardActions>
      </Col>
      <Col xs={node.cover ? 2 : 1.3}>
        <CardActions onClick={() => editBlog(node)}>
          <Edit title="Edit" />
          <div>Edit</div>
        </CardActions>
      </Col>
      <Col xs={node.cover ? 2 : 1.3}>
        <CardActions onClick={() => deleteModalRef.current?.toggle(true, node)}>
          <TrashAlt title="Delete" />
          <div>Delete</div>
        </CardActions>
      </Col>
    </Row>
  )

  return (
    <Row justify="center">
      <Col xs={12} sm={10} lg={8}>
        <BlogList
          nodes={data?.myBlogs.data?.edges || []}
          openBlog={openBlog}
          actionOverlay={actionOverlay}
          loadMore={data?.myBlogs.data?.pageInfo.hasNextPage ? loadMore : undefined}
        />
        <Modal ref={deleteModalRef} size="sm">
          <Row justify="center" gutter={['md', 'xl']}>
            <Text level="subtitle">Are you sure you want to delete this blog ? </Text>
            <Row justify="center" gutter={['md', 'md']} style={{width: '100%'}}>
              <Button
                onClick={() => {
                  notify({level: 'loading', message: 'Deleting blog', id: 'blog-delete'})
                  deleteBlog({variables: {id: deleteModalRef.current?.getData()?._id}})
                }}
                disabled={deleteBlogReq.loading}
              >
                Yes
              </Button>
              <Button
                onClick={() => {
                  deleteModalRef.current?.toggle(false)
                }}
                disabled={deleteBlogReq.loading}
              >
                No
              </Button>
            </Row>
          </Row>
        </Modal>
      </Col>

      {!loading && !data?.myBlogs?.data?.edges.length && (
        <Col xs={12} sm={5}>
          <img src={NoDataImg} width="55%" style={{...blockCenter, marginTop: '100px'}} alt="No Blogs Yet !" />
          <Text level="content" align="center" style={{marginTop: '20px'}}>
            You have not written any blogs yet !
          </Text>
        </Col>
      )}

      {loading && (
        <Col xs={12} style={{marginTop: data?.myBlogs?.data?.edges.length ? '' : '200px'}}>
          <Loader />
        </Col>
      )}
    </Row>
  )
}
