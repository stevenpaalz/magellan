import React, { useEffect } from "react";
import "./QuestShowPage.css"
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//import { getQuest } from "../../../store/quests";

const QuestShowPage = () => {
    const { questId } = useParams();
    const dispatch = useDispatch();
    const quest = useSelector(getQuest(questId));

    useEffect(() => {
        dispatch(fetchQuest(questId))
    }, [dispatch, questId])

    if (!quest) return null;

    return (
        <>
        <h1>QuestShowPage</h1>
        </>
    )
}

export default QuestShowPage;