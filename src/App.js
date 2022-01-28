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
import Footer from './components/Footer'
import Dashboard from './components/Dashboard'
import SignUp from './pages/SignUp'
import UserDash from './components/UserDash'

function App(props) {

  const [token, setToken] = React.useState({})

  const [user, setUser] = React.useState(localStorage.getItem("username"))

  const [userList, setUserList] = React.useState([])

  const [assignments, setAssignments] = React.useState([])

  const URL = "http://localhost:8000/"

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
      window.location.href = "/assignments"
      console.log(localStorage.getItem("token"))}
      else{
        console.log(data)
      }
    })
  }

  const logout = ()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    setToken({})
    setUser(null)
  }

  React.useEffect(() => {
    const possibleToken = JSON.parse(localStorage.getItem("token"))
    const possibleUser = localStorage.getItem("username")
    console.log(possibleUser)
    console.log(possibleToken)
    setToken(possibleToken)
    setUser(possibleUser)
    console.log(user)
  }, [])


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
console.log(data)
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

console.log(localStorage.getItem("manager"))

return (
    <div className="App">
      <Header user={token} logout={logout}/>
      <UserDash user={user} userList={userList} getAssignments={getAssignments} assignments={assignments} logout={logout}/>
      <Switch className="masterData">
      <Route exact path="/" render={(rp) => <Home user={user} getAssignments={getAssignments} assignments={assignments} {...rp}/>}/>
      <Route exact path="/assignments" render={(rp) => <Assignments user={user} getAssignments={getAssignments} setAssignments={setAssignments} assignments={assignments} {...rp}/>}/>
      <Route path="/assignments/:id" render={(rp) => <SingleAssignment user={user} userList={userList} updateAssignment={updateAssignment}deleteAssignment={deleteAssignment} assignments={assignments} {...rp}/>}/>
      <Route exact path="/login" render={(rp) => <Login logout={logout} getToken={getToken} {...rp}/>}/>
      <Route exact path="/signup" render={(rp) => <SignUp URL={URL} logout={logout} getToken={getToken} {...rp}/>}/>
      <Route exact path="/management" render={(rp) => <Management user={user} userList={userList} URL={URL} assignments={assignments} getAssignments={getAssignments} {...rp}/>}/>
      <Route exact path="/dashboard" render={(rp) => <Dashboard user={token} userList={userList} getAssignments={getAssignments} assignments={assignments} logout={logout}/>}/>
      </Switch>
      <Footer className="fixed" user={token} logout={logout}/>
    </div>
  );
}

export default App;
