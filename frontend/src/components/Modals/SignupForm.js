import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../store/session";
import { setModal } from "../../store/modal";
import USstates from "../../data/States";
import './LoginSignup.css'
import profileUrls from "../../data/ProfileImgUrls";
import { useEffect }  from "react";
import { useHistory } from "react-router-dom";

export default function SignUpForm(){
    const modalState = useSelector(state => state.modals?.modalState)
    const sessionErrors = useSelector(state=> state.errors?.session)
    const dispatch = useDispatch()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [homeCity, setHomeCity] = useState("")
    const [profImg, setProfImg] = useState()
    const [homeState, setHomeState] = useState()
    const [errors, setErrors] = useState({})
    const [dropdownButtonValue, setDropdownButtonValue] = useState("Image")
    const [imgDropdownSelected, setImgDropdownSelected] = useState(false);
    const history = useHistory();
    
    useEffect(()=>{
        if (sessionErrors){
            setErrors(sessionErrors)
        }
        
    }, [sessionErrors])
    function handleSubmit(e){
        e.preventDefault();
        if (password === confirmPassword){

            const newUser = {firstName, lastName, homeCity, homeState, email: email.toLowerCase(), password, profileImageUrl: profileUrls[profImg]}
            dispatch(signup(newUser))
            history.push("/quests");
            dispatch(setModal(false));

        }else{
            setErrors({confirmPassword: "password and confirm password do not match!"})
        }
    }
    useEffect(() => {
        if (!imgDropdownSelected) return;
        const closeDropdown = () => {
          setImgDropdownSelected(false);
        };
        document.addEventListener('click', closeDropdown);
        return () => document.removeEventListener("click", closeDropdown);
      }, [imgDropdownSelected]);
    function imgDropdownClick(e){
        e.preventDefault();
        if (!imgDropdownSelected){
            setImgDropdownSelected(true)
        }
    }
    function swapForm(){
        dispatch(setModal("logIn"))
    }
    if (modalState && modalState === "signUp"){
        return(
            <div className="page-overlay">
                <form className="login-signup-form" onSubmit={handleSubmit}>
                    <h1>Sign Up</h1> 
                    <label><p>First name:</p>
                        <input 
                            type="text" 
                            name="firstName" 
                            placeholder="First name"
                            value={firstName} 
                            onChange={e => setFirstName(e.target.value)}
                            className="login-input-text"
                        />
                    </label>
                    {errors.firstName && <p className="error">{errors.firstName}</p>}

                    <label><p>Last name:</p>
                        <input 
                            type="text" 
                            name="lastName" 
                            placeholder="Last name"
                            value={lastName} 
                            onChange={e => setLastName(e.target.value)}
                            className="login-input-text"
                        />
                    </label>
                    {errors.lastName && <p className="error">{errors.lastName}</p>}

                        <div className="login-signup-dropdown-label">Profile image:</div>
                    
                    <div>
                        <select className="login-signup-dropdown" onClick={imgDropdownClick}>
                            {Number.isInteger(dropdownButtonValue)? <img className="selected-image" src={profileUrls[dropdownButtonValue]} alt=""/> 
                            : dropdownButtonValue}
                        </select>

                            {imgDropdownSelected && <div className="dropdown-options"> 
                            {profileUrls.map((img, i)=><img key={i} onClick={()=>{setProfImg(i); setDropdownButtonValue(i)}} className="option-image" src={img} alt=""/>)}
                            </div>}
                    </div>
                    {errors.profileImageUrl && <p className="error">{errors.profileImageUrl}</p>}
                    
                    <label><p>Email:</p>
                        <input 
                            type="text" 
                            name="email" 
                            value={email} 
                            placeholder="Email"
                            className="login-input-text"
                            onChange={e => setEmail(e.target.value)}
                            />
                    </label>
                    {errors.email && <p className="error">{errors.email}</p>}
                    
                    <label><p>Home city:</p>
                        <input 
                            type="text" 
                            name="homeCity" 
                            value={homeCity} 
                            onChange={e => setHomeCity(e.target.value)}
                            placeholder="Home city"
                            className="login-input-text"
                        />
                    </label>
                    {errors.homeCity && <p className="error">{errors.homeCity}</p>}
                    
                    <div className="login-signup-dropdown-label">Home state:</div>
                    <select onChange={e=>setHomeState(e.target.value)} defaultValue={"default"} name="homeState" className="login-signup-dropdown">
                        <option disabled value={"default"}></option>
                        {USstates.map((state)=><option key={state} value={state}>{state}</option>)}
                    </select>
                    {errors.homeState && <p className="error">{errors.homeState}</p>}
                    
                    <label><p>Password:</p>
                        <input 
                            type="password" 
                            name="password" 
                            value={password} 
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Password"
                            className="login-input-text"
                        />
                    </label>
                    {errors.password && <p className="error">{errors.password}</p>}
                    
                    <label><p>Confirm password:</p>
                        <input 
                            type="password" 
                            name="confirmPassword" 
                            value={confirmPassword} 
                            onChange={e => setConfirmPassword(e.target.value)}
                            placeholder="Confirm password"
                            className="login-input-text"
                        />
                    </label>
                    {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                    <input type="submit" value="sign up" className="submit-button"/>
    
                    
                       <div className="footer-text"> Already have an account? 
                            <span onClick={swapForm} className="form-swap">Log in!</span> 
                       </div> 

                </form>
            </div>
        )
    }else{
        return null
        
    }
}