import { useState } from 'react'
import Post from './Post'
import PostAdd from './PostAdd'

function PostsList({posts, addPostCallback}) {
  const [onDisplay,setOnDisplay] = useState('postsList')

  const addPostInnerCallback = (e,title,body) => {
    addPostCallback(e,title,body)
    setOnDisplay('postsList')
  }
  
  const addPost = () => {
    setOnDisplay('addPost')
  }

  const isOnDisplay = (element) => {
    return onDisplay == element
  }

  return (
    <div className='section'>
      <div className='container space-between'>
        Posts - User {posts[0]?.userId}
        <button onClick={addPost}>Add</button>
      </div>
      <br />
      <div className='section-border'>
        <div style={!isOnDisplay('addPost')?{display:'none'}:{}}>
          <PostAdd callback={addPostInnerCallback} />          
        </div>
        <div style={!isOnDisplay('postsList')?{display:'none'}:{}}>
        {
          posts.map((post)=>{
            return <Post key={post.id} item={post} />
          })
        }
        </div>
      </div>
    </div>
  )
}

export default PostsList