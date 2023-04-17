import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/session";
import { setModal } from "../../store/modal";
import './LoginSignup.css'

export default function LoginForm(){

    
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState({})

    function handleSubmit(e){
        e.preventDefault();
        const newUser = {email, password}
        return dispatch(login(newUser))
        .catch(async (res) => {
            let data;
            try {
              data = await res.clone().json();
            } catch {
              data = await res.text();
            }
            if (data?.errors) setErrors(data.errors);
            else if (data) setErrors([data]);
            else setErrors([res.statusText]);
            console.log(data);
          });
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
                    <h1>log in to magellan!</h1> 
                    <label><p>email:</p>
                        <input type="text" name="email" value={email} onChange={e => setEmail(e.target.value)}/>
                    </label>
                    {errors.email && <p className="error">{errors.email}</p>}
                    <label><p>password:</p>
                        <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)}/>
                    </label>
                    {errors.password && <p className="error">{errors.password}</p>}
                    <input type="submit" value="sign up" className="submit-button"/>
                    <button className="demo-login" onClick={demoLogin}>login with demo user</button>
                    
                    <div className="form-bottom">
                       <p>Don't have an account?<button className="form-swap" onClick={swapForm}>sign up</button></p> 
                    </div>
                </form>
            </div>
        )
    }else{
        return null
    }
}