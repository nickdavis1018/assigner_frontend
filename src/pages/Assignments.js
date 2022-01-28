import React from "react"
import {Link} from "react-router-dom"

const Assignments = ({assignments, getAssignments, user}) => {

    const [search, setSearch] = React.useState("")

    const possibleToken = JSON.parse(localStorage.getItem("token"))
    
    return <><section><h1>My Assignments</h1><input className="searchBar" placeholder="Browse..." onChange={event => setSearch(event.target.value)} /><div className="dashHeader"><h1>Task</h1><h1>Assignee</h1><h1>Manager</h1><h1>Status</h1><h1>Urgency</h1><h1>Notes</h1></div>{possibleToken !== null ? assignments.filter(foundAssignment => {
        if (search === "") {
          return foundAssignment;
        } else if (foundAssignment.task.toLowerCase().includes(search.toLowerCase())) {
          return foundAssignment
        }
      }).filter(foundAssignment => {
        if (foundAssignment.assignee === user) {
          return foundAssignment}
          else{
            return
          }}).map((assignment, index) => <Link key={index} to={`/assignments/${assignment.id}`}><div className="dashData"><h1>{assignment.task}</h1><h2>{assignment.assignee}</h2>{assignment.assigner ? <h2>{assignment.assigner}</h2> : <h2>Unassigned</h2>}{assignment.completed ? <h2>Closed</h2>: <h2>Active</h2>}{assignment.urgent ? <h2>Urgent</h2>: <h2>Standard</h2>}<h2>Placeholder</h2></div></Link>): <h1>Not logged in</h1>}
    </section></>
}

export default Assignments