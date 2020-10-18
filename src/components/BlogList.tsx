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
    obs.observe(document.getElementById('footer')!)
    return () => {
      obs.disconnect()
    }
  }, [loadMore])

  return useMemo(() => {
    return (
      <Masonry
        breakpointCols={{
          default: 3,
          1200: 2,
          700: 1,
        }}
        className=""
        columnClassName=""
        style={{display: 'flex'}}
      >
        {nodes.map(({node}, i) => {
          const nodeActionOverlay: any = actionOverlay ? actionOverlay(node) : false
          return <BlogCard key={node._id} blog={node} onClick={() => openBlog(node)} actionOverlay={nodeActionOverlay} />
        })}
      </Masonry>
    )
  }, [nodes.length])
}
