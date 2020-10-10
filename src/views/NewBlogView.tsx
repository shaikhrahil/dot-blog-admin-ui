import {useMutation} from '@apollo/client'
import {useAuth0} from '@auth0/auth0-react'
import {API} from '@editorjs/editorjs'
import {Button, Card, Checkbox, Col, Image, Input, Row, Text, Textarea} from 'components'
import Modal from 'components/Modal'
import {Form, Formik} from 'formik'
import {EditorBlock, EditorImageBlock, ModalProps, MutationAddBlogArgs} from 'models'
import React, {forwardRef, useEffect, useRef, useState} from 'react'
import {ADD_BLOG} from 'services/BlogService'
import 'styles/editor.scss'
import {blockCenter, getEditorjsInstance} from 'utils'
import * as Yup from 'yup'

const BlogSchema = Yup.object().shape({
  title: Yup.string().min(5).max(20).required('Title Required'),
  subtitle: Yup.string().required('Description Required'),
  published: Yup.boolean().required(),
})

interface State {
  blocks: any[]
}

export const NewBlogView = () => {
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

  useEffect(() => {
    const editor = getEditorjsInstance(editorRef.current, onChange)
    editor.isReady.then(() => {
      editor.blocks?.insert('header', {level: 1})
      editor.blocks?.delete(0)
      // editor.focus()
    })
    document.addEventListener('keydown', openSaveModal)
    return () => {
      document.removeEventListener('keydown', openSaveModal)
      editor.isReady
        .then(() => {
          editor.destroy()
        })
        .catch((err) => {
          console.log({err})
        })
    }
  }, [])

  return (
    <Row justify="center" id="newBlogView">
      <SaveBlogModal ref={saveModalRef} blocks={state.blocks} />
      <div ref={editorRef} style={{width: '90%'}} id="editorjs"></div>
    </Row>
  )
}

const SaveBlogModal = forwardRef<ModalProps, State>(({blocks}, ref) => {
  const [addBlog, {loading, error}] = useMutation(ADD_BLOG, {
    onError: (err) => {
      console.log({err})
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

  const saveBlog = async (formFields: any) => {
    const variables: MutationAddBlogArgs = {
      blog: {
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
                  <Button type="submit" style={{...blockCenter, width: '50%'}} disabled={loading}>
                    Save
                  </Button>
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
      </Row>
    </Modal>
  )
})
