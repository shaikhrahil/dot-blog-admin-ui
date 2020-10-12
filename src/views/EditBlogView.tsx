import { useMutation, useQuery } from '@apollo/client'
import { useAuth0 } from '@auth0/auth0-react'
import { API } from '@editorjs/editorjs'
import { Button, Card, Checkbox, Col, Image, Input, Modal, Row, Text, Textarea } from 'components'
import { Form, Formik } from 'formik'
import { Blog, BlogDto, EditorBlock, EditorImageBlock, ModalProps, MutationAddBlogArgs, QueryMyBlogArgs } from 'models'
import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { GET_MY_BLOG, UPDATE_BLOG } from 'services'
import 'styles/editor.scss'
import { getEditorjsInstance, history } from 'utils'
import * as Yup from 'yup'

const BlogSchema = Yup.object().shape({
  title: Yup.string().min(5, 'Minimum 5 characters required').max(50, 'Max 50 characters allowed').required('Title Required'),
  subtitle: Yup.string().required('Description Required'),
  published: Yup.boolean().required(),
})

interface State {
  blocks: any[]
}

export const EditBlogView = () => {
  const editorRef = useRef<any>()
  const saveModalRef = useRef<ModalProps>(null)
  const [state, setState] = useState<State>({blocks: []})

  const openSaveModal = async (e: KeyboardEvent) => {
    if (e.key === 's' && e.ctrlKey) {
      e.preventDefault()
      saveModalRef.current?.toggle(true)
    }
    if (e.key === 'Escape') {
      saveModalRef.current?.toggle(false)
    }
  }

  const onChange = async (changes: API) => {
    const blocks = await (await changes.saver.save()).blocks
    setState({...state, blocks})
  }

  const location = useLocation<{blog: BlogDto}>()

  const blogParams: QueryMyBlogArgs = {
    id: location.state.blog._id,
  }

  const {data} = useQuery<{story: Blog}>(GET_MY_BLOG, {
    variables: blogParams,
    onError: (err) => {
      console.error({err})
    },
  })

  useEffect(() => {
    if (data) {
      const blocks = JSON.parse(data.story?.data?.sections || '') || []
      const editor = getEditorjsInstance(editorRef.current, onChange, {blocks})
      document.addEventListener('keydown', openSaveModal)
      return () => {
        document.removeEventListener('keydown', openSaveModal)
        editor.isReady.then(() => {
          //   editor.blocks?.delete(0)
          editor.destroy()
          // getBlog()
          // JSON.parse(data?.myBlog.data?.sections || '').forEach((x: any) => {
          //   console.log(x)
          //   editor.blocks?.insert(x.type, x.data)
          // })
          // editor.focus()
        })
      }
    }
  }, [data])

  return (
    <Row justify="center" id="editBlogView">
      <SaveBlogModal ref={saveModalRef} blocks={state.blocks} />
      <div ref={editorRef} style={{width: '90%'}} id="editorjs"></div>
    </Row>
  )
}

const SaveBlogModal = forwardRef<ModalProps, State>(({blocks}, ref) => {
  const [addBlog, {loading, error}] = useMutation(UPDATE_BLOG, {
    onError: (err) => {
      console.log({err})
    },
    onCompleted: ({updateBlog}: {updateBlog: Blog}) => {
      history.push(`/blog/${updateBlog.data?.title.toLowerCase().replaceAll(' ', '-')}-${updateBlog.data?._id}`)
    },
  })

  let title: any = {}
  let subtitle: any = {}
  let cover: string = ''

  ;(blocks as EditorBlock[]).forEach((x, i) => {
    if (x.type === 'header') {
      if (!title.value) {
        title.index = i
        title.value = x
      } else if (!subtitle.value) {
        subtitle.index = i
        subtitle.value = x
      }
    }
    if (x.type === 'image') {
      cover = (x.data as EditorImageBlock).url
    }
  })

  const {user} = useAuth0()
  const location = useLocation<{blog: BlogDto}>()

  const saveBlog = async (formFields: any) => {
    const variables: MutationAddBlogArgs = {
      blog: {
        _id: location.state.blog._id,
        ...formFields,
        username: user.given_name,
        profilePicture: user.picture,
        cover,
        sections: JSON.stringify(
          blocks.map((x, i) => ({
            ...x,
            ...(title.index === i
              ? {...x, data: {...x.data, text: formFields.title}}
              : subtitle.index === i
              ? {...x, data: {...x.data, text: formFields.subtitle}}
              : x),
          })),
        ),
      },
    }
    addBlog({variables})
  }

  const previewBlog = (formFields: any) => {
    const myWindow: any = window.open('/preview', '_blank')
    myWindow.blog = {
      ...formFields,
      username: user.given_name,
      profilePicture: user.picture,
      cover,
      sections: JSON.stringify(
        blocks.map((x, i) => ({
          ...x,
          ...(title.index === i
            ? {...x, data: {...x.data, text: formFields.title}}
            : subtitle.index === i
            ? {...x, data: {...x.data, text: formFields.subtitle}}
            : x),
        })),
      ),
    }
  }

  return (
    <Modal ref={ref} size="lg">
      <Row justify="space-around" align="center" gutter={['xs', 'md']}>
        <Formik
          onSubmit={saveBlog}
          enableReinitialize
          initialValues={{
            title: title.value?.data.text || '',
            subtitle: subtitle.value?.data.text || '',
            published: true,
          }}
          validationSchema={BlogSchema}
        >
          {({values}) => (
            <>
              <Col xs={12} sm={5}>
                <Form>
                  <Input name="title" placeholder="Title" />
                  <Textarea name="subtitle" placeholder="Description" rows={4} />
                  <Checkbox id="publishCheck" name="published" label="Published" />
                  <Row justify="space-around">
                    <Button type="submit" style={{width: '40%'}} disabled={loading}>
                      Save
                    </Button>
                    <Button type="button" style={{width: '40%'}} onClick={() => previewBlog(values)}>
                      Preview
                    </Button>
                  </Row>
                </Form>
              </Col>
              <Col xs={12} sm={5}>
                <Card>
                  {cover && <Image key={10} src={cover} />}
                  <Text level="title">{values.title}</Text>
                  <Text level="content" truncate={2}>
                    {values.subtitle}
                  </Text>
                </Card>
              </Col>
            </>
          )}
        </Formik>
        {/* <Modal ref={previewModalRef} size="xl">
          <BlogPreviewModal />
        </Modal> */}
      </Row>
    </Modal>
  )
})
