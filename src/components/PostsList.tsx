import { useState } from 'react'
import PostItem from './PostItem'
import PostAdd, {PostAddOnClickEvent} from './PostAdd'
import {Post} from '../types'

function PostsList({posts, addPostCallback} : {posts: Post[], addPostCallback: PostAddOnClickEvent}) {
  const [onDisplay,setOnDisplay] = useState<'addPost' | 'postsList'>('postsList')

  const addPostInnerCallback: PostAddOnClickEvent = (action, title, body) => {
    addPostCallback(action, title, body)
    setOnDisplay('postsList')
  }
  
  const addPost = () => {
    setOnDisplay('addPost')
  }

  return (
    <div className='postslist'>
      <div className='postslist-top'>
        <h1>Posts - User {posts[0]?.userId}</h1>
        <button type='button' onClick={addPost}>Add</button>
      </div>
      <div className='postslist-bottom'>
        {
          onDisplay === 'addPost' && <PostAdd onClick={addPostInnerCallback} />
        }
        {
          onDisplay === 'postsList' && posts.map((post)=>{
            return <PostItem key={post.id} item={post} />
          })
        }
      </div>
    </div>
  )
}

export default PostsList