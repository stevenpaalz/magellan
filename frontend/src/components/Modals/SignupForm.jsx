import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../store/session";
import { setModal } from "../../store/modal";
import USstates from "../../../data/States";
import './LoginSignup.css'

export default function SignUpFormForm(){
    const modalState = useSelector(state => state.modal.modalState)
    const dispatch = useDispatch()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [homeCity, setHomeCity] = useState("")
    const [homeState, setHomeState] = useState()
    const [errors, setErrors] = useState({})
    

    function handleSubmit(e){
        e.preventDefault();
        if (password === confirmPassword){
            const newUser = {firstName, lastName, homeCity: `${homeCity}, ${homeState}`, email, password}
            return dispatch(signup(newUser))
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

        }else{
            setErrors({confirmPassword: "password and confirmpassword do not match!"})
        }
        
    }
    function swapForm(){
        dispatch(setModal("signUp"))
    }
    if (modalState!=="signUp"){
        return null
    }else{
        return(
            <div className="page-overlay">
                <form className="login-signup-form" onSubmit={handleSubmit}>
                    <h1>sign up for magellan!</h1> 
                    <label>first name
                        <input type="text" name="firstName" value={firstName} onChange={e => setFirstName(e.target.value)}/>
                    </label>
                    {errors.firstName && <p className="error">{errors.firstName}</p>}
                    <label>last name
                        <input type="text" name="lastName" value={lastName} onChange={e => setLastName(e.target.value)}/>
                    </label>
                    {errors.lastName && <p className="error">{errors.lastName}</p>}
                    <label>email
                        <input type="text" name="email" value={email} onChange={e => setEmail(e.target.value)}/>
                    </label>
                    {errors.email && <p className="error">{errors.email}</p>}
                    <label>home city
                        <input type="text" name="homeCity" value={homeCity} onChange={e => setHomeCity(e.target.value)}/>
                    </label>
                    {errors.homeCity && <p className="error">{errors.homeCity}</p>}
                    <select name="homeState">
                        <option disabled selected value="">State</option>
                        {USstates.map((state)=><option value={state} onChange={e=>setHomeState(e.target.value)}>{state}</option>)}
                    </select>
                    {errors.homeState && <p className="error">{errors.homeState}</p>}
                    <label>password
                        <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)}/>
                    </label>
                    {errors.password && <p className="error">{errors.password}</p>}
                    <label>confirm password
                        <input type="password" name="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
                    </label>
                    {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                    <input type="submit" value="sign up"/>
    
                       <p>Already have an account?<button className="form-swap" onClick={swapForm}>log in</button></p> 
                    
                </form>
            </div>
        )
    }
}