import { setModal } from "../../store/modal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { getQuest, updateQuest, createQuest } from "../../store/quests";
import states from "../../data/States";
import './QuestForm.css'
import { useRef } from "react";
import { useEffect } from "react";
import './slider.css'

export default function UpdateForm() {
    const modalState = useSelector(state => state.modals?.modalState);
    const dispatch = useDispatch(); 
    const { id } = useParams(); 
    let quest = useSelector(state => state.quests[id]);
    const fileRef = useRef(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [cpOne, setCpOne] = useState("");
    const [cpTwo, setCpTwo] = useState("");
    const [cpThree, setCpThree] = useState("");
    const [cpFour, setCpFour] = useState("");
    const [cpFive, setCpFive] = useState("");
    const [duration, setDuration] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipcode, setZipcode] = useState("")
    const [radius, setRadius] = useState("");
    const [tags, setTags] = useState("");
    const [foodNDrink, setFoodNDrink] = useState(false);
    const [familyFriendly, setFamilyFriendly] = useState(false);
    const [landmarks, setLandmarks] = useState(false);
    const [publicArt, setPublicArt] = useState(false);
    const [transportation, setTransportation] = useState(false);
    const [sporty, setSporty] = useState(false);
    const [green, setGreen] = useState(false);
    const [obscure, setObscure] = useState(false);
    const [localsOnly, setLocalsOnly] = useState(false);
    const [touristTraps, setTouristTraps] = useState(false);
    const [images, setImages] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);

    let submitButton = <button className="form-button-create" type="submit">Save</button>
    let formHeading = <h1 className='form-heading'>Edit Quest</h1>

    const tagNames = {
        "food-and-drink": setFoodNDrink,
        "family-friendly": setFamilyFriendly,
        "landmarks": setLandmarks,
        "public-art": setPublicArt,
        "transportation": setTransportation,
        "sporty": setSporty,
        "green": setGreen,
        "obscure": setObscure,
        "locals-only": setLocalsOnly,
        "tourist-traps": setTouristTraps
    }

    useEffect(() => {
        if (id) {
            dispatch(getQuest(id));
            setTitle(quest.title);
            setDescription(quest.description);
            setCpOne(quest.checkpoints[0]);
            setCpTwo(quest.checkpoints[1]);
            setCpThree(quest.checkpoints[2]);
            setCpFour(quest.checkpoints[3]);
            setCpFive(quest.checkpoints[4]);
            const address = quest.formattedAddress.split(",");
            setStreetAddress(address[0]);
            setCity(address[1]);
            setState(address[2].split(" ")[1])
            setZipcode(address[2].split(" ")[2]);
            setDuration(quest.duration);
            setRadius(quest.radius);
            setTags(quest.tags);
            if (tags.includes("food-and-drinks")){
                setFoodNDrink(true)
            }
            if (tags.includes("family-friendly")){
                setFamilyFriendly(true)
            }
            if (tags.includes("landmarks")) {
                setLandmarks(true)
            }
            if (tags.includes("public-art")) {
                setPublicArt(true)
            }
            if (tags.includes("transportation")) {
                setTransportation(true)
            }
            if (tags.includes("sporty")) {
                setSporty(true)
            }
            if (tags.includes("green")) {
                setGreen(true)
            }
            if (tags.includes("obscure")) {
                setObscure(true)
            }
            if (tags.includes("locals-only")) {
                setLocalsOnly(true)
            }
            if (tags.includes("tourist-traps")) {
                setTouristTraps(true)
            }
        }
    }, [dispatch, id])

    //picture uploads
    const handleFiles = ({ currentTarget }) => {
        const files = currentTarget.files; 
        setImages(files);
        if (files.length !==0) {
            let filesLoaded = 0; 
            const urls = [];
            Array.from(files).forEach((file, index) => {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onload = () => {
                    urls[index] = fileReader.result;
                    if (++filesLoaded === files.length)
                    setImageUrls(urls);
                }
            });
        }
        else setImageUrls([]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(); 
        Array.from(images).forEach(image => formData.append("images", image));
        fileRef.current.value = null;
        formData.append('title', title);
        formData.append('description', description);
        formData.append('checkpoints', [cpOne, cpTwo, cpThree, cpFour, cpFive]);
        formData.append('duration', duration);
        formData.append('streetAddress', streetAddress);
        formData.append('city', city);
        formData.append('state', state);
        formData.append('zipcode', zipcode);
        formData.append('radius', radius);
        formData.append('tags', [tags]);
        
        // for (const pair of formData.entries()) {
        //     console.log(`${pair[0]}, ${pair[1]}`)
        // }

        dispatch(updateQuest(formData, id));
        closeForm();

    };

    const handleCheck = (e) => {
        if (tags.includes(e.target.value)) {
            const newArray = tags.filter(tag => tag !== e.target.value);
            setTags(newArray)
        } else {
            setTags([...tags, e.target.value])
        };
    };

    function closeForm(){
        dispatch(setModal(""))
    }

    if (tags !== "" && modalState && modalState === "updateForm"){
        return(
            <div className="page-overlay">
                <div className="create-page">
                {formHeading}
                <form className="quest-form" onSubmit={handleSubmit}>
                    <div>
                        <label className="form-label">
                            Title 
                            <input className="form-input-field-td"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            /> 
                        </label>
                        <label className="form-label">
                            Description 
                            <input className="form-input-field-td"
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            /> 
                        </label>
                    </div>
                    <label className="form-label">
                        Checkpoints
                        <textarea className="form-input-field-c"
                            value={cpOne}
                            onChange={(e) => setCpOne(e.target.value)}
                        /> 
                        <textarea className="form-input-field-c"
                            value={cpTwo}
                            onChange={(e) => setCpTwo(e.target.value)}
                        /> 
                        <textarea className="form-input-field-c"
                            value={cpThree}
                            onChange={(e) => setCpThree(e.target.value)}
                        /> 
                        <textarea className="form-input-field-c"
                            value={cpFour}
                            onChange={(e) => setCpFour(e.target.value)}
                        /> 
                        <textarea className="form-input-field-c"
                            value={cpFive}
                            onChange={(e) => setCpFive(e.target.value)}
                        /> 
                    </label>
                    <div className="form-address">
                        <label className="form-label">
                            Street Address
                            <input className="form-input-field"
                                type="text"
                                value={streetAddress}
                                onChange={(e) => setStreetAddress(e.target.value)}
                            /> 
                        </label>
                        <label className="form-label">
                            City
                            <input className="form-input-field"
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            /> 
                        </label>
                        <label className="form-label">
                            State
                            <select onChange={(e) => setState(e.target.value)}>
                                <option value="NY" default>NY</option>
                                {states.map((state) => (
                                    <option value={state}>{state}</option>
                                ))}
                            </select>
                        </label>
                        <label className="form-label">
                            Zip Code
                            <input className="form-input-field"
                                type="text"
                                value={zipcode}
                                onChange={(e) => setZipcode(e.target.value)}
                            /> 
                        </label>
                    </div>
                    <div className="form-dur-rad">
                        <label className="form-label">
                            Duration
                            <input className="form-input-field"
                                type="number"
                                min="0"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                            /> 
                        </label>
                        <label className="form-label">
                            Radius
                            <input className="form-input-field"
                                type="number"
                                min="0"
                                value={radius}
                                onChange={(e) => setRadius(e.target.value)}
                            /> 
                        </label>
                    </div>
                    <label className="form-label">
                        Tags:
                    </label>
                    <label className="form-label-tags">
                    <label className="switch">
                            Food and Drink
                            <input type="checkbox"
                                value="food-and-drink"
                                onChange={handleCheck}
                                defaultChecked={foodNDrink}
                            />
                            <span className="slider"></span>
                        </label> 
                        <label className="switch">
                            Family-Friendly
                            <input type="checkbox"
                                value="family-friendly"
                                onChange={handleCheck}
                                defaultChecked={familyFriendly}
                            />
                            <span className="slider"></span>
                        </label> 
                        <label className="switch">
                            Landmarks
                            <input type="checkbox"
                                value="landmarks"
                                onChange={handleCheck}
                                defaultChecked={landmarks}
                            />
                            <span className="slider"></span>
                        </label> 
                        <label className="switch">
                            Public-Art
                            <input type="checkbox"
                                value="public-art"
                                onChange={handleCheck}
                                defaultChecked={publicArt}
                            />
                            <span className="slider"></span>
                        </label> 
                        <label className="switch">
                            Transportation
                            <input type="checkbox"
                                value="transportation"
                                onChange={handleCheck}
                                defaultChecked={transportation}
                            />
                            <span className="slider"></span>
                        </label> 
                    </label>
                    <label className="form-label-tags">
                        <label className="switch">
                            Sporty
                            <input type="checkbox"
                                value="sporty"
                                onChange={handleCheck}
                                defaultChecked={sporty}
                            />
                            <span className="slider"></span>
                        </label>  
                        <label className="switch">
                            Green
                            <input type="checkbox"
                                value="green"
                                onChange={handleCheck}
                                defaultChecked={green}
                            />
                            <span className="slider"></span>
                        </label>  
                        <label className="switch">
                            Obscure
                            <input type="checkbox"
                                value="obscure"
                                onChange={handleCheck}
                                defaultChecked={obscure}
                            />
                            <span className="slider"></span>
                        </label>  
                        <label className="switch">
                            Locals-Only
                            <input type="checkbox"
                                value="locals-only"
                                onChange={handleCheck}
                                defaultChecked={localsOnly}
                            />
                            <span className="slider"></span>
                        </label>                
                        <label class="switch">
                            Tourist-Traps
                            <input type="checkbox"
                                value="tourist-traps"
                                onChange={handleCheck}
                                defaultChecked={touristTraps}
                            />
                            <span class="slider"></span>
                        </label>
                    </label>
                    <label className="form-label">
                        Pictures
                    <input type='file' ref={fileRef} onChange={handleFiles} multiple/>
                    </label>
                    <div className="form-button-div">
                        {submitButton}
                        <button className="form-button-close" onClick={closeForm}>
                            Close
                        </button>
                    </div>
                </form>
                </div>
            </div>
        )
    }else{
        return null
    }
}