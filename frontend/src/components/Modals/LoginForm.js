import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/session";
import { setModal } from "../../store/modal";
import './LoginSignup.css';
import { useEffect }  from "react";

export default function LoginForm(){
    const sessionErrors = useSelector(state=> state.errors?.session);
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (sessionErrors){
            setErrors(sessionErrors);
        }
    }, [sessionErrors]);

    function handleSubmit(e){
        e.preventDefault();
        const newUser = {email, password};
        dispatch(login(newUser));
    }

    function demoLogin(e){
        e.preventDefault();
        dispatch(login({
            email: "demo@email.com",
            password: "password"
        }));
    }

    function swapForm(){
        dispatch(setModal("signUp"));
    }

    const modalState = useSelector(state => state.modals?.modalState);
    if (modalState && modalState === "logIn"){
        return(
            <div className="page-overlay">
                <form className="login-signup-form" onSubmit={handleSubmit}>
                    <h1>log in</h1> 
                    <label>
                        <p>Email:</p>
                        <input 
                            type="text" 
                            name="email" 
                            placeholder="Email" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                            className="login-input-text"
                        />
                    </label>
                    {errors.email && <p className="error">{errors.email}</p>}
                    <label>
                        <p>Password:</p>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={e => setPassword(e.target.value)} 
                            className="login-input-text"
                        />
                    </label>
                    {errors.password && <p className="error">{errors.password}</p>}
                    <input type="submit" value="log in" className="submit-button"/>
                    <button className="demo-login" onClick={demoLogin}>log in as demo user</button>
                    <div className="footer-text"> 
                        Don't have an account? 
                        <span onClick={swapForm} className="form-swap">Sign up!</span> 
                    </div>
                </form>
            </div>
        );
    } else {
        return null;
    }
}
