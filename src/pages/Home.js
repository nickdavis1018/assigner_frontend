import React from "react"
import {Link} from "react-router-dom"

const Home = ({assignments, user, getAssignments, updateAssignment}) => {

    const [search, setSearch] = React.useState("")

    const [toggle, setToggle] = React.useState(false) 

    const toggleShow = () => {
        setToggle(true)
    }

    const toggleDontShow = () => {
        setToggle(false)
    }

    const cancel = (assignment) => {
        assignment.assignee = "unassigned"
        updateAssignment(assignment, assignment.id)
    }

    const claim = (assignment, user) => {
        console.log(assignment)
        console.log(user)
        assignment.assignee = user
        updateAssignment(assignment, assignment.id)
    }

    return <section className="list"><div className="labelTitleAll"><div className="labelTitle"><h1>Find Assignments</h1>{toggle === false ? <button onClick={toggleShow}>Show Unassigned</button> : <button onClick={toggleDontShow}>Show All</button>}</div><div><input className="searchBar" placeholder="Browse..." onChange={event => setSearch(event.target.value)} /></div></div><div className="dashHeader"><h1>Task</h1><h1 className="display2">Status</h1><h1 className="display">Priority</h1><h1 className="display">Delivery</h1><h1 className="display">Review</h1><h1 className="display2">Assignee</h1><h1 className="display3">Actions</h1></div>{toggle === false ? assignments.filter(foundAssignment => {
        if (foundAssignment.assignee !== user) {
          return foundAssignment;
        } else {
          return 
        }
      }).filter(foundAssignment => {
        if (search === "") {
          return foundAssignment;
        } else if (foundAssignment.task.toLowerCase().includes(search.toLowerCase())) {
          return foundAssignment
        }
      }).map((assignment, index) => <div key={index} className="dashData"><Link  to={`/assignments/${assignment.id}`}><h4>{assignment.task}</h4></Link>{assignment.completed ? <h4 className="display2">Completed</h4>: <h4 className="display2">Active</h4>}{assignment.urgent ? <h4 className="display">Urgent</h4>: <h4 className="display">Standard</h4>}<h4 className="display">{assignment.overdue ? <span className="flagged">Overdue </span>: "Due"}</h4><h4 className="display">{assignment.flagged ? <span className="flagged">Flagged</span> : "Unflagged"}</h4><h4 className="display2">{assignment.assignee}</h4>{assignment.assignee !== "unassigned" ? assignment.assignee === user ?<button onClick={cancel}>Drop</button> : <button className="button3"><Link className="linkR" to={`/assignments/${assignment.id}`}>View</Link></button>: <button className="button3" onClick={(event) => claim(assignment, user)}>Claim</button> }</div>): assignments.filter(foundAssignment => {
        if (foundAssignment.assignee !== user) {
          return foundAssignment;
        } else {
          return 
        }
      }).filter(foundAssignment => {
        if (foundAssignment.assignee === "unassigned") {
          return foundAssignment;
        } else {
          return 
        }
      }).filter(foundAssignment => {
        if (search === "") {
          return foundAssignment;
        } else if (foundAssignment.task.toLowerCase().includes(search.toLowerCase())) {
          return foundAssignment
        }
      }).map((assignment, index) => <div key={index}className="dashData"><Link  to={`/assignments/${assignment.id}`}><h4>{assignment.task}</h4></Link>{assignment.completed ? <h4>Closed</h4>: <h4>Active</h4>}{assignment.urgent ? <h4>Urgent</h4>: <h4>Standard</h4>}<h4>{assignment.overdue ? <span className="flagged">Overdue </span>: "Due"}</h4><h4>{assignment.flagged ? <span className="flagged">Flagged</span> : "Unflagged"}</h4><h4>{assignment.assignee}</h4><div className="buttons">{assignment.assignee !== "unassigned" ? assignment.assignee === user ?<button className="button3" onClick={(event) => cancel(assignment)}>Drop</button> : <Link to={`/assignments/${assignment.id}`}><button className="button3">View</button></Link>: <button className="button3" onClick={(event) => claim(assignment, user)}>Claim</button>}</div></div>)}
    </section>
}

export default Home




