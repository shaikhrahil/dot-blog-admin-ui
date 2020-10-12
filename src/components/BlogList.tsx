import {BlogDto, BlogEdge} from 'models'
import React, {ReactElement, useEffect, useMemo} from 'react'
import {BlogCard} from './BlogCard'
import {Masonry} from './Masonry'

interface Props {
  nodes: BlogEdge[]
  openBlog: (node: BlogDto) => void
  actionOverlay?: (node: BlogDto) => ReactElement
  loadMore?: () => void
}

export const BlogList = ({nodes, openBlog, actionOverlay, loadMore}: Props) => {
  useEffect(() => {
    const obs = new IntersectionObserver((els) => {
      if (els[0].isIntersecting) {
        loadMore && loadMore()
      }
    })
    if (document.getElementById('blogCard')) {
      obs.observe(document.getElementById('blogCard')!)
    }
    return () => {
      obs.disconnect()
    }
  }, [nodes.length])

  return useMemo(() => {
    return (
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
        {nodes.map(({node}, i) => {
          const nodeActionOverlay: any = actionOverlay ? actionOverlay(node) : false
          return (
            <BlogCard
              key={node._id}
              id={nodes.length - 4 === i ? 'blogCard' : ''}
              blog={node}
              onClick={() => openBlog(node)}
              actionOverlay={nodeActionOverlay}
            />
          )
        })}
      </Masonry>
    )
  }, [nodes.length])
}
