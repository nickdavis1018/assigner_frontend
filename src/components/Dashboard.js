import React from "react"
import { Link } from "react-router-dom";
import "../App.css";

function Dashboard({ userList, assignments, getAssignments, logout }){

    React.useEffect(() => getAssignments(), [])

        const userArray = userList
        console.log(userArray)
        const assignmentArray = assignments
        console.log(assignments)
        const testUsers = []
        const dashboardArray = []
        for(let i=0; i < userArray.length; i++){
            for(let x=0;x < assignmentArray.length; x++){
                if(userArray[i].username === assignmentArray[x].assignee && testUsers.includes(userArray[i].username) === false){
                    console.log(dashboardArray)
                    if(assignmentArray[x].flagged === true && assignmentArray[x].overdue === true && assignmentArray[x].completed === true){
                        console.log(dashboardArray)
                    dashboardArray.push({first: userArray[i].first_name, last: userArray[i].last_name, username: userArray[i].username, count: 1, overdue: 1, flagged: 1, closed: 1, active: 0, email: userArray[x].email})
                    console.log(dashboardArray)
                    testUsers.push(userArray[i].username)}
                    else if(assignmentArray[x].flagged === true && assignmentArray[x].overdue === true && assignmentArray[x].completed === false){
                        dashboardArray.push({first: userArray[i].first_name, last: userArray[i].last_name, username: userArray[i].username, count: 1, overdue: 1, flagged: 1, closed: 0, active: 1, email: userArray[x].email})
                        testUsers.push(userArray[i].username)}
                    else if(assignmentArray[x].overdue === true && assignmentArray[x].flagged === false && assignmentArray[x].completed === true){
                        console.log(dashboardArray)
                        dashboardArray.push({first: userArray[i].first_name, last: userArray[i].last_name, username: userArray[i].username, count: 1, overdue: 1, flagged: 0, closed: 1, active: 0, email: userArray[x].email})
                        testUsers.push(userArray[i].username)}
                    else if(assignmentArray[x].overdue === true && assignmentArray[x].flagged === false && assignmentArray[x].completed === false){
                        dashboardArray.push({first: userArray[i].first_name, last: userArray[i].last_name, username: userArray[i].username, count: 1, overdue: 1, flagged: 0, closed: 0, active: 1, email: userArray[x].email})
                        testUsers.push(userArray[i].username)}
                    else if(assignmentArray[x].overdue === false && assignmentArray[x].flagged === true && assignmentArray[x].completed === true){
                        dashboardArray.push({first: userArray[i].first_name, last: userArray[i].last_name, username: userArray[i].username, count: 1, overdue: 0, flagged: 1, closed: 1, active: 0, email: userArray[x].email})
                        testUsers.push(userArray[i].username)}
                    else if(assignmentArray[x].overdue === false && assignmentArray[x].flagged === true && assignmentArray[x].completed === false){
                        dashboardArray.push({first: userArray[i].first_name, last: userArray[i].last_name, username: userArray[i].username, count: 1, overdue: 0, flagged: 1, closed: 1, active: 0, email: userArray[x].email})
                        testUsers.push(userArray[i].username)}
                    else if(assignmentArray[x].overdue === false && assignmentArray[x].flagged === false && assignmentArray[x].completed === true){
                        dashboardArray.push({first: userArray[i].first_name, last: userArray[i].last_name, username: userArray[i].username, count: 1, overdue: 0, flagged: 0, closed: 1, active: 0, email: userArray[x].email})
                        testUsers.push(userArray[i].username)}
                    else if(assignmentArray[x].overdue === false && assignmentArray[x].flagged === false && assignmentArray[x].completed === false){
                        dashboardArray.push({first: userArray[i].first_name, last: userArray[i].last_name, username: userArray[i].username, count: 1, overdue: 0, flagged: 0, closed: 0, active: 1, email: userArray[x].email})
                        testUsers.push(userArray[i].username)}
                        console.log(dashboardArray)
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
            }}
                
        console.log(dashboardArray)
        dashboardArray.sort((a, b) => (a.count < b.count) ? 1 : -1)
    

    return <><div className="dash">
        <h5 className="dashTitle">Task Tracker</h5>
        <div className="dashHeader"><h5 className="userName">Username</h5><h5>Assignments</h5><h5>Active</h5><h5>Overdue</h5><h5>Flagged</h5><h5>Closed</h5><h5>Contact</h5></div>
        {dashboardArray.map((user, index) => <div key={index} className="dashData"><h5 className="userName">{user.first} {user.last}</h5><h5>{user.count}</h5><h5>{user.active}</h5><h5 className="userOverdue">{user.overdue}</h5><h5 className="userFlagged">{user.flagged}</h5><h5>{user.closed}</h5><a className href={"mailto: " + user.email.toString()}><img className="img" src="https://imgur.com/unI173E.png"/></a></div>)}
    </div>
    </> 
    }

export default Dashboard