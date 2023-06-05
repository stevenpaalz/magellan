import USstates from "../../data/States";
import QuestShowTags from "../QuestShowPage/QuestShowTags";
import "./AIForm.css";

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
            <fieldset disabled={props.disabledForm}>
                <form className="ai-form" onSubmit={props.handleSubmit}>
                    <div className='ai-form-inputs'>
                        <label>
                            City:
                            <input type="text" value={props.city} onChange={(e)=>(props.setCity)(e.target.value)} />
                        </label>
                        <label htmlFor="state">State:
                        <select onChange={e=>props.setState(e.target.value)} defaultValue={"default"} name="state" className="ai-state-dropdown">
                                <option disabled value={"default"}>State</option>
                                {USstates.map((state)=><option key={state} value={state}>{state}</option>)}
                        </select>
                        </label>

                        <label id="num-checkpoints-ai">
                            Number of Checkpoints:
                            <input type="number" max="10" min="0" value={props.numCheckpoints} onChange={(e)=>(props.setNumCheckpoints)(e.target.value)}/>
                        </label>
                    </div>
                    <div className="ai-form-themetags">

                        <div className="ai-form-themetag-container">
                            <input type="checkbox" value="food-and-drink" onChange={handleCheck} />
                            <QuestShowTags tags={["food-and-drink"]} ></QuestShowTags>
                        </div>
                        <div className="ai-form-themetag-container">
                            <input type="checkbox" value="family-friendly" onChange={handleCheck} />
                            <QuestShowTags tags={["family-friendly"]} ></QuestShowTags>
                        </div>
                        <div className="ai-form-themetag-container">
                            <input type="checkbox" value="landmarks" onChange={handleCheck} />
                            <QuestShowTags tags={["landmarks"]} ></QuestShowTags>
                        </div>
                        <div className="ai-form-themetag-container">
                            <input type="checkbox" value="public-art" onChange={handleCheck} />
                            <QuestShowTags tags={["public-art"]} ></QuestShowTags>
                        </div>
                        <div className="ai-form-themetag-container">
                            <input type="checkbox" value="transportation" onChange={handleCheck} />
                            <QuestShowTags tags={["transportation"]} ></QuestShowTags>
                        </div>
                        <div className="ai-form-themetag-container">
                            <input type="checkbox" value="sporty" onChange={handleCheck} />
                            <QuestShowTags tags={["sporty"]} ></QuestShowTags>
                        </div>
                        <div className="ai-form-themetag-container">
                            <input type="checkbox" value="green" onChange={handleCheck} />
                            <QuestShowTags tags={["green"]} ></QuestShowTags>
                        </div>
                        <div className="ai-form-themetag-container">
                            <input type="checkbox" value="obscure" onChange={handleCheck} />
                            <QuestShowTags tags={["obscure"]} ></QuestShowTags>
                        </div>
                        <div className="ai-form-themetag-container">
                            <input type="checkbox" value="locals-only" onChange={handleCheck} />
                            <QuestShowTags tags={["locals-only"]} ></QuestShowTags>
                        </div>
                        <div className="ai-form-themetag-container">
                            <input type="checkbox" value="tourist-traps" onChange={handleCheck} />
                            <QuestShowTags tags={["tourist-traps"]} ></QuestShowTags>
                        </div>
                        <button className='ai-form-submit' type="submit">Generate    <i className="fa-solid fa-wand-magic-sparkles"></i></button>
                    </div>
                </form>
            </fieldset>
            <div className='ai-errors'>
                {props.errors.length > 0 && props.errors.map((error, i) => {
                    return <p className="formError" key={i}>{error}</p>
                })}
            </div>

        </div>
    )
}

export default AIForm;