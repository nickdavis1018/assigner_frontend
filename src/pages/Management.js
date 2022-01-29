import React from "react"
import {Link} from "react-router-dom"
import Modal from "../components/Modal"

const Management = ({getAssignments, deleteAssignment, updateAssignment, assignments, URL, user, userList, history}) => {

    const [search, setSearch] = React.useState("")

    const [visible, setVisible] = React.useState(false)

    const toggleVisibility = () => setVisible((s) => !s);

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
            assignee: "unassigned",
            assigner: "",
            notes: "",
            completed: "",
            urgency: "",
            flagged: "",
            overdue: "",
          }); 
        history.push("/management")
        setVisible(false);
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

    return <div> <Modal visible={visible}>
<h4>Create Assignment</h4>
<div className="loginForm">
<form className="editForm" onSubmit={handleSubmisson}>
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
           <br/> <input className="button3" type="submit" value="Create Task"/>
</form><br/><button className="button3" onClick={toggleVisibility}>Go back</button></div></Modal>
<section className="list"><div className="labelTitleAll"><div className="labelTitle"><h1>Managed Assignments</h1><button className="mobile" onClick={toggleVisibility}>+</button></div><div><input className="searchBar" placeholder="Browse..." onChange={event => setSearch(event.target.value)} /></div></div><div className="dashHeader"><h4>Task</h4><h4 className="display2">Status</h4><h4 className="display">Priority</h4><h4 className="display">Delivery</h4><h4 className="display">Review</h4><h4 className="display2">Assignee</h4><h4 className="display4">Actions</h4></div>{possibleToken !== null ? assignments.filter(foundAssignment => {
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
          }}).map((assignment, index) => <div className="dashData" key={index}><Link  to={`/assignments/${assignment.id}`}><h4>{assignment.task}</h4></Link>{assignment.completed ? <h4 className="display2">Completed</h4>: <h4 className="display2">Active</h4>}{assignment.urgency ? <h4 className="display">Urgent</h4>: <h4 className="display">Standard</h4>}{assignment.overdue ? <h4 className="display">Overdue</h4>: <h4 className="display">Due</h4>}{assignment.flagged ? <h4 className="display">Flagged</h4>: <h4 className="display">Unflagged</h4>}<h4 className="display2">{assignment.assignee}</h4>{role ? <div className="buttons"><button className="button3" onClick={(event) => flag(assignment)}>{assignment.flagged ? "Unflag" : "Flag"}</button><button className="button3" onClick={(event) => due(assignment)}>{assignment.overdue ? "Mark Due" : "Mark Overdue"}</button></div>: ""}</div>): <h4>Not logged in</h4>}
    </section>
    </div>
}

export default Management







