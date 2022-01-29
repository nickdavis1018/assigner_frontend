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
    
    
    return <><section className="list"><div className="labelTitleAll"><div className="labelTitle"><h1>My Assignments</h1>{toggleAct === false ? <button onClick={toggleActShow}>Show Active</button> : <button onClick={toggleActDontShow}>Show All</button>}</div><div><input className="searchBar" placeholder="Browse..." onChange={event => setSearch(event.target.value)} /></div></div><div className="dashHeader"><h4>Task</h4><h4 className="display2">Status</h4><h4 className="display">Priority</h4><h4 className="display">Delivery</h4><h4 className="display">Review</h4><h4 className="display2">Manager</h4><h4 className="display4">Actions</h4></div>{toggleAct === false ? assignments.filter(foundAssignment => {
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
          }}).map((assignment, index) => <div key={index} className="dashData"><Link to={`/assignments/${assignment.id}`}><h4>{assignment.task}</h4></Link>{assignment.completed ? <h4 className="display2">Completed</h4>: <h4 className="display2">Active</h4>}{assignment.urgent ? <h4 className="display">Urgent</h4>: <h4 className="display">Standard</h4>}<h4 className="display">{assignment.overdue ? <span className="flagged">Overdue</span>: "Due"}</h4><h4 className="display">{assignment.flagged ? <span className="flagged">Flagged</span> : "Unflagged"}</h4><h4 className="display2">{assignment.assigner}</h4><div className="buttons"><button className="button3" onClick={(event) => cancel(assignment)}>Drop</button><button className="button3" onClick={(event) => complete(assignment)}>{assignment.completed ? "Reopen" : "Resolve"}</button></div></div>): assignments.filter(foundAssignment => {
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
                  }}).map((assignment, index) => <div key={index} className="dashData"><Link  to={`/assignments/${assignment.id}`}><h4>{assignment.task}</h4></Link>{assignment.completed ? <h4>Closed</h4>: <h4>Active</h4>}{assignment.urgent ? <h4>Urgent</h4>: <h4>Standard</h4>}<h4>{assignment.overdue ? <span className="flagged">"Overdue" </span>: "Due"}</h4><h4>{assignment.flagged ? <span className="flagged">Flagged</span> : "Unflagged"}</h4><h4>{assignment.assigner}</h4><div className="buttons"><button className="button3" onClick={(event) => cancel(assignment)}>Drop</button><button className="button3" onClick={(event) => complete(assignment)}>{assignment.completed ? "Reopen" : "Resolve"}</button></div></div>)}
    {assignments ? <><h4 className="advice"><br/>Looking to work on more assignments?<br/><br/>Try<Link className="headerLink" to="/">searching</Link>for more assignments to claim.</h4> </>: ""}
    </section></>
}

export default Assignments