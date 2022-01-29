import React from "react"


const SingleAssignment = ({match, assignments, deleteAssignment, updateAssignment, userList, history}) => {

    const id = parseInt(match.params.id);
    const assignment = assignments.find((assignment) => assignment.id === id);

    const role = localStorage.getItem("manager")
    
    const [editForm, setEditForm] = React.useState(assignment)

    const handleChange = (event) => {
    setEditForm({ ...editForm, [event.target.name]: event.target.value });
    };

  const handleSubmit = (event) => {
    event.preventDefault()
    updateAssignment(editForm, assignment.id)
    history.push("/")
  }

const usersAll = []

  for(let i=0; i<userList.length; i++){
    if(usersAll.includes(userList[i].username) === false)
    usersAll.push(userList[i].username)
}
    return <section><h1>Assignment Details</h1><h1 className="titleShow">{assignment.task}</h1><div className="showMaster"><h2>Status</h2><h1>{assignment.completed ? "Completed" : "Active"}</h1><h2>Priority</h2><h1>{assignment.urgency ? "Urgent" : "Standard"}</h1><h2>Assignee</h2><h1>{assignment.assignee}</h1><h2>Manager</h2><h1>{assignment.assigner}</h1><h2>Review</h2><h1>{assignment.flagged? "Flagged" : "Unflagged"}</h1><h2>Schedule</h2><h1>{assignment.overdue ? "Overdue" : "On Time"}</h1><h2>Notes</h2><h1>{assignment.notes}</h1></div>

    <div className="loginForm">
    <form className="editForm" onSubmit={handleSubmit}>
    <div className="labels">Name</div>
    <input
      type="text"
      value={editForm.task}
      name="task"
      placeholder="task name"
      onChange={handleChange}
    />
    <div className="labels">Status</div>
    <select name="completed" value={editForm.completed.toString()} onChange={handleChange} required>
        <option value="">Choose</option>
        <option value="true">Complete</option>
        <option value="false">Incomplete</option>
      </select>
<div className="labels">Assignee</div>
<select onChange={handleChange} value={editForm.assignee} name="assignee">
        <option default value="unassigned">No Assignee</option>
        {usersAll.map((user, index) => <option key={index} value={user} >{user}</option>)}
      </select>
<div className="labels">Due?</div>
<select name="overdue" value={editForm.overdue.toString()} onChange={handleChange} required>
        <option value="">Choose</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
      <div className="labels">Flag?</div>
<select name="flagged" value={editForm.flagged.toString()} onChange={handleChange} required>
        <option value="">Choose</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
<div className="labels">Notes?</div>
<input
      type="text"
      value={editForm.notes}
      name="notes"
      placeholder="notes"
      onChange={handleChange}
    />
    <input type="submit" className="otherButton" value="Update Task Details" /></form></div>
    {role ? <button className="otherButton" onClick={(event) => deleteAssignment(assignment)}>Delete Task</button> : ""}
    </section>
    
}

export default SingleAssignment