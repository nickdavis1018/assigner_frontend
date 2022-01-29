import React from "react"
import { Link } from "react-router-dom";
import "../App.css";

function Dashboard({ userList, user, assignments, getAssignments, logout }){
    
    const [search, setSearch] = React.useState("")

    React.useEffect(() => getAssignments(), [])

        const userArray = userList
        console.log(userArray)
        const assignmentArray = assignments
        console.log(assignments)
        const testUsers = []
        const dashboardArray = []
        for(let i=0; i < userArray.length; i++){
        if(userArray[i].username !== "nicholasdavis"){
            for(let x=0;x < assignmentArray.length; x++){
                if(userArray[i].username === assignmentArray[x].assignee && testUsers.includes(userArray[i].username) === false){
                    if(assignmentArray[x].flagged === true && assignmentArray[x].overdue === true && assignmentArray[x].completed === true){
                    dashboardArray.push({first: userArray[i].first_name, last: userArray[i].last_name, username: userArray[i].username, count: 1, overdue: 1, flagged: 1, closed: 1, active: 0, email: userArray[i].email})
                    testUsers.push(userArray[i].username)}
                    else if(assignmentArray[x].flagged === true && assignmentArray[x].overdue === true && assignmentArray[x].completed === false){
                        dashboardArray.push({first: userArray[i].first_name, last: userArray[i].last_name, username: userArray[i].username, count: 1, overdue: 1, flagged: 1, closed: 0, active: 1, email: userArray[i].email})
                        testUsers.push(userArray[i].username)}
                    else if(assignmentArray[x].overdue === true && assignmentArray[x].flagged === false && assignmentArray[x].completed === true){
                        dashboardArray.push({first: userArray[i].first_name, last: userArray[i].last_name, username: userArray[i].username, count: 1, overdue: 1, flagged: 0, closed: 1, active: 0, email: userArray[i].email})
                        testUsers.push(userArray[i].username)}
                    else if(assignmentArray[x].overdue === true && assignmentArray[x].flagged === false && assignmentArray[x].completed === false){
                        dashboardArray.push({first: userArray[i].first_name, last: userArray[i].last_name, username: userArray[i].username, count: 1, overdue: 1, flagged: 0, closed: 0, active: 1, email: userArray[i].email})
                        testUsers.push(userArray[i].username)}
                    else if(assignmentArray[x].overdue === false && assignmentArray[x].flagged === true && assignmentArray[x].completed === true){
                        dashboardArray.push({first: userArray[i].first_name, last: userArray[i].last_name, username: userArray[i].username, count: 1, overdue: 0, flagged: 1, closed: 1, active: 0, email: userArray[i].email})
                        testUsers.push(userArray[i].username)}
                    else if(assignmentArray[x].overdue === false && assignmentArray[x].flagged === true && assignmentArray[x].completed === false){
                        dashboardArray.push({first: userArray[i].first_name, last: userArray[i].last_name, username: userArray[i].username, count: 1, overdue: 0, flagged: 1, closed: 1, active: 0, email: userArray[i].email})
                        testUsers.push(userArray[i].username)}
                    else if(assignmentArray[x].overdue === false && assignmentArray[x].flagged === false && assignmentArray[x].completed === true){
                        dashboardArray.push({first: userArray[i].first_name, last: userArray[i].last_name, username: userArray[i].username, count: 1, overdue: 0, flagged: 0, closed: 1, active: 0, email: userArray[i].email})
                        testUsers.push(userArray[i].username)}
                    else if(assignmentArray[x].overdue === false && assignmentArray[x].flagged === false && assignmentArray[x].completed === false){
                        dashboardArray.push({first: userArray[i].first_name, last: userArray[i].last_name, username: userArray[i].username, count: 1, overdue: 0, flagged: 0, closed: 0, active: 1, email: userArray[i].email})
                        testUsers.push(userArray[i].username)}
                    }
                    else if(userArray[i].username === assignmentArray[x].assignee && testUsers.includes(userArray[i].username) === true){
                        for(let u=0; u < dashboardArray.length; u++){
                            if(dashboardArray[u].username === userArray[i].username){
                            dashboardArray[u].count = dashboardArray[u].count + 1
                            if(assignmentArray[x].flagged === true){
                                dashboardArray[u].flagged = dashboardArray[u].flagged + 1
                            }
                            if(assignmentArray[x].overdue === true){
                                dashboardArray[u].overdue = dashboardArray[u].overdue + 1
                            }
                            if(assignmentArray[x].completed === true){
                                dashboardArray[u].closed = dashboardArray[u].closed + 1
                            }
                            else if(assignmentArray[x].completed === false){
                                dashboardArray[u].active = dashboardArray[u].active + 1
                            }
                    }} 
                }
        }}}
                
        console.log(dashboardArray)
        dashboardArray.sort((a, b) => (a.count < b.count) ? 1 : -1)
    

    return <><section className="list"><div className="labelTitleAll"><div className="labelTitle"><h1>Manager Dashbboard</h1></div><div><input className="searchBar" placeholder="Browse Users..." onChange={event => setSearch(event.target.value)} /></div></div><div className="dash">
        <div className="dashHeader"><h4 className="userName">Username</h4><h4 className="display2">Assignments</h4><h4 className="display2">Active</h4><h4 className="display">Overdue</h4><h4 className="display">Flagged</h4><h4 className="display">Closed</h4><h4 className="display3">Contact</h4></div>
        {dashboardArray.filter(foundUser => {
        if (search === "") {
          return foundUser;
        } else if (foundUser.username.toLowerCase().includes(search.toLowerCase())) {
          return foundUser
        }
      }).map((user, index) => <div key={index} className="dashData"><h4 className="userName">{user.first} {user.last}</h4><h4 className="display2">{user.count}</h4><h4 className="display2">{user.active}</h4><h4 className="display">{user.overdue}</h4><h4 className="display">{user.flagged}</h4><h4 className="display">{user.closed}</h4><a className="emailLink" href={"mailto: " + user.email}><img className="img" src="https://imgur.com/unI173E.png"/></a></div>)}
    </div>
    </section>
    </> 
    }

export default Dashboard