function Task({item, completeTaskCallback}) {
  const completeTask = () => {
    completeTaskCallback(item.id)
  }

  return (
    <div className='section-item-border'>
      <table>
        <thead></thead>
        <tbody>
        <tr>
          <td>Title:</td><td>{item.title}</td>
        </tr>
        <tr>
          <td>Completed:</td>
          <td className="container space-between">
            {String(item.completed)}
            <button onClick={completeTask} style={item.completed?{display:'none'}:{}}>Mark Completed</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Task