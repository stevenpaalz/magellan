import USstates from "../../data/States";
import QuestShowTags from "../QuestShowPage/QuestShowTags";


const AIForm = ({props}) => {
    // const state = props.state;

    const handleCheck = (e) => {
        if (props.themeArray.includes(e.target.value)) {
            const newArray = props.themeArray.filter(theme => theme !== e.target.value);
            props.setThemeArray(newArray)
        } else {
            props.setThemeArray([...props.themeArray, e.target.value])
        };
    };

    return(
        <div className="ai-form-container">
            <form className="ai-form">
                <label>
                    City
                    <input type="text" value={props.city} onChange={(e)=>(props.setCity)(e.target.value)} />
                </label>

                <select onChange={e=>props.setState(e.target.value)} defaultValue={"default"} name="state" className="login-signup-dropdown">
                        <option disabled value={"default"}>State</option>
                        {USstates.map((state)=><option key={state} value={state}>{state}</option>)}
                </select>

                <label>
                    Number of Checkpoints
                    <input type="number" max="10" min="0" value={props.numCheckpoints} onChange={(e)=>(props.setNumCheckpoints)(e.target.value)}/>
                </label>

                <div className="ai-form-themetags">

                    <div className="ai-form-themetag-container">
                        <QuestShowTags tags={["food-and-drink"]} ></QuestShowTags>
                        <input type="checkbox" value="food-and-drink" onChange={handleCheck} />
                    </div>
                    <div className="ai-form-themetag-container">
                        <QuestShowTags tags={["landmarks"]} ></QuestShowTags>
                        <input type="checkbox" value="landmarks" onChange={handleCheck} />
                    </div>
                    <div className="ai-form-themetag-container">
                        <QuestShowTags tags={["landmarks"]} ></QuestShowTags>
                        <input type="checkbox" value="landmarks" onChange={handleCheck} />
                    </div>

                </div>


            </form>
        </div>
    )
}

export default AIForm;