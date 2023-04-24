import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createQuest } from "../../store/quests";
import states from "../../data/States";
import './QuestForm.css'
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

export default function QuestForm() {
    const history = useHistory();
    const dispatch = useDispatch(); 
    const fileRef = useRef(null);
    const questErrors = useSelector(state => state.errors?.quest)
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
    const [errors, setErrors] = useState({});
    const [images, setImages] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);

    useEffect(() => {
        if (questErrors) {
            setErrors(questErrors)
        };
    }, [questErrors]);

    let submitButton = <button className="form-button-create" type="submit">Create Quest</button>
    let formHeading =<h1 className='form-heading'>Create a New Quest</h1>

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
            const questId = await dispatch(createQuest(formData));
            console.log(questId)
            if (questId) {
                closeForm();
                setTitle("");
                setDescription("");
                setCpOne("");
                setCpTwo("");
                setCpThree("");
                setCpFour("");
                setCpFive("");
                setDuration("");
                setStreetAddress("");
                setCity("");
                setState("");
                setZipcode("");
                setRadius("");
                setTags("");
                setErrors({});
                history.replace(`/quests/${questId}`)
            } else {
                setErrors(questErrors)
            }
            
            // else {
                // };
        };
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
        history.replace("/quests");
    }

    return(
        <div className="create-page">
            <div className="create-upper-x-container">
                <div onClick={closeForm} className="create-upper-x">
                    <i className="fa-solid fa-arrow-left"></i>
                </div>
            </div>
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
                        placeholder="Required"
                        value={cpOne}
                        onChange={(e) => setCpOne(e.target.value)}
                    /> 
                    <textarea className="form-input-field-c"
                        placeholder="Required"
                        value={cpTwo}
                        onChange={(e) => setCpTwo(e.target.value)}
                    /> 
                    <textarea className="form-input-field-c"
                        placeholder="Required"
                        value={cpThree}
                        onChange={(e) => setCpThree(e.target.value)}
                    /> 
                    <textarea className="form-input-field-c"
                        placeholder="Required"
                        value={cpFour}
                        onChange={(e) => setCpFour(e.target.value)}
                    /> 
                    <textarea className="form-input-field-c"
                        placeholder="Required"
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
                        />
                        <span className="slider"></span>
                    </label> 
                    <label className="switch">
                        Family-Friendly
                        <input type="checkbox"
                            value="family-friendly"
                            onChange={handleCheck}
                        />
                        <span className="slider"></span>
                    </label> 
                    <label className="switch">
                        Landmarks
                        <input type="checkbox"
                            value="landmarks"
                            onChange={handleCheck}
                        />
                        <span className="slider"></span>
                    </label> 
                    <label className="switch">
                        Public-Art
                        <input type="checkbox"
                            value="public-art"
                            onChange={handleCheck}
                        />
                        <span className="slider"></span>
                    </label> 
                    <label className="switch">
                        Transportation
                        <input type="checkbox"
                            value="transportation"
                            onChange={handleCheck}
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
                        />
                        <span className="slider"></span>
                    </label>  
                    <label className="switch">
                        Green
                        <input type="checkbox"
                            value="green"
                            onChange={handleCheck}
                        />
                        <span className="slider"></span>
                    </label>  
                    <label className="switch">
                        Obscure
                        <input type="checkbox"
                            value="obscure"
                            onChange={handleCheck}
                        />
                        <span className="slider"></span>
                    </label>  
                    <label className="switch">
                        Locals-Only
                        <input type="checkbox"
                            value="locals-only"
                            onChange={handleCheck}
                        />
                        <span className="slider"></span>
                    </label>                
                    <label className="switch">
                        Tourist-Traps
                        <input type="checkbox"
                            value="tourist-traps"
                            onChange={handleCheck}
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
    )
}