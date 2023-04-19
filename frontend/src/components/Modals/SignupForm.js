import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../store/session";
import { setModal } from "../../store/modal";
import USstates from "../../data/States";
import './LoginSignup.css'
import profileUrls from "../../data/ProfileImgUrls";
import { useEffect }  from "react";

export default function SignUpForm(){
    const modalState = useSelector(state => state.modals?.modalState)
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
    const [dropdownButtonValue, setDropdownButtonValue] = useState("select a profile image ⌵")
    const [imgDropdownSelected, setImgDropdownSelected] = useState(false)

    function handleSubmit(e){
        e.preventDefault();
        if (password === confirmPassword){
            const newUser = {firstName, lastName, homeCity, homeState, email, password, profileImageUrl: profileUrls[profImg]};
            console.log(newUser);
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
                    <h1>sign up for magellan!</h1> 
                    <label><p>first name:</p>
                        <input type="text" name="firstName" value={firstName} onChange={e => setFirstName(e.target.value)}/>
                    </label>
                    {errors.firstName && <p className="error">{errors.firstName}</p>}
                    <label><p>last name:</p>
                        <input type="text" name="lastName" value={lastName} onChange={e => setLastName(e.target.value)}/>
                    </label>
                    {errors.lastName && <p className="error">{errors.lastName}</p>}
                    <div>
                        <button className="img-dropdown" onClick={imgDropdownClick} > {Number.isInteger(dropdownButtonValue)? <img className="selected-image" src={profileUrls[dropdownButtonValue]} alt=""/> : dropdownButtonValue}</button>
                            {imgDropdownSelected && <div className="dropdown-options"> 
                            {profileUrls.map((img, i)=><img key={i} onClick={()=>{setProfImg(i); setDropdownButtonValue(i)}} className="option-image" src={img} alt=""/>)}
                            </div>}
                        
                    </div>
                    {/* <select name="profileImg" className="img-dropdown">
                        <option disabled selected value="">select a profile image</option>
                        {profileUrls.map((img, i)=><option style={{backgroundImage: `url(${img})`}} value={i} onChange={e=>setProfImg(e.target.value)}></option>)}
                    </select> */}
                    {errors.profileImageUrl && <p className="error">{errors.profileImageUrl}</p>}
                    <label><p>email:</p>
                        <input type="text" name="email" value={email} onChange={e => setEmail(e.target.value)}/>
                    </label>
                    {errors.email && <p className="error">{errors.email}</p>}
                    <label><p>home city:</p>
                        <input type="text" name="homeCity" value={homeCity} onChange={e => setHomeCity(e.target.value)}/>
                    </label>
                    {errors.homeCity && <p className="error">{errors.homeCity}</p>}
                    <select onChange={e=>setHomeState(e.target.value)} defaultValue={"default"} name="homeState">
                        <option disabled value={"default"}>State</option>
                        {USstates.map((state)=><option key={state} value={state}>{state}</option>)}
                    </select>
                    {errors.homeState && <p className="error">{errors.homeState}</p>}
                    <label><p>password:</p>
                        <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)}/>
                    </label>
                    {errors.password && <p className="error">{errors.password}</p>}
                    <label><p>confirm password:</p>
                        <input type="password" name="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
                    </label>
                    {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                    <input type="submit" value="sign up" className="submit-button"/>
    
                       <p>Already have an account?<button className="form-swap" onClick={swapForm}>log in!</button></p> 
                    
                </form>
            </div>
        )
    }else{
        return null
        
    }
}