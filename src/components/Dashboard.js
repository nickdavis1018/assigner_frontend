import React from "react"
import { Link } from "react-router-dom";
import "../App.css";

function Dashboard({ userList, assignments, getAssignments, logout }){

    React.useEffect(() => getAssignments(), [])

        const userArray = userList
        const assignmentArray = assignments
        const testUsers = []
        const dashboardArray = []
        for(let i=0; i < userArray.length; i++){
            for(let x=0;x < assignmentArray.length; x++){
                if(userArray[i].username === assignmentArray[x].assignee && testUsers.includes(userArray[i].username) === false){
                    if(assignmentArray[x].flagged === true && assignmentArray[x].overdue === true){
                    dashboardArray.push({username: userArray[i].username, count: 1, overdue: 1, flagged: 1})
                    testUsers.push(userArray[i].username)}
                    else if(assignmentArray[x].overdue === true && assignmentArray[x].flagged === false){
                        dashboardArray.push({username: userArray[i].username, count: 1, overdue: 1, flagged: 0})
                        testUsers.push(userArray[i].username)}
                        else if(assignmentArray[x].overdue === false && assignmentArray[x].flagged === true){
                    dashboardArray.push({username: userArray[i].username, count: 1, overdue: 0, flagged: 1})
                    testUsers.push(userArray[i].username)}
                    else if(assignmentArray[x].overdue === false && assignmentArray[x].flagged === false){
                        dashboardArray.push({username: userArray[i].username, count: 1, overdue: 0, flagged: 0})
                        testUsers.push(userArray[i].username)}}
                else if(userArray[i].username === assignmentArray[x].assignee && testUsers.includes(userArray[i].username) === true){
                    for(let u=0; u < dashboardArray.length; u++){
                        if(dashboardArray[u].username === userArray[i].username){
                            dashboardArray[u].count = dashboardArray[u].count + 1
                            if(assignmentArray[x].flagged === true){
                                dashboardArray[u].flagged = dashboardArray[u].flagged + 1
                            }
                            if(assignmentArray[x].overdue === true){
                                dashboardArray[u].overdue = dashboardArray[u].flagged + 1
                            }
                    }} 
                }
            }}
                
        console.log(dashboardArray)
        dashboardArray.push({username: "test", count: 6, overdue: 1, flagged: 1})
        dashboardArray.push({username: "testerman", count: 0, overdue: 1, flagged: 1})
        dashboardArray.sort((a, b) => (a.count < b.count) ? 1 : -1)
    

    return <><div className="dash">
        <h5 className="dashTitle">Task Tracker</h5>
        <div className="dashHeader"><h5 className="userName">Username</h5><h5>Assignments</h5><h5>Overdue</h5><h5>Flagged</h5></div>
        {dashboardArray.map((user, index) => <div key={index} className="dashData"><h5 className="userName">{user.username}</h5><h5>{user.count}</h5><h5 className="userOverdue">{user.overdue}</h5><h5 className="userFlagged">{user.flagged}</h5></div>)}
    </div>
    </> 
    }

export default Dashboard