import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";


export default function SignUpFormForm(){
    const [signupform, setSignupform] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errors, setErrors] = useState({})

    function handleSubmit(){
        if (password === confirmPassword){
            const newUser = {firstName, lastName, email, password}
            // dispatch signup action

        }else{
            setErrors({confirmPassword: "password and confirmpassword do not match!"})
        }
        
    }
    
    return(
        <div className="page-overlay">
            <form className="login-signup-form" onSubmit={handleSubmit}>
                <h1>sign up for magellan!</h1> 
                <label>first name
                    <input type="text" name="firstName" value={firstName} onChange={e => setFirstName(e.target.value)}/>
                </label>
                <label>last name
                    <input type="text" name="lastName" value={lastName} onChange={e => setLastName(e.target.value)}/>
                </label>
                <label>email
                    <input type="text" name="email" value={email} onChange={e => setEmail(e.target.value)}/>
                </label>
                <label>password
                    <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)}/>
                </label>
                <label>confirm password
                    <input type="password" name="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
                </label>
                <input type="submit" value="sign up"/>

                <div className="form-bottom">
                   <p>Already have an account?<button className="form-swap">log in</button></p> 
                </div>
            </form>
        </div>
    )
}