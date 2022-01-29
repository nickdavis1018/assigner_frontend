import React from "react"


const SingleAssignment = ({match, role, user, assignments, deleteAssignment, updateAssignment, userList, history}) => {

    const id = parseInt(match.params.id);
    const assignment = assignments.find((assignment) => assignment.id === id);
    
    const [editForm, setEditForm] = React.useState(assignment)

    const handleChange = (event) => {
    setEditForm({ ...editForm, [event.target.name]: event.target.value });
    };

  const handleSubmit = (event) => {
    event.preventDefault()
    updateAssignment(editForm, assignment.id)
    history.push("/")
  }

  const complete = (assignment) => {
    if(assignment.completed === false){
    assignment.completed = true}
    else{
      assignment.completed = false
    }
    updateAssignment(assignment, assignment.id)
}

const usersAll = []

  for(let i=0; i<userList.length; i++){
    if(usersAll.includes(userList[i].username) === false)
    usersAll.push(userList[i].username)
}
    return <section><h1 className="titleShow">{assignment.task}</h1>    {role === "true" || user === assignment.assignee ? <><button className="otherButton" onClick={(event) => complete(assignment)}>{assignment.completed ? "Reopen" : "Resolve"}</button></>: ""}<div className="showMaster"><h2>Status</h2><h1>{assignment.completed ? "Completed" : "Active"}</h1><h2>Priority</h2><h1>{assignment.urgency ? "Urgent" : "Standard"}</h1><h2>Assignee</h2><h1>{assignment.assignee}</h1><h2>Manager</h2><h1>{assignment.assigner}</h1><h2>Review</h2><h1>{assignment.flagged? "Flagged" : "Unflagged"}</h1><h2>Schedule</h2><h1>{assignment.overdue ? "Overdue" : "Due"}</h1></div><div className="noteEnd"><h2 className="note">Notes</h2><h4 className="noteText">{assignment.notes}</h4></div>
    <div>{role === "true" ? <> <div className="loginForm">
    <form className="editForm" onSubmit={handleSubmit}>
Name
    <input
      type="text"
      value={editForm.task}
      name="task"
      placeholder="task name"
      onChange={handleChange}
    />
Status
    <select name="completed" value={editForm.completed.toString()} onChange={handleChange} required>
        <option value="">Choose</option>
        <option value="true">Complete</option>
        <option value="false">Incomplete</option>
      </select>
Assignee
<select onChange={handleChange} value={editForm.assignee} name="assignee">
        <option default value="unassigned">No Assignee</option>
        {usersAll.map((user, index) => <option key={index} value={user} >{user}</option>)}
      </select>
Due?
<select name="overdue" value={editForm.overdue.toString()} onChange={handleChange} required>
        <option value="">Choose</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
Flag?
<select name="flagged" value={editForm.flagged.toString()} onChange={handleChange} required>
        <option value="">Choose</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
Notes?
<input
      type="text"
      value={editForm.notes}
      name="notes"
      placeholder="notes"
      onChange={handleChange}
    />
    <input type="submit" className="otherButton" value="Update Task Details" /></form></div>
    <button className="otherButton" onClick={(event) => deleteAssignment(assignment)}>Delete Task</button> </>: ""}</div>
    </section>
}

export default SingleAssignment