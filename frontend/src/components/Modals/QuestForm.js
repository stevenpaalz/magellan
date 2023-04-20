import { setModal } from "../../store/modal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createQuest } from "../../store/quests";
import states from "../../data/States";
import './QuestForm.css'
import { useRef } from "react";

export default function QuestForm() {
    const modalState = useSelector(state => state.modals?.modalState);
    const dispatch = useDispatch(); 
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
    const [images, setImages] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);

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

        dispatch(createQuest(formData));
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

    if (modalState && modalState === "questForm"){
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
                                onChange={(e) => setTitle(e.target.value)}
                            /> 
                        </label>
                        <label className="form-label">
                            Description 
                            <input className="form-input-field-td"
                                type="text"
                                onChange={(e) => setDescription(e.target.value)}
                            /> 
                        </label>
                    </div>
                    <label className="form-label">
                        Checkpoints
                        <textarea className="form-input-field-c"
                            onChange={(e) => setCpOne(e.target.value)}
                        /> 
                        <textarea className="form-input-field-c"
                            onChange={(e) => setCpTwo(e.target.value)}
                        /> 
                        <textarea className="form-input-field-c"
                            onChange={(e) => setCpThree(e.target.value)}
                        /> 
                        <textarea className="form-input-field-c"
                            onChange={(e) => setCpFour(e.target.value)}
                        /> 
                        <textarea className="form-input-field-c"
                            onChange={(e) => setCpFive(e.target.value)}
                        /> 
                    </label>
                    <div className="form-address">
                        <label className="form-label">
                            Street Address
                            <input className="form-input-field"
                                type="text"
                                onChange={(e) => setStreetAddress(e.target.value)}
                            /> 
                        </label>
                        <label className="form-label">
                            City
                            <input className="form-input-field"
                                type="text"
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
                                onChange={(e) => setDuration(e.target.value)}
                            /> 
                        </label>
                        <label className="form-label">
                            Radius
                            <input className="form-input-field"
                                type="number"
                                min="0"
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