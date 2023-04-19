const RevealedCheckpoints = ({checkpoints}) => {
    return (
        <>
            <div className="event-details-header">Your Checkpoints</div>
            <div className="checkpoints-box">
              {checkpoints.map((checkpoint) => (
                <div className="checkpoint-holder">
                    <i className="fa-regular fa-square"></i>
                    <div className="checkpoint-text" key={checkpoint}>{checkpoint}</div>
                </div>
              ))}
            </div>
        </>
    )
}
export default RevealedCheckpoints; 