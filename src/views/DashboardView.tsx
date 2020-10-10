import {useQuery} from '@apollo/client'
import {BlogCard, Col, Masonry, Row} from 'components'
import {PaginatedBlogs, QueryStoriesArgs} from 'models'
import React from 'react'
import {GET_STORIES} from 'services/BlogService'
import shortid from 'shortid'

const blog = {
  _id: 'dkjndfkcndfknkjdsnckds',
  title: 'First blog',
  subtitle:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto, exercitationem beatae dignissimos dicta, veniam dolore sed nesciunt explicabo voluptatibus, commodi sequi repellendus? Autem molestias  eveniet unde tenetur maiores aliquid!',
  createdAt: '',
  updatedAt: '',
  by: 'Rahil',
  cover: 'https://images.unsplash.com/photo-1600678217111-a23a045721e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
  comments: [
    {by: 'Rahil 2', createdAt: '', updatedAt: '', text: 'Awesome !', replyTo: '', _id: '123'},
    {by: 'Rahil 2', createdAt: '', updatedAt: '', text: 'Awesome !', replyTo: '', _id: '789'},
    {by: 'Rahil 2', createdAt: '', updatedAt: '', text: 'Awesome !', replyTo: '', _id: '101'},
    {
      by: 'Rahil 2',
      createdAt: '',
      updatedAt: '',
      text: 'Reply to 123 Awesome !',
      replyTo: '123',
      _id: '456',
    },
  ],
  sections: [
    {data: {text: 'Amazing Post', level: 1}, type: 'header'},
    {
      data: {
        caption: 'Unsplash caption',
        stretched: true,
        unsplash: {
          author: 'Aaron Burden',
          profileLink: 'https://unsplash.com/@aaronburden',
        },
        url: 'https://images.unsplash.com/photo-1600678217111-a23a045721e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
        withBackground: false,
        withBorder: false,
      },
      type: 'image',
    },
    {
      data: {
        level: 2,
        text: 'Title H2',
      },
      type: 'header',
    },
    {
      data: {text: 'this is going to be awesome'},
      type: 'paragraph',
    },
    {
      data: {},
      type: 'delimiter',
    },
    {
      data: {
        level: 3,
        text: 'Hopefully amazing',
      },
      type: 'header',
    },
    {
      data: {text: 'sure hope so'},
      type: 'paragraph',
    },
    {
      data: {level: 4, text: 'im sure'},
      type: 'header',
    },
    {
      data: {text: 'Me too&nbsp;'},
      type: 'paragraph',
    },
    {
      data: {level: 1, text: 'Okay lets get ging'},
      type: 'header',
    },
    {
      data: {
        text:
          'this is goooooooooooooooooooooooooooooooooooooo ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooood',
      },
      type: 'paragraph',
    },
    {
      data: {text: 'Aright that was oka i guess'},
      type: 'paragraph',
    },
    {
      data: {level: 2, text: 'Lets try code'},
      type: 'header',
    },
    {
      data: {
        html: 'const a = 10;↵const b = 20;↵↵function addUp(a,b){↵    return a + b↵}↵↵const c = addUp(a,b);↵↵console.log(c);↵↵// 30↵↵↵↵↵',
      },
      type: 'raw',
    },
    {
      data: {level: 2, text: 'What else remains ?'},
      type: 'header',
    },
    {
      data: {
        items: ['this', 'this&nbsp;', 'and this'],
        style: 'ordered',
      },
      type: 'list',
    },
    {
      data: {},
      type: 'delimiter',
    },
    {
      type: 'paragraph',
      data: {
        text: 'The end',
      },
    },
    {
      data: {text: 'Thankypou'},
      type: 'paragraph',
    },
  ],
}

export const DashboardView = () => {
  const storiesArgs: QueryStoriesArgs = {
    filters: {
      first: 1,
      pageCursor: '',
    },
  }

  const {data, error, loading} = useQuery<{stories: PaginatedBlogs}>(GET_STORIES, {
    variables: storiesArgs,
    onError: (err) => {
      console.error({err})
    },
  })

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
          {data?.stories?.data?.edges.map(({node}, i) => (
            <BlogCard key={shortid()} blog={node} />
          ))}
        </Masonry>
      </Col>
    </Row>
  )
}
