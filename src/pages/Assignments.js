import React from "react"
import {Link} from "react-router-dom"

const Assignments = ({assignments, updateAssignment, getAssignments, user}) => {

    const [search, setSearch] = React.useState("")

    const [toggleAct, setToggleAct] = React.useState(false) 

    const possibleToken = JSON.parse(localStorage.getItem("token"))

    const cancel = (assignment) => {
            assignment.assignee = "unassigned"
            updateAssignment(assignment, assignment.id)
        }

        const toggleActShow = () => {
            setToggleAct(true)
        }
    
        const toggleActDontShow = () => {
            setToggleAct(false)
        }

        const complete = (assignment) => {
            if(assignment.completed === false){
            assignment.completed = true}
            else{
              assignment.completed = false
            }
            updateAssignment(assignment, assignment.id)
        }
    
    
    return <><section className="list"><div className="labelTitleAll"><div className="labelTitle"><h1>My Assignments</h1>{toggleAct === false ? <button onClick={toggleActShow}>Show Active</button> : <button onClick={toggleActDontShow}>Show All</button>}</div><div><input className="searchBar" placeholder="Browse..." onChange={event => setSearch(event.target.value)} /></div></div><div className="dashHeader"><h1>Task</h1><h1>Status</h1><h1>Priority</h1><h1>Delivery</h1><h1>Review</h1><h1>Manager</h1><h1>Actions</h1></div>{toggleAct === false ? assignments.filter(foundAssignment => {
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
          }}).map((assignment, index) => <Link key={index} to={`/assignments/${assignment.id}`}><div className="dashData"><h1>{assignment.task}</h1>{assignment.completed ? <h2>Closed</h2>: <h2>Active</h2>}{assignment.urgent ? <h2>Urgent</h2>: <h2>Standard</h2>}<h2>{assignment.overdue ? <span className="flagged">Overdue</span>: "Due"}</h2><h2>{assignment.flagged ? <span className="flagged">Flagged</span> : "Unflagged"}</h2><h2>{assignment.assigner}</h2><div className="buttons"><button className="button3" onClick={(event) => cancel(assignment)}>Drop</button><button className="button3" onClick={(event) => complete(assignment)}>{assignment.completed ? "Reopen" : "Resolve"}</button></div></div></Link>): assignments.filter(foundAssignment => {
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
              }}).filter(foundAssignment => {
                if (foundAssignment.completed === false) {
                  return foundAssignment}
                  else{
                    return
                  }}).map((assignment, index) => <div key={index} className="dashData"><Link  to={`/assignments/${assignment.id}`}><h1>{assignment.task}</h1></Link>{assignment.completed ? <h2>Closed</h2>: <h2>Active</h2>}{assignment.urgent ? <h2>Urgent</h2>: <h2>Standard</h2>}<h2>{assignment.overdue ? <span className="flagged">"Overdue" </span>: "Due"}</h2><h2>{assignment.flagged ? <span className="flagged">Flagged</span> : "Unflagged"}</h2><h2>{assignment.assigner}</h2><div className="buttons"><button className="button3" onClick={(event) => cancel(assignment)}>Drop</button><button className="button3" onClick={(event) => complete(assignment)}>{assignment.completed ? "Reopen" : "Resolve"}</button></div></div>)}
    </section></>
}

export default Assignments