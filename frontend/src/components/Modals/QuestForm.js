import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createQuest } from "../../store/quests";
import states from "../../data/States";
import './QuestForm.css'
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import QuestShowTags from "../QuestShowPage/QuestShowTags";

export default function QuestForm() {
    const history = useHistory();
    const dispatch = useDispatch(); 
    const fileRef = useRef(null);
    const questErrors = useSelector(state => state.errors?.quest)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [checkPointList, setCheckPointsList] = useState([{checkpoint: ""}, {checkpoint: ""}, {checkpoint: ""}, {checkpoint: ""}, {checkpoint: ""}]);
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
        const allCheckPoints = [];
        checkPointList.forEach((e) => allCheckPoints.push(e.checkpoint))
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
            setErrors({cp: "There should be a minimum of 5 checkpoints and maximum of 15"})
        } else if (tags.length < 1) {
            setErrors({tagz: "Please select at least one tag"})
        } else {
            const questId = await dispatch(createQuest(formData));
            if (questId) {
                closeForm();
                setTitle("");
                setDescription("");
                setCheckPointsList([{checkpoint: ""}, {checkpoint: ""}, {checkpoint: ""}, {checkpoint: ""}, {checkpoint: ""}]);
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

    const handleCheckpointAdd = () => {
        setCheckPointsList([...checkPointList, {checkpoint: ""}])
    }

    const handleCheckpointRemove = (index) => {
        const list = [...checkPointList];
        list.splice(index, 1)
        setCheckPointsList(list)
    };

    const handleCheckpointChange = (e, index) => {
        const {name, value} = e.target; 
        const list = [...checkPointList]
        list[index][name] = value; 
        setCheckPointsList(list)
    };

    return(
        <div className="create-page">
            <div className="create-upper-x-container">
                <div onClick={closeForm} className="create-upper-x">
                    <i className="fa-solid fa-arrow-left"></i>
                </div>
            </div>
            {formHeading}
            <form className="quest-form" onSubmit={handleSubmit}>
                <label className="form-label-td">
                        Title 
                        <input className="form-input-field-td"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        /> 
                    </label>
                    <label className="form-label-td">
                        Description 
                        <input className="form-input-field-td"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        /> 
                </label>
                <div className="create-quest-middle-section">
                <div className="form-dur-rad">
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
                        <select className="form-dropdown states-dropdown" defaultValue={"default"} onChange={(e) => setState(e.target.value)}>
                            <option disabled value={"default"}> select a state ⌵ </option>
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
                        {/* <div class="custom-file-upload"> upload a file */}
                        <input type='file' ref={fileRef} onChange={handleFiles} multiple/>
                        {/* </div> */}
                    </label>
                </div>
                </div>
                <label className="form-label">
                    Tags:
                </label>
                <label className="form-label-tags">
                <label className="switch">
                <QuestShowTags tags={["food-and-drink"]} ></QuestShowTags>
                        <input type="checkbox"
                            value="food-and-drink"
                            onChange={handleCheck}
                        />
                        <span className="slider"></span>
                    </label> 
                    <label className="switch">
                    <QuestShowTags tags={["family-friendly"]} ></QuestShowTags>
                        <input type="checkbox"
                            value="family-friendly"
                            onChange={handleCheck}
                        />
                        <span className="slider"></span>
                    </label> 
                    <label className="switch">
                    <QuestShowTags tags={["landmarks"]} ></QuestShowTags>
                        <input type="checkbox"
                            value="landmarks"
                            onChange={handleCheck}
                        />
                        <span className="slider"></span>
                    </label> 
                    <label className="switch">
                    <QuestShowTags tags={["public-art"]} ></QuestShowTags>
                        <input type="checkbox"
                            value="public-art"
                            onChange={handleCheck}
                        />
                        <span className="slider"></span>
                    </label> 
                    <label className="switch">
                    <QuestShowTags tags={["transportation"]} ></QuestShowTags>
                        <input type="checkbox"
                            value="transportation"
                            onChange={handleCheck}
                        />
                        <span className="slider"></span>
                    </label> 
                </label>
                <label className="form-label-tags">
                    <label className="switch">
                    <QuestShowTags tags={["sporty"]} ></QuestShowTags>
                        <input type="checkbox"
                            value="sporty"
                            onChange={handleCheck}
                        />
                        <span className="slider"></span>
                    </label>  
                    <label className="switch">
                    <QuestShowTags tags={["green"]} ></QuestShowTags>
                        <input type="checkbox"
                            value="green"
                            onChange={handleCheck}
                        />
                        <span className="slider"></span>
                    </label>  
                    <label className="switch">
                    <QuestShowTags tags={["obscure"]} ></QuestShowTags>
                        <input type="checkbox"
                            value="obscure"
                            onChange={handleCheck}
                        />
                        <span className="slider"></span>
                    </label>  
                    <label className="switch">
                    <QuestShowTags tags={["locals-only"]} ></QuestShowTags>
                        <input type="checkbox"
                            value="locals-only"
                            onChange={handleCheck}
                        />
                        <span className="slider"></span>
                    </label>                
                    <label className="switch">
                    <QuestShowTags tags={["tourist-traps"]} ></QuestShowTags>
                        <input type="checkbox"
                            value="tourist-traps"
                            onChange={handleCheck}
                        />
                        <span className="slider"></span>
                    </label>
                </label>
                <label className="form-label-cp-name">
                    Checkpoints:
                    {checkPointList.length < 15 &&
                                <button type="button" className="checkpoint-add-button" onClick={handleCheckpointAdd}>
                                    <i className="fa-solid fa-plus"></i> Add Checkpoint
                                </button>
                    }
                </label>
                <label className="form-label-checkpoint">
                    {checkPointList.map((singleCP, index) => (
                        <div key={`${index}QCheckpoint`} className="checkpoint-div">
                            <div> 
                                <textarea 
                                    name="checkpoint"
                                    className="form-input-field-c"
                                    key={`${index}Quest`}
                                    value={singleCP.checkpoint}
                                    onChange={(e) => handleCheckpointChange(e, index)}
                                />
                            </div>
                            <div> 
                                {checkPointList.length > 5 && 
                                    <button
                                        type="button" 
                                        key={`${index}QButton`} 
                                        className="checkpoint-remove-button" 
                                        onClick={() => handleCheckpointRemove(index)}>
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                }
                            </div>
                        </div>
                    ))}
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