import { setModal } from "../../store/modal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { getQuest, updateQuest, createQuest } from "../../store/quests";


export default function QuestForm() {
    const modalState = useSelector(state => state.modals?.modalState);
    const dispatch = useDispatch(); 
    const { _id } = useParams(); 
    let quest = useSelector(getQuest(_id));

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [checkpoints, setCheckpoints] = useState([]);
    const [duration, setDuration] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipcode, setZipcode] = useState("")
    const [radius, setRadius] = useState("");
    const [tags, setTags] = useState("");
    const [imageFiles, setImageFiles] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);

    let submitButton; 
    let formHeading;
    if (_id) {
        submitButton = <button className="sFormButton" type="submit"
                >Edit Quest</button>
        formHeading = <h1 className='formHeading'>Edit Listing</h1>
    } else {
        submitButton = <button className="sFormButton" type="submit"
                >Create Quest</button>
        formHeading = <h1 className='formHeading'>Create a New Listing</h1>
    };

    // useEffect(() => {
    //     if (_id) {
    //         dispatch(fetchListing(listingId));
            
    //     }
    // }, [dispatch, listingId])

    //picture uploads
    const handleFiles = ({ currentTarget }) => {
        const files = currentTarget.files; 
        setImageFiles(files);
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

        if (imageFiles.length !== 0) {
			for (let photo of imageFiles) {
				formData.append("quest[imageUrls][]", photo);
			};
		};

        if (_id) {
			formData.append('quest[id]', _id);
            for (let key in quest) {
				formData.append(`quest[${key}]`, quest[key]);
			};
		};
        formData.append('quest[title]', title);
        formData.append('quest[description]', description);
        formData.append('quest[checkpoints]', checkpoints);
        formData.append('quest[duration]', duration);
        formData.append('quest[streetAddress]', streetAddress);
        formData.append('quest[city]', city);
        formData.append('quest[state]', state);
        formData.append('quest[zipcode]', zipcode);
        formData.append('quest[radius]', radius);
        formData.append('quest[tags]', tags);
        
        if (_id) {
            dispatch(updateQuest(formData, _id));
        } else {
            dispatch(createQuest(formData));
        };
    };

    if (modalState && modalState === "questForm"){
        return(
            <div className="page-overlay">
                {formHeading}
                <form className="quest-form" onSubmit={handleSubmit}>
                    <label >
                        Title 
                        <input 
                            type="text"
                            onChange={(e) => setTitle(e.target.value)}
                        /> 
                    </label>
                    <label >
                        Description 
                        <input 
                            type="text"
                            onChange={(e) => setDescription(e.target.value)}
                        /> 
                    </label>
                    <label >
                        Checkpoints
                        <input 
                            type="text"
                            onChange={(e) => setDescription(e.target.value)}
                        /> 
                    </label>
                </form>
            </div>
        )
    }else{
        return null
    }
}