import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/session";
import { setModal } from "../../store/modal";
import './LoginSignup.css'
import { useEffect }  from "react";

export default function LoginForm(){

    const sessionErrors = useSelector(state=> state.errors?.session)
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState({})
    useEffect(()=>{
        if (sessionErrors){
            setErrors(sessionErrors)
        }
        
    }, [sessionErrors])

    function handleSubmit(e){
        e.preventDefault();
        const newUser = {email, password}
        dispatch(login(newUser))
    }
    function demoLogin(e){
        e.preventDefault()
        dispatch(login({email: "demo@email.com", password: "password"}))
    }
    function swapForm(){
        dispatch(setModal("signUp"))
    }
    const modalState = useSelector(state => state.modals?.modalState)
    if (modalState && modalState === "logIn"){
        return(
            <div className="page-overlay">
                <form className="login-signup-form" onSubmit={handleSubmit}>
                    <h1>log in to magellan</h1> 
                    <label><p>email:</p>
                        <input type="text" name="email" value={email} onChange={e => setEmail(e.target.value)} className="login-input-text"/>
                    </label>
                    {errors.email && <p className="error">{errors.email}</p>}
                    <label><p>password:</p>
                        <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} className="login-input-text"/>
                    </label>
                    {errors.password && <p className="error">{errors.password}</p>}
                    <input type="submit" value="log in" className="submit-button"/>
                    <button className="demo-login" onClick={demoLogin}>log in with demo user</button>
                       <p className="footer-text">Don't have an account?<button className="form-swap" onClick={swapForm}>sign up!</button></p> 
                </form>
            </div>
        )
    }else{
        return null
    }
}