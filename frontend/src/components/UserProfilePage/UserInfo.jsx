
import { useState } from "react";
import { useDispatch, useSelector} from "react-redux"
import { deleteUser, updateUser } from "../../store/users";
import USstates from "../../data/States";
import { useEffect } from "react";
import profileUrls from "../../data/ProfileImgUrls";

export default function UserInfo(){
    const dispatch = useDispatch()
    const userErrors = useSelector(state=> state.errors?.user)
    const [deleteClicked, setDeleteClicked] = useState(false)
    const [editClicked, setEditclicked] = useState(false)
    const sessionUser = useSelector(state => state.session.user);
    const [firstName, setFirstName] = useState(sessionUser.firstName)
    const [lastName, setLastName] = useState(sessionUser.lastName)
    const [email, setEmail] = useState(sessionUser.email)
    const [homeCity, setHomeCity] = useState(sessionUser.homeCity)
    const [homeState, setHomeState] = useState(sessionUser.homeState)
    const [errors, setErrors] = useState({})
    const [profImg, setProfImg] = useState(profileUrls.indexOf(sessionUser.profileImageUrl))
    const [imgDropdownSelected, setImgDropdownSelected] = useState(false)
    useEffect(()=>{
        if (userErrors){
            setErrors(userErrors)
        }
        
    }, [userErrors])

    function handleDeleteClick(){
        setDeleteClicked(true)
    }
    function handleEditClick(){
        setEditclicked(true)
    }
    function closeDelete(){
        setDeleteClicked(false)
    }
    function deleteCurrentUser(){
        if(sessionUser.email!== "demo@email.com"){
            dispatch(deleteUser(sessionUser._id))
        }else{
            alert("Please don't delete our demo user. We love him.\n(To test this feature, you can create a new user)")
            setDeleteClicked(false)
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
    function doneClicked(){
        if(sessionUser.email!== "demo@email.com"){
            const user={firstName, lastName, email: email.toLowerCase(), homeCity, homeState, _id: sessionUser._id, profileImageUrl: profileUrls[profImg]}
            dispatch(updateUser(user))
            setEditclicked(false)

        }else{
            setFirstName(sessionUser.firstName);
            setLastName(sessionUser.lastName);
            setEmail(sessionUser.email);
            setHomeCity(sessionUser.homeCity);
            setHomeState(sessionUser.homeState);
            setProfImg(profileUrls.indexOf(sessionUser.profileImageUrl))
            setEditclicked(false)
            alert("Please don't try to change our demo user. He is perfect.\n(To test this feature, you can create a new user)")
        }

    }
    return(
        <>
            {deleteClicked && 
            <div className="page-overlay">
                <div className="delete-form"> 
                    <div onClick={closeDelete} className="delete-upper-x">
                        <i className="fa-solid fa-x"></i>
                    </div>
                    <h1>ARE YOU SURE YOU WANT TO DELETE YOUR ACCOUNT ?!</h1>
                    <button onClick={deleteCurrentUser} className="show-page-button show-page-button-red-button delete-button">DELETE ME FOREVER</button>
                    <button onClick={closeDelete} className="show-page-button show-page-button-blue-button delete-button">Nevermind, go back</button></div>
                </div>}
            <div className="profile-card">
                <div className="user-info-top">
                    {editClicked?
                    <>
                        <div>
                            <button className="img-dropdown" onClick={imgDropdownClick} ><img className="selected-image" src={profileUrls[profImg]} alt="selected image"/><p>click to select ⌵</p></button>
                                {imgDropdownSelected && <div className="dropdown-options"> 
                                {profileUrls.map((img, i)=><img key={i} onClick={()=>{setProfImg(i)}} className="option-image" src={img} alt=""/>)}
                                </div>}
                        </div>
                        {errors.profileImageUrl && <p className="error">{errors.profileImageUrl}</p>}
                    </>
                    :<img className="profile-page-image" src={profileUrls[profImg]} alt={`${firstName}'s avatar`} />}
                    
                    <div className="user-info-buttons">
                        {editClicked?
                            <button onClick={doneClicked} className="show-page-button show-page-button-turquoise-button delete-button">Done</button>
                        :<>
                            <button onClick={handleEditClick} className="show-page-button show-page-button-blue-button delete-button">Edit my info</button>
                            <button onClick={handleDeleteClick} className="show-page-button show-page-button-red-button delete-button">Delete my Account</button>
                        </>}
                        
                    </div>
                </div>
            <h1>{firstName}'s personal info:</h1>
        <div className="info-box">
            <p>First Name:</p>
            {editClicked? <><input className="editing" type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)}></input>{errors.firstName && <p className="error">{errors.firstName}</p>}</>:<h1>{firstName}</h1>}
        </div>
        <div className="info-box">
            <p>Last Name:</p>
            {editClicked? <><input className="editing" type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)}></input>{errors.lastName && <p className="error">{errors.lastName}</p>}</>:<h1>{lastName}</h1>}
        </div>
        <div className="info-box">
            <p>Email Address:</p>
            {editClicked? <><input className="editing" type="text" value={email} onChange={(e)=>setEmail(e.target.value)}></input>{errors.email && <p className="error">{errors.email}</p>}</>:<h1>{email}</h1>}
        </div>
        <div className="info-box">
            <p>Home Town:</p>
            {editClicked? 
            <>
            <input className="editing" type="text" value={homeCity} placeholder="City Name" onChange={(e)=>setHomeCity(e.target.value)}></input>
            {errors.homeCity && <p className="error">{errors.homeCity}</p>}    
            <select onChange={e=>setHomeState(e.target.value)} defaultValue={homeState} name="homeState">
                        <option disabled value={"default"}>State</option>
                        {USstates.map((state)=><option key={state} selected={state===homeState} value={state}>{state}</option>)}
            </select>
            {errors.homeState && <p className="error">{errors.homeState}</p>}
            </>
            :<h1>{homeCity}, {homeState}</h1>
            }
        </div>
        </div>
        </>
    )
}