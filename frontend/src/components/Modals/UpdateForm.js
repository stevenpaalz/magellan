import { setModal } from "../../store/modal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { getQuest, updateQuest } from "../../store/quests";
import states from "../../data/States";
import './QuestForm.css'
import { useRef } from "react";
import { useEffect } from "react";
import './slider.css'
import { useHistory } from "react-router-dom";

export default function UpdateForm() {
    const history = useHistory();
    const modalState = useSelector(state => state.modals?.modalState);
    const dispatch = useDispatch(); 
    const { id } = useParams(); 
    let quest = useSelector(state => state.quests[id]);
    const fileRef = useRef(null);
    const questErrors = useSelector(state => state.errors?.quest)
    const [title, setTitle] = useState(quest.title);
    const [description, setDescription] = useState(quest.description);
    const [cpOne, setCpOne] = useState(quest.checkpoints[0]);
    const [cpTwo, setCpTwo] = useState(quest.checkpoints[1]);
    const [cpThree, setCpThree] = useState(quest.checkpoints[2]);
    const [cpFour, setCpFour] = useState(quest.checkpoints[3]);
    const [cpFive, setCpFive] = useState(quest.checkpoints[4]);
    const [duration, setDuration] = useState(quest.duration);
    const address = quest.formattedAddress.split(", ");
    const [streetAddress, setStreetAddress] = useState(address[0]);
    const [city, setCity] = useState(address[1]);
    const [state, setState] = useState(address[2].split(" ")[0]);
    const [zipcode, setZipcode] = useState(address[2].split(" ")[1])
    const [radius, setRadius] = useState(quest.radius);
    const [tags, setTags] = useState(quest.tags);
    const tagsObject = {
        "food-and-drink": false,
        "family-friendly": false, 
        "landmarks": false,
        "public-art": false,
        "transportation": false, 
        "sporty": false, 
        "green": false, 
        "obscure": false, 
        "locals-only": false, 
        "tourist-traps": false
    };
    for (let key in tagsObject) {
        if (tags.includes(key)) {
            tagsObject[key] = true
        };
    };
    const [foodNDrink, setFoodNDrink] = useState(tagsObject["food-and-drink"]);
    const [familyFriendly, setFamilyFriendly] = useState(tagsObject["family-friendly"]);
    const [landmarks, setLandmarks] = useState(tagsObject["landmarks"]);
    const [publicArt, setPublicArt] = useState(tagsObject["public-art"]);
    const [transportation, setTransportation] = useState(tagsObject["transportation"]);
    const [sporty, setSporty] = useState(tagsObject["sporty"]);
    const [green, setGreen] = useState(tagsObject["green"]);
    const [obscure, setObscure] = useState(tagsObject["obscure"]);
    const [localsOnly, setLocalsOnly] = useState(tagsObject["locals-only"]);
    const [touristTraps, setTouristTraps] = useState(tagsObject["tourist-traps"]);
    const [errors, setErrors] = useState({})
    const [images, setImages] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);

    let submitButton = <button className="form-button-create" type="submit">Save</button>
    let formHeading = <h1 className='form-heading'>Edit Quest</h1>

    useEffect(() => {
        if (questErrors){
            setErrors(questErrors)
        }
    }, [questErrors]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(); 
        Array.from(images).forEach(image => formData.append("images", image));
        fileRef.current.value = null;
        const allCheckPoints = [cpOne, cpTwo, cpThree, cpFour, cpFive]
        formData.append('title', title);
        formData.append('description', description);
        formData.append('checkpoints', allCheckPoints);
        formData.append('duration', duration);
        formData.append('streetAddress', streetAddress);
        formData.append('city', city);
        formData.append('state', state);
        formData.append('zipcode', zipcode);
        formData.append('radius', radius);
        formData.append('tags', [tags]);

        if (allCheckPoints.includes("")) {
            setErrors({cp: "There should be a minimum of 5 checkpoints"})
        } else if (tags.length < 1) {
            setErrors({tagz: "Please select at least one tag"})
        } else {
            const questId = await dispatch(updateQuest(formData, id));
            if (questId) {
                closeForm();
                history.go(0)
            };
        };

        // for (const pair of formData.entries()) {
        //     console.log(`${pair[0]}, ${pair[1]}`)
        // }

    };



    const handleCheck = (e) => {
        if (tags.includes(e.target.value)) {
            const newArray = []
            tags.map(tag => {
                if (tag !== e.target.value) {
                    newArray.push(tag)
                };
            });
            setTags([...newArray])
        } else {
            setTags([...tags, e.target.value])
        };
        if (tags.includes("food-and-drink")){
            setFoodNDrink(true)
        } else {
            setFoodNDrink(false)
        };
        if (tags.includes("family-friendly")){
            setFamilyFriendly(true)
        } else {
            setFamilyFriendly(false)
        };
        if (tags.includes("landmarks")) {
            setLandmarks(true)
        } else {
            setLandmarks(false)
        };
        if (tags.includes("public-art")) {
            setPublicArt(true)
        } else {
            setPublicArt(false)
        };
        if (tags.includes("transportation")) {
            setTransportation(true)
        } else {
            setTransportation(false)
        };
        if (tags.includes("sporty")) {
            setSporty(true)
        } else {
            setSporty(false)
        };
        if (tags.includes("green")) {
            setGreen(true)
        } else {
            setGreen(false)
        };
        if (tags.includes("obscure")) {
            setObscure(true)
        } else {
            setObscure(false)
        };
        if (tags.includes("locals-only")) {
            setLocalsOnly(true)
        } else {
            setLocalsOnly(false)
        };
        if (tags.includes("tourist-traps")) {
            setTouristTraps(true)
        } else {
            setTouristTraps(false)
        };
    };

    function closeForm(){
        dispatch(setModal(""))
    }

    if (modalState && modalState === "updateForm"){
        return(
            <div className="page-overlay">
                <div className="create-page">
                <div className="create-upper-x-container">
                    <div onClick={closeForm} className="create-upper-x">
                        <i className="fa-solid fa-x"></i>
                    </div>
                </div>
                {formHeading}
                <form className="quest-form" onSubmit={handleSubmit}>
                    <div>
                        <label className="form-label-td">
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
                            placeholder="Required"
                            onChange={(e) => setCpOne(e.target.value)}
                        /> 
                        <textarea className="form-input-field-c"
                            value={cpTwo}
                            placeholder="Required"
                            onChange={(e) => setCpTwo(e.target.value)}
                        /> 
                        <textarea className="form-input-field-c"
                            value={cpThree}
                            placeholder="Required"
                            onChange={(e) => setCpThree(e.target.value)}
                        /> 
                        <textarea className="form-input-field-c"
                            value={cpFour}
                            placeholder="Required"
                            onChange={(e) => setCpFour(e.target.value)}
                        /> 
                        <textarea className="form-input-field-c"
                            value={cpFive}
                            placeholder="Required"
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
                                    <option key={state} value={state}>{state}</option>
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
                            Duration (hours)
                            <input className="form-input-field"
                                type="number"
                                min="0"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                            /> 
                        </label>
                        <label className="form-label">
                            Radius (miles)
                            <input className="form-input-field"
                                type="number"
                                min="0"
                                value={radius}
                                onChange={(e) => setRadius(e.target.value)}
                            /> 
                        </label>
                        <label className="form-label">
                            Pictures
                            <input type='file' ref={fileRef} onChange={handleFiles} multiple/>
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
                        <label className="switch">
                            Tourist-Traps
                            <input type="checkbox"
                                value="tourist-traps"
                                onChange={handleCheck}
                                defaultChecked={touristTraps}
                            />
                            <span className="slider"></span>
                        </label>
                    </label>
                    <div className="form-button-div">
                        {submitButton}
                    </div>
                    <div className="form-error-div">
                        {errors.title && <p className="form-error">{errors.title}</p>}
                        {errors.description && <p className="form-error">{errors.description}</p>}
                        {errors.cp && <p className="form-error">{errors.cp}</p>}
                        {errors.streetAddress && <p className="form-error">{errors.streetAddress}</p>}
                        {errors.city && <p className="form-error">{errors.city}</p>}
                        {errors.zipcode && <p className="form-error">{errors.zipcode}</p>}
                        {errors.duration && <p className="form-error">{errors.duration}</p>}
                        {errors.radius && <p className="form-error">{errors.radius}</p>}
                        {errors.tagz && <p className="form-error">{errors.tagz}</p>}
                    </div>
                </form>
                </div>
            </div>
        )
    }else{
        return null
    }
}