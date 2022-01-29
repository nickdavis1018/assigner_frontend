import React from "react"
import {Link} from "react-router-dom"

const Home = ({assignments, user, getAssignments}) => {

    const [search, setSearch] = React.useState("")

    const [toggle, setToggle] = React.useState(false) 

    const possibleToken = JSON.parse(localStorage.getItem("token"))
    const possibleRole = JSON.parse(localStorage.getItem("manager"))

    const toggleShow = () => {
        setToggle(true)
    }

    const toggleDontShow = () => {
        setToggle(false)
    }


    return <section className="list"><div className="labelTitleAll"><div className="labelTitle"><h1>Find Assignments</h1>{toggle === false ? <button onClick={toggleShow}>Show Unassigned</button> : <button onClick={toggleDontShow}>Show All</button>}</div><div><input className="searchBar" placeholder="Browse..." onChange={event => setSearch(event.target.value)} /></div></div><div className="dashHeader"><h1>Task</h1><h1>Status</h1><h1>Priority</h1><h1>Delivery</h1><h1>Review</h1><h1>Assignee</h1><h1>Actions</h1></div>{toggle === false ? assignments.filter(foundAssignment => {
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
      }).map((assignment, index) => <Link key={index} to={`/assignments/${assignment.id}`}><div className="dashData"><h1>{assignment.task}</h1>{assignment.completed ? <h2>Closed</h2>: <h2>Active</h2>}{assignment.urgent ? <h2>Urgent</h2>: <h2>Standard</h2>}<h2>{assignment.overdue ? <span className="flagged">"Overdue" </span>: "On-time"}</h2><h2>{assignment.flagged ? <span className="flagged">Flagged</span> : "Unflagged"}</h2><h2>{assignment.assignee}</h2>{assignment.assignee !== "unassigned" ? assignment.assignee === user ?<button>Drop</button> : <button>View </button>: <button>Claim</button> }</div></Link>): assignments.filter(foundAssignment => {
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
      }).map((assignment, index) => <Link key={index} to={`/assignments/${assignment.id}`}><div className="dashData"><h1>{assignment.task}</h1>{assignment.completed ? <h2>Closed</h2>: <h2>Active</h2>}{assignment.urgent ? <h2>Urgent</h2>: <h2>Standard</h2>}<h2>{assignment.overdue ? <span className="flagged">"Overdue" </span>: "On-time"}</h2><h2>{assignment.flagged ? <span className="flagged">Flagged</span> : "Unflagged"}</h2><h2>{assignment.assignee}</h2>{assignment.assignee !== "unassigned" ? assignment.assignee === user ? assignment.completed? <button>Open</button> : <button>Close</button> : <button>View </button> : <button>Claim</button> }</div></Link>)}
    </section>
}

export default Home




