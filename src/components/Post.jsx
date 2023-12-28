function Post({item}) {
  return (
    <div className='section-item-border'>
      <table>
        <thead></thead>
        <tbody>
        <tr>
          <td>Title:</td><td>{item.title}</td>
        </tr>
        <tr>
          <td>Body:</td><td>{item.body}</td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Post