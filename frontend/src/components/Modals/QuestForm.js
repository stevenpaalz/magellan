import { setModal } from "../../store/modal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { getQuest, updateQuest, createQuest } from "../../store/quests";
import states from "../../data/States";
import './QuestForm.css'
import { useRef } from "react";
import { useEffect } from "react";

export default function QuestForm() {
    const modalState = useSelector(state => state.modals?.modalState);
    const dispatch = useDispatch(); 
    const { _id } = useParams(); 
    let quest = useSelector(state => state.quests?._id);
    const fileRef = useRef(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [checkpoints, setCheckpoints] = useState({});
    const [duration, setDuration] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipcode, setZipcode] = useState("")
    const [radius, setRadius] = useState("");
    const [tags, setTags] = useState("");
    const [images, setImages] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);

    let submitButton; 
    let formHeading;
    if (_id) {
        submitButton = <button className="sFormButton" type="submit"
                >Edit Quest</button>
        formHeading = <h1 className='formHeading'>Edit Listing</h1>
    } else {
        submitButton = <button className="form-button-create" type="submit"
                >Create Quest</button>
        formHeading = <h1 className='form-heading'>Create a New Quest</h1>
    };

    useEffect(() => {
        if (_id) {
            dispatch(getQuest(_id));
            
        }
    }, [dispatch, _id])

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
        let formCheckPoints = [];
        for (let key in checkpoints) {
            formCheckPoints.push(checkpoints[key])
        }
        fileRef.current.value = null;
        formData.append('title', title);
        formData.append('description', description);
        formData.append('checkpoints', [formCheckPoints]);
        formData.append('duration', duration);
        formData.append('streetAddress', streetAddress);
        formData.append('city', city);
        formData.append('state', state);
        formData.append('zipcode', zipcode);
        formData.append('radius', radius);
        formData.append('tags', [tags]);
        
        if (_id) {
            dispatch(updateQuest(formData, _id));
        } else {
            dispatch(createQuest(formData));
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
                        <input className="form-input-field-c"
                            type="text"
                            onChange={(e) => setCheckpoints({...checkpoints, "check1":e.target.value})}
                        /> 
                        <input className="form-input-field-c"
                            type="text"
                            onChange={(e) => setCheckpoints({...checkpoints, "check2":e.target.value})}
                        /> 
                        <input className="form-input-field-c"
                            type="text"
                            onChange={(e) => setCheckpoints({...checkpoints, "check3":e.target.value})}
                        /> 
                        <input className="form-input-field-c"
                            type="text"
                            onChange={(e) => setCheckpoints({...checkpoints, "check4":e.target.value})}
                        /> 
                        <input className="form-input-field-c"
                            type="text"
                            onChange={(e) => setCheckpoints({...checkpoints, "check5":e.target.value})}
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
                                    <option value={state}>{state}</option>
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
                        <label>
                            Food And Drink
                            <input className="form-input-cb"
                                type="checkbox"
                                value="food-and-drink"
                                onChange={(e)=> setTags([...tags, e.target.value])}
                            />
                        </label>
                        <label>
                            Family-Friendly
                            <input className="form-input-cb"
                                type="checkbox"
                                value="family-friendly"
                                onChange={(e)=> setTags([...tags, e.target.value])}
                            />
                        </label>
                        <label>
                            Landmarks
                            <input className="form-input-cb"
                                type="checkbox"
                                value="landmarks"
                                onChange={(e)=> setTags([...tags, e.target.value])}
                            />
                        </label>
                        <label>
                            Public-Art
                            <input className="form-input-cb"
                                type="checkbox"
                                value="public-art"
                                onChange={(e)=> setTags([...tags, e.target.value])}
                            />
                        </label>
                        <label>
                            Transportation
                            <input className="form-input-cb"
                                type="checkbox"
                                value="transportation"
                                onChange={(e)=> setTags([...tags, e.target.value])}
                            />
                        </label>
                    </label>
                    <label className="form-label-tags">
                        <label>
                            Sporty
                            <input className="form-input-cb"
                                type="checkbox"
                                value="sporty"
                                onChange={(e)=> setTags([...tags, e.target.value])}
                            />
                        </label>
                        <label>
                            Green
                            <input className="form-input-cb"
                                type="checkbox"
                                value="green"
                                onChange={(e)=> setTags([...tags, e.target.value])}
                            />
                        </label>
                        <label>
                            Obscure
                            <input className="form-input-cb"
                                type="checkbox"
                                value="obscure"
                                onChange={(e)=> setTags([...tags, e.target.value])}
                            />
                            <span className="slider-round"></span>
                        </label>
                        <label>
                            Locals-Only
                            <input className="form-input-cb"
                                type="checkbox"
                                value="locals-only"
                                onChange={(e)=> setTags([...tags, e.target.value])}
                            />
                        </label>
                        <label>
                            Tourist-Traps
                            <input className="form-input-cb"
                                type="checkbox"
                                value="tourist-traps"
                                onChange={(e)=> setTags([...tags, e.target.value])}
                            />
                        </label>
                    </label>
                    <label className="form-label">
                        Pictures
                    <input type='file' ref={fileRef} onChange={handleFiles} multiple/>
                    </label>
                    <div className="form-button-div">
                        {submitButton}
                        <button className="form-button-close" onClick={closeForm}>
                            Close Form
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