import { Post } from '../types'

function PostItem({ item }: { item: Post }) {
  return (
    <div className='post-item'>
      <label>Title:</label><span>{item.title}</span>
      <label>Body:</label><span>{item.body}</span>
    </div>
  )
}

export default PostItem