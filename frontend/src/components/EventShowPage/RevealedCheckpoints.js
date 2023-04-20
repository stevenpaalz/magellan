const RevealedCheckpoints = ({checkpoints}) => {
    return (
        <>
            <div className="event-details-header">Your Checkpoints</div>
            <div className="checkpoints-box">
              {checkpoints.map((checkpoint) => (
                <div key={checkpoint} className="checkpoint-holder">
                    {/* <i className="fa-regular fa-square"></i> */}
                    <input type="checkbox" className="checkpoint-text" id={checkpoint} />
                    <label for={checkpoint}>{checkpoint}</label>
                </div>
              ))}
            </div>
        </>
    )
}
export default RevealedCheckpoints; 