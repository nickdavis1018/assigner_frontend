import React from "react"
import { Link } from "react-router-dom";
import "../App.css";

function UserDash({ userList, user, assignments, logout }){
  
        const assignmentArray = assignments
        const testUsers = []
        const dashUser = {count: 0, overdue: 0, flagged: 0, closed: 0, active: 0}
        console.log(assignmentArray)

            for(let x=0;x < assignmentArray.length; x++){
                if(user === assignmentArray[x].assignee){
                            dashUser.count = dashUser.count + 1
                            if(assignmentArray[x].flagged === true){
                                dashUser.flagged = dashUser.flagged + 1
                            }
                            if(assignmentArray[x].overdue === true){
                                dashUser.overdue = dashUser.overdue + 1
                            }
                            if(assignmentArray[x].completed === true){
                                dashUser.closed = dashUser.closed + 1
                            }
                            else if(assignmentArray[x].completed === false){
                                dashUser.active = dashUser.active + 1
                            
                    }
                }
            }


    return <div><div className="dash2">
        <div className="dashHeader2"><h5 className="border">My Assignments</h5><h5>Active</h5><h5 className="display3">Overdue</h5><h5 className="display3">Flagged</h5><h5>Closed</h5></div>
        <div className="dashData2"><h5 className="border">{dashUser.count}</h5><h5>{dashUser.active}</h5><h5 className="display3">{dashUser.overdue}</h5><h5 className="display3">{dashUser.flagged}</h5><h5>{dashUser.closed}</h5></div>
    </div>
    </div> 
    }

export default UserDash