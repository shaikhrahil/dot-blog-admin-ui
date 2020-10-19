import {useMutation} from '@apollo/client'
import {useAuth0} from '@auth0/auth0-react'
import {API} from '@editorjs/editorjs'
import {Save} from '@styled-icons/boxicons-regular'
import {Button, Card, Carousel, Checkbox, Col, Image, Input, Loader, Modal, Row, Text, Textarea} from 'components'
import {Form, Formik} from 'formik'
import {useToast} from 'hooks/useToast'
import {Blog, EditorBlock, ModalProps, MutationAddBlogArgs, ToastLevels} from 'models'
import React, {forwardRef, useCallback, useEffect, useRef, useState} from 'react'
import {ADD_BLOG} from 'services'
import styled from 'styled-components'
import 'styles/editor.scss'
import {getEditorjsInstance, history} from 'utils'
import * as Yup from 'yup'

const SaveButton = styled(Button)`
  position: fixed;
  bottom: 40px;
  right: 20px;
  border-radius: 50%;
  padding: 0;
  width: 80px;
  height: 80px;
`

const BlogSchema = Yup.object().shape({
  title: Yup.string().min(5, 'Minimum 5 characters required').max(50, 'Max 50 characters allowed').required('Title Required'),
  subtitle: Yup.string().required('Description Required'),
  published: Yup.boolean().required(),
})

interface State {
  blocks: any[]
}

export const NewBlogView = () => {
  const editorRef = useRef<any>()
  const saveModalRef = useRef<ModalProps>(null)
  const saveImageRef = useRef<ModalProps>(null)
  const [state, setState] = useState<State>({blocks: []})
  // const [uploadingImages, setUploadingImages] = useState<Record<string, string>[]>([])
  const {isAuthenticated} = useAuth0()
  const openSaveModal = async (e: KeyboardEvent) => {
    if (e.key === 's' && e.ctrlKey) {
      e.preventDefault()
      saveModalRef.current?.toggle(true)
    }
  }
  const {notify} = useToast()

  const onChange = useCallback(async (changes: API) => {
    let blocks = await (await changes.saver.save()).blocks
    setState({...state, blocks})
  }, [])

  useEffect(() => {
    const editor = getEditorjsInstance(editorRef.current, onChange)
    editor.isReady.then(() => {
      editor.blocks?.delete(0)
    })
    document.addEventListener('keydown', openSaveModal)
    return () => {
      document.removeEventListener('keydown', openSaveModal)
      editor.isReady
        .then(() => {
          try {
            editor.destroy()
          } catch (e) {
            console.error(e)
          }
        })
        .catch((err) => {
          console.log({err})
          notify({message: err, level: 'error'})
        })
    }
  }, [])

  return (
    <Row justify="center" id="newBlogView">
      {isAuthenticated && <SaveBlogModal ref={saveModalRef} blocks={state.blocks} />}
      <div className="ce-block-static">
        <h1 contentEditable={true} className="ce-header" id="blogTitle"></h1>
      </div>
      <div className="ce-block-static">
        <h3 contentEditable={true} className="ce-header" id="blogDescription"></h3>
      </div>
      {isAuthenticated && (
        <SaveButton onClick={() => saveModalRef.current?.toggle()}>
          <Save width="30px" />
        </SaveButton>
      )}
      <div ref={editorRef} style={{width: '90%'}} id="editorjs"></div>
      <Modal ref={saveImageRef} size="sm" disableBackdropClose>
        <>
          <Loader />
          <Text level="content" align="center">
            Uploading Image ...
          </Text>
        </>
      </Modal>
    </Row>
  )
}

const SaveBlogModal = forwardRef<ModalProps, State>(({blocks}, ref) => {
  const {notify, closeNotification} = useToast()

  const saveBlogMsgs: Partial<Record<ToastLevels, string>> = {
    success: 'Blog saved successfully',
    loading: 'Saving blog...',
  }

  const showErrorMsg = (msg: string) => {
    closeNotification(saveBlogMsgs.loading!)
    notify({message: msg, level: 'error'})
  }

  const [addBlog, {loading}] = useMutation(ADD_BLOG, {
    onError: (err) => {
      showErrorMsg(err.message)
    },
    onCompleted: ({addBlog}: {addBlog: Blog}) => {
      if (!addBlog.success) {
        console.error(addBlog.message)
        showErrorMsg(addBlog.message)
        return
      }
      closeNotification(saveBlogMsgs.loading!)
      notify({message: saveBlogMsgs.success!, level: 'success', id: saveBlogMsgs.loading!})
      history.push(`/blog/${addBlog.data?.title.toLowerCase().replaceAll(' ', '-')}-${addBlog.data?._id}`)
    },
    update: (cache) => {
      cache.evict({
        fieldName: 'stories',
      })
      cache.evict({
        fieldName: 'myBlogs',
      })
      cache.gc()
    },
  })

  const images: string[] = []

  ;(blocks as EditorBlock[]).forEach((x) => {
    if (x.type === 'image') {
      images.push(x.data.url)
    }
  })
  const [cover, setCover] = useState(images[0] || '')
  const {user, isAuthenticated} = useAuth0()

  const saveBlog = async (formFields: any) => {
    notify({message: saveBlogMsgs.loading!, level: 'loading', id: saveBlogMsgs.loading!})
    const variables: MutationAddBlogArgs = {
      blog: {
        ...formFields,
        cover,
        username: user.given_name,
        profilePicture: user.picture,
        sections: JSON.stringify(blocks),
      },
    }
    addBlog({variables})
  }

  const previewBlog = (formFields: any) => {
    const myWindow: any = window.open('/preview', '_blank')
    myWindow.blog = {
      ...formFields,
      cover,
      username: user.given_name,
      profilePicture: user.picture,
      sections: JSON.stringify(blocks),
    }
  }

  return (
    <Modal ref={ref} size="lg">
      <Formik
        onSubmit={saveBlog}
        enableReinitialize
        initialValues={{
          title: document.getElementById('blogTitle')?.innerHTML || '',
          subtitle: document.getElementById('blogDescription')?.innerHTML || '',
          published: false,
        }}
        validationSchema={BlogSchema}
      >
        {({values}) => (
          <>
            <Form style={{width: '100%'}}>
              <Row justify="space-around" align="center" gutter={['xs', 'md']}>
                <Col xs={12} md={5}>
                  <Card>
                    {images.length ? (
                      <Carousel max={images.length}>
                        {(index) => {
                          setCover(images[index] || '')
                          return <Image src={images[index]} />
                        }}
                      </Carousel>
                    ) : null}
                    <Text level="title">{values.title}</Text>
                    <Text level="content" truncate={2}>
                      {values.subtitle}
                    </Text>
                  </Card>
                </Col>
                <Col xs={12} md={5}>
                  <Input name="title" placeholder="Title" />
                  <Textarea name="subtitle" placeholder="Description" rows={4} />
                  <Checkbox id="publishCheck" name="published" label="Publish" />
                  <Row justify="space-around">
                    <Button type="submit" style={{width: '40%'}} disabled={loading}>
                      Save
                    </Button>
                    <Button type="button" style={{width: '40%'}} onClick={() => previewBlog(values)}>
                      Preview
                    </Button>
                  </Row>
                </Col>
              </Row>
            </Form>
          </>
        )}
      </Formik>
    </Modal>
  )
})
