import React from "react"

const SignUp = (props) => {

    const possibleToken = JSON.parse(localStorage.getItem("token"))

    console.log(possibleToken)

    const username = React.useRef(null)
    const password = React.useRef(null)
    const email = React.useRef(null)

    const createAccount = async (un, pw, eml) => {
        const response = await fetch(props.URL + "user/", {
          method: "post",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({username: un, password: pw, email: eml})
        }).then( async (response) => {const data = await response.json()
        return data}).then(data => {
          props.logout()
          props.history.push("/login")
        })
      }


    const handleSignUp = (event) => {
        event.preventDefault()
        const un = username.current.value
        const pw = password.current.value
        const eml = email.current.value
        createAccount(un, pw, eml)
        console.log(un, pw, eml)
        username.current.value = ""
        password.current.value = ""
        email.current.value = ""
    }

    return <div>
        <input type="text" name="username" ref={username}/>
        <input type="text" name="password" ref={password}/>
        <input type="text" name="email" ref={email}/>
        <button onClick={handleSignUp}>Sign Up</button>
    </div>
}

export default SignUp