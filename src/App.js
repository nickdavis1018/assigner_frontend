import logo from './logo.svg';
import './App.css';
import {Route, Switch} from "react-router-dom"
import React from "react"
import Login from "./pages/Login"
import Assignments from './pages/Assignments';
import Management from './pages/Management';
import Home from './pages/Home'
import SingleAssignment from './pages/SingleAssignment'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import SignUp from './pages/SignUp'
import UserDash from './components/UserDash'

function App(props) {

  const [token, setToken] = React.useState({})

  const [user, setUser] = React.useState(localStorage.getItem("username"))

  const [userList, setUserList] = React.useState([])

  const [assignments, setAssignments] = React.useState([])

  const URL = "https://assigner-database.herokuapp.com/"

  React.useEffect(() => {
    const possibleToken = JSON.parse(localStorage.getItem("token"))
    const possibleUser = localStorage.getItem("username")
    setToken(possibleToken)
    setUser(possibleUser)
  }, [])

  const getToken = async (un, pw) => {
    const response = await fetch(URL + "api/token/", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({username: un, password: pw})
    }).then( async (response) => {const data = await response.json()
    return data}).then(data => {
      if(data.access){
      localStorage.setItem("token", JSON.stringify(data))
      localStorage.setItem("username", un)
      props.history.push('/')
      window.location.href = "/"
      }
      else{
        return
      }
    })
  }

  const logout = ()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    setToken({})
    setUser("")
    props.history.push("/login")
  }




  const getAssignments = async () => {
    const submitToken = JSON.parse(localStorage.getItem("token"))
    if(submitToken === null){
      props.history.push("/login")
    }
    else{
    const response = await fetch(URL + 'assignments/', {
    method: "get",
    headers: {
        Authorization: `Bearer ${submitToken.access}`
    }
})
const data = await response.json()
if(data.code === "token_not_valid"){
  logout()
  props.history.push("/login")
}
else{
setAssignments(data)}
}}

React.useEffect(() => getAssignments(), [])

const deleteAssignment = async (assignment) => {
  const submitToken = JSON.parse(localStorage.getItem("token"))
  const response = await fetch(URL + 'assignments/' + assignment.id + "/", {
    method: "delete",
    headers: {
      Authorization: `Bearer ${submitToken.access}`}
  });
  getAssignments();
  props.history.push("/management");
};


const updateAssignment = async (events, id) => {
  const submitToken = JSON.parse(localStorage.getItem("token"))
  await fetch(URL + 'assignments/' + id  + "/", {
    method: "put",
    headers: {
      Authorization: `Bearer ${submitToken.access}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(events),
  })
  getAssignments()
}

const getUsers = async () => {
  const response = await fetch(URL + 'user/', {
  method: "get",
})
const data = await response.json()
setUserList(data)
}

React.useEffect(() => getUsers(), [])

for(let i=0; i < userList.length; i++){
  if(userList[i].username === user){
    let roleCheck = userList[i]
    if(roleCheck.is_staff === true){
      localStorage.setItem("manager", true)
    }
    else if(roleCheck.is_staff === false){
      localStorage.setItem("manager", false)
    }
  }
}



console.log(user)
return (
    <div className="App">
      <Header user={token} logout={logout}/>
      {user !== null && user !== "" && user !== undefined  ? <UserDash user={user} userList={userList} getAssignments={getAssignments} assignments={assignments} logout={logout}/>: ""}
      <Switch className="masterData">
      <Route exact path="/" render={(rp) => <Home user={user} updateAssignment={updateAssignment} getAssignments={getAssignments} assignments={assignments} {...rp}/>}/>
      <Route exact path="/assignments" render={(rp) => <Assignments user={user} getAssignments={getAssignments} updateAssignment={updateAssignment} deleteAssignment={deleteAssignment} setAssignments={setAssignments} assignments={assignments} {...rp}/>}/>
      <Route path="/assignments/:id" render={(rp) => <SingleAssignment user={user} role={localStorage.getItem("manager")} userList={userList} updateAssignment={updateAssignment}deleteAssignment={deleteAssignment} assignments={assignments} {...rp}/>}/>
      <Route exact path="/login" render={(rp) => <Login logout={logout} getToken={getToken} {...rp}/>}/>
      <Route exact path="/signup" render={(rp) => <SignUp URL={URL} logout={logout} getToken={getToken} {...rp}/>}/>
      <Route exact path="/management" render={(rp) => <Management user={user} userList={userList} URL={URL} updateAssignment={updateAssignment}deleteAssignment={deleteAssignment} assignments={assignments} getAssignments={getAssignments} {...rp}/>}/>
      <Route exact path="/dashboard" render={(rp) => <Dashboard user={user} userList={userList} getAssignments={getAssignments} assignments={assignments} logout={logout}/>}/>
      </Switch>
    </div>
    
  );
}

export default App;
