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

function App(props) {

  const [token, setToken] = React.useState({})

  const [user, setUser] = React.useState("")

  const [userList, setUserList] = React.useState([])

  const [assignments, setAssignments] = React.useState([])

  const [search, setSearch] = React.useState("")

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
      console.log(data)
      setToken(data)
      console.log(localStorage.getItem("token"))
      props.history.push("/home")}
      else{
        console.log(data)
      }
    })
  }

  React.useEffect(() => {
    const possibleToken = JSON.parse(localStorage.getItem("token"))
    const possibleUser = localStorage.getItem("username")
    if(possibleToken !== null){
      console.log(possibleToken)
      setToken(possibleToken)
      setUser(possibleUser)
      console.log(user)
    }
    else{
    setUser(null)
    props.history.push('/login')}
  }, [])

  const logout = ()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    setToken({})
  }

  const getAssignments = async () => {
    if(
      JSON.parse(localStorage.getItem("token")) !== null
    ){
    const submitToken = JSON.parse(localStorage.getItem("token"))
    console.log(submitToken.access)
    const response = await fetch(URL + 'assignment/', {
    method: "get",
    headers: {
        Authorization: `Bearer ${submitToken.access}`
    }
})
const data = await response.json()
console.log(data)
setAssignments(data)
}
  else{
    return
  }
}
React.useEffect(() => getAssignments(), [])

const deleteAssignment = async (assignment) => {
  const submitToken = JSON.parse(localStorage.getItem("token"))
  const response = await fetch(URL + 'assignment/' + assignment.id + "/", {
    method: "delete",
    headers: {
      Authorization: `Bearer ${submitToken.access}`}
  });
  getAssignments();
  props.history.push("/");
};

const updateAssignment = async (events, id) => {
  const submitToken = JSON.parse(localStorage.getItem("token"))
  await fetch(URL + 'assignment/' + id  + "/", {
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

console.log(user)

return (
    <div className="App">
      <Header user={token} logout={logout}/>
      <Dashboard user={token} userList={userList} getAssignments={getAssignments} assignments={assignments} logout={logout}/>
      <Switch>
      <Route exact path="/home" render={(rp) => <Home user={user} search={search} setSearch={setSearch} getAssignments={getAssignments} assignments={assignments} {...rp}/>}/>
      <Route exact path="/assignments" render={(rp) => <Assignments search={search} setSearch={setSearch} user={user} getAssignments={getAssignments} setAssignments={setAssignments} assignments={assignments} {...rp}/>}/>
      <Route path="/assignments/:id" render={(rp) => <SingleAssignment user={user} userList={userList} updateAssignment={updateAssignment}deleteAssignment={deleteAssignment} assignments={assignments} {...rp}/>}/>
      <Route exact path="/login" render={(rp) => <Login logout={logout} getToken={getToken} {...rp}/>}/>
      <Route exact path="/signup" render={(rp) => <SignUp URL={URL} logout={logout} getToken={getToken} {...rp}/>}/>
      <Route exact path="/management" render={(rp) => <Management search={search} setSearch={setSearch} user={user} userList={userList} URL={URL} assignments={assignments} getAssignments={getAssignments} {...rp}/>}/>
      </Switch>
    </div>
  );
}

export default App;
