// import React, { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { getQuest } from "../../store/quests";
// import { getAllReviews } from "../../store/reviews";

// const QuestShowPage = ( {id}) => {
// const { id } = useParams();
//   const dispatch = useDispatch();
  
//   const quest = useSelector(state => {
//     return state.quests ? state.quests[id] : null
//   });

//   const allReviews = useSelector(state => {
//     return state.reviews ? state.reviews : null
//     });

//   useEffect(() => {
//     dispatch(getQuest(id));
//   }, [dispatch, id]);

//   useEffect(() => {
//     dispatch(getAllReviews());
//     }, [dispatch]);
//     console.log(reviews)

//   if (!quest) return null;
//   if (!allReviews) return null;

//   const myReviews = allReviews.filter(review => review.quest === id)




// const QuestShowReviews = () => {



    
//     return (
//       <div className="quest-show-reviews">
//         {reviews.map((review) => (
//           <div key={review} className={`quest-show-review`}>
//             {review}
//           </div>
//         ))}
//       </div>
//     );
//   };
  

//   export default QuestShowReviews;