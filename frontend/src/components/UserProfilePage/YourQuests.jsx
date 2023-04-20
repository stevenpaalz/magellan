import { useDispatch, useSelector } from "react-redux"
import QuestIndex from "../QuestIndex/QuestIndex";
import { useEffect } from "react";
import { getAllQuests } from "../../store/quests";

export default function YourQuests(){
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getAllQuests())
    } ,[dispatch])
    const allquests = Object.values(useSelector(state => state.quests));
    const quests = allquests?.filter((quest)=>quest.creator._id === sessionUser._id)
    return(
        <>
        <h1>Quests by {sessionUser.firstName}:</h1>
        <QuestIndex quests={quests}/>
        </>
    )
}