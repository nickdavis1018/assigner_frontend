import React from "react"
import {Link} from "react-router-dom"

const Management = ({getAssignments, assignments, search, setSearch, URL, user, userList, history}) => {

    const possibleToken = localStorage.getItem("token")

    React.useEffect(() => getAssignments(), [])

    const emptyAssignment = {
        task: "",
        assignee: "",
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
            assigner: "",
            notes: "",
            completed: "",
            urgency: "",
            flagged: "",
            overdue: "",
          }); 
        history.push("/assignments");
      };

      const handleNewAssignment = async(assignment) => {
        console.log(user)
        assignment.assigner = user
        assignment.completed = false
        assignment.urgency = false
        assignment.overdue = false
        assignment.flagged = false
        const submitToken = JSON.parse(localStorage.getItem("token"))
        const response = await fetch(URL + 'assignment/', {
            method: "post",
            headers: {
                Authorization: `Bearer ${submitToken.access}`,
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(assignment)
        })
        getAssignments()
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
        <option default value="">Unassigned</option>
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
<section><h1>My Assignments</h1><input className="searchBar" placeholder="Browse..." onChange={event => setSearch(event.target.value)} /><div className="taskHeader"><h1>Task</h1><h1>Assignee</h1><h1>Manager</h1><h1>Status</h1><h1>Urgency</h1><h1>Notes</h1></div>{possibleToken !== null ? assignments.filter(foundAssignment => {
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
          }}).map((assignment, index) => <Link key={index} to={`/assignments/${assignment.id}`}><div className="task"><h1>{assignment.task}</h1><h2>{assignment.assignee}</h2>{assignment.assigner ? <h2>{assignment.assigner}</h2> : <h2>Unassigned</h2>}{assignment.completed ? <h2>Closed</h2>: <h2>Active</h2>}{assignment.urgent ? <h2>Urgent</h2>: <h2>Standard</h2>}<h2>Placeholder</h2></div></Link>): <h1>Not logged in</h1>}
    </section>
    </div>
}

export default Management







