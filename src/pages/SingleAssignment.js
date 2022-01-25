import React from "react"


const SingleAssignment = ({match, assignments, deleteAssignment, updateAssignment, userList, history}) => {
    
    const possibleToken = JSON.parse(localStorage.getItem("token"))

    const id = parseInt(match.params.id);
    const assignment = assignments.find((assignment) => assignment.id === id);
    
    const [editForm, setEditForm] = React.useState(assignment)

    const handleChange = (event) => {
    setEditForm({ ...editForm, [event.target.name]: event.target.value });
    };

  const handleSubmit = (event) => {
    event.preventDefault()
    updateAssignment(editForm, assignment.id)
    history.push("/home")
  }

const usersAll = []

  for(let i=0; i<userList.length; i++){
    if(usersAll.includes(userList[i].username) === false)
    usersAll.push(userList[i].username)
}

    return <section><h1>{assignment.task}</h1>
    <button onClick={(event) => deleteAssignment(assignment)}>Delete Task</button>
    <form className="editForm" onSubmit={handleSubmit}>
    <input
      type="text"
      value={editForm.task}
      name="task"
      placeholder="task name"
      onChange={handleChange}
    />
Assignee<select onChange={handleChange} value={editForm.assignee} name="assignee">
        <option default value="">Unassigned</option>
        {usersAll.map((user, index) => <option key={index} value={user} >{user}</option>)}
      </select>
    <input
      type="text"
      value={editForm.notes}
      name="notes"
      placeholder="notes"
      onChange={handleChange}
    />
<select name="completed" value={editForm.completed.toString()} onChange={handleChange} required>
        <option value="">Choose</option>
        <option value="true">Complete</option>
        <option value="false">Incomplete</option>
      </select>
<select name="urgency" value={editForm.urgency.toString()} onChange={handleChange} required>
        <option value="">Choose</option>
        <option value="true">Urgent</option>
        <option value="false">Standard</option>
      </select><br/>
Due?<select name="overdue" value={editForm.overdue.toString()} onChange={handleChange} required>
        <option value="">Choose</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
Flagged for Review?<select name="flagged" value={editForm.overdue.toString()} onChange={handleChange} required>
        <option value="">Choose</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
    <input type="submit" className="button" value="Update Task Details" /></form>
    </section>
}

export default SingleAssignment