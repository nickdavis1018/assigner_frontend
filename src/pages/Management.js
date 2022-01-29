import React from "react"
import {Link} from "react-router-dom"

const Management = ({getAssignments, deleteAssignment, updateAssignment, assignments, URL, user, userList, history}) => {

    const [search, setSearch] = React.useState("")

    const possibleToken = localStorage.getItem("token")

    const role = localStorage.getItem("manager")

    const emptyAssignment = {
        task: "",
        assignee: "unassigned",
        assigner: "",
        notes: "",
        completed: "",
        urgency: "",
        flagged: "",
        overdue: ""
      }

    const [formData, setFormData] = React.useState(emptyAssignment);

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
      };

    const handleSubmisson = (event) => {
        event.preventDefault();
        handleNewAssignment(formData);
        setFormData({
            task: "",
            assignee: "",
            assigner: "unassigned",
            notes: "",
            completed: "",
            urgency: "",
            flagged: "",
            overdue: "",
          }); 
        history.push("/management");
      };

      const handleNewAssignment = async(assignment) => {
        console.log(user)
        assignment.assigner = user
        assignment.completed = false
        assignment.urgency = false
        assignment.overdue = false
        assignment.flagged = false
        const submitToken = JSON.parse(localStorage.getItem("token"))
        const response = await fetch(URL + 'assignments/', {
            method: "post",
            headers: {
                Authorization: `Bearer ${submitToken.access}`,
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(assignment)
        })
        getAssignments()
      }

      const flag = (assignment) => {
          if(assignment.flagged === false){
          assignment.flagged = true}
          else{
            assignment.flagged = false
          }
          updateAssignment(assignment, assignment.id)
      }

      const due = (assignment) => {
        if(assignment.overdue === false){
        assignment.overdue = true}
        else{
          assignment.overdue = false
        }
        updateAssignment(assignment, assignment.id)
    }

      function removeDuplicates(value, index, self){
        return self.indexOf(value) === index
      }

      const usersAll = []

      for(let i=0; i<userList.length; i++){
          if(usersAll.includes(userList[i].username) === false)
          usersAll.push(userList[i].username)
      }

    return <div>
<h1>Manage Assignments</h1>
<form onSubmit={handleSubmisson}>
Task Title<input
        type="text"
        onChange={handleChange}
        value={formData.task}
        name="task"
        placeholder="task"
        required
      />  
Urgency<select name="urgency" value={formData.urgency} onChange={handleChange} required>
        <option default value="false">Standard </option>
        <option value="true">Urgent</option>
      </select>
Assignee<select onChange={handleChange} value={formData.assignee} name="assignee">
        <option default value="unassigned">No Assignment</option>
        {usersAll.map((user, index) => <option key={index} value={user} >{user}</option>)}
      </select>
Notes<input
        type="text"
        onChange={handleChange}
        value={formData.notes}
        name="notes"
        placeholder="notes"
        required
      />
            <input type="submit" value="Create Task"/>
</form>
<section className="list"><div className="labelTitleAll"><div className="labelTitle"><h1>Managed Assignments</h1><button>+</button></div><div><input className="searchBar" placeholder="Browse..." onChange={event => setSearch(event.target.value)} /></div></div><div className="dashHeader"><h1>Task</h1><h1>Status</h1><h1>Priority</h1><h1>Delivery</h1><h1>Review</h1><h1>Assignee</h1><h1>Actions</h1></div>{possibleToken !== null ? assignments.filter(foundAssignment => {
        if (search === "") {
          return foundAssignment;
        } else if (foundAssignment.task.toLowerCase().includes(search.toLowerCase())) {
          return foundAssignment
        }
      }).filter(foundAssignment => {
        if (foundAssignment.assigner === user) {
          return foundAssignment}
          else{
            return
          }}).map((assignment, index) => <div className="dashData" key={index}><Link  to={`/assignments/${assignment.id}`}><h1>{assignment.task}</h1></Link>{assignment.completed ? <h2>Completed</h2>: <h2>Active</h2>}{assignment.urgency ? <h2>Urgent</h2>: <h2>Standard</h2>}{assignment.overdue ? <h2>Overdue</h2>: <h2>Due</h2>}{assignment.flagged ? <h2>Flagged</h2>: <h2>Unflagged</h2>}<h2>{assignment.assignee}</h2><div>{role ? <div className="buttons"><button className="button3" onClick={(event) => flag(assignment)}>{assignment.flagged ? "Unflag" : "Flag"}</button><button className="button3" onClick={(event) => due(assignment)}>{assignment.overdue ? "Mark Due" : "Mark Overdue"}</button></div>: ""}</div></div>): <h1>Not logged in</h1>}
    </section>
    </div>
}

export default Management







