import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Post } from './Post.jsx'

export const PostList=({ posts = [] })=>{

    return (
        <div>
          {posts.map((post) => (
            <Post {...post} key={post._id} />
          ))}
        </div>
      )

}