import USstates from "../../data/States";
import QuestShowTags from "../QuestShowPage/QuestShowTags";


const AIForm = ({props}) => {

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
            <form className="ai-form" onSubmit={props.handleSubmit}>
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
                        <QuestShowTags tags={["family-friendly"]} ></QuestShowTags>
                        <input type="checkbox" value="family-friendly" onChange={handleCheck} />
                    </div>
                    <div className="ai-form-themetag-container">
                        <QuestShowTags tags={["landmarks"]} ></QuestShowTags>
                        <input type="checkbox" value="landmarks" onChange={handleCheck} />
                    </div>
                    <div className="ai-form-themetag-container">
                        <QuestShowTags tags={["public-art"]} ></QuestShowTags>
                        <input type="checkbox" value="public-art" onChange={handleCheck} />
                    </div>
                    <div className="ai-form-themetag-container">
                        <QuestShowTags tags={["transportation"]} ></QuestShowTags>
                        <input type="checkbox" value="transportation" onChange={handleCheck} />
                    </div>
                    <div className="ai-form-themetag-container">
                        <QuestShowTags tags={["sporty"]} ></QuestShowTags>
                        <input type="checkbox" value="sporty" onChange={handleCheck} />
                    </div>
                    <div className="ai-form-themetag-container">
                        <QuestShowTags tags={["green"]} ></QuestShowTags>
                        <input type="checkbox" value="green" onChange={handleCheck} />
                    </div>
                    <div className="ai-form-themetag-container">
                        <QuestShowTags tags={["obscure"]} ></QuestShowTags>
                        <input type="checkbox" value="obscure" onChange={handleCheck} />
                    </div>
                    <div className="ai-form-themetag-container">
                        <QuestShowTags tags={["locals-only"]} ></QuestShowTags>
                        <input type="checkbox" value="locals-only" onChange={handleCheck} />
                    </div>
                    <div className="ai-form-themetag-container">
                        <QuestShowTags tags={["tourist-traps"]} ></QuestShowTags>
                        <input type="checkbox" value="tourist-traps" onChange={handleCheck} />
                    </div>
                    <input type="submit" value="Generate"/>
                </div>
            </form>
        </div>
    )
}

export default AIForm;