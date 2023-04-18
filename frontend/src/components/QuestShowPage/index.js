// import React, { useEffect } from "react";
// import "./QuestShowPage.css"
// import { useParams } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { getQuest } from "../../store/quests";


// const QuestShowPage = () => {
//     // const { questId } = useParams();
//     const questId = "643deb21ec37b96aa0b455d5";
//     const dispatch = useDispatch();
//     const quest = useSelector(state => state.quests[questId]);

//     useEffect(() => {
//         dispatch(getQuest(questId))
//     }, [dispatch, questId])

//     if (!quest) return null;

//     return (
//         <>
//         <h1>QuestShowPage</h1>
//         <h1>{quest.title}</h1>
//         </>
//     )
// }

// export default QuestShowPage;

import React, { useEffect } from "react";
import "./QuestShowPage.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getQuest } from "../../store/quests";

const QuestShowPage = () => {
//   const { questId } = "643ea4d3a2ffa7568bc9906c";
const { questId } = useParams();
  const dispatch = useDispatch();
//   const quest = useSelector(getQuest(questId));
//   const quest = useSelector(state => state.quests[questId]);
  console.log(questId)
//   debugger;



//   useEffect(() => {
//     dispatch(getQuest(questId));
//   }, [dispatch, questId]);

//   if (!quest) return null;

  return (
    <>
      <h1>QuestShowPage</h1>
      {/* <h1>{quest.title}</h1> */}
    </>
  );
};

export default QuestShowPage;
