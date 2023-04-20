const HiddenCheckpoints = ({checkpoints}) => {
    return (
        <>
            <div className="event-details-header">The Checkpoints</div>
            <div className="checkpoints-box">
              {checkpoints.map((checkpoint) => (
                <div className="checkpoint-holder">
                    <div className="hidden-square">
                        <i className="fa-regular fa-square" ></i>
                    </div>
                    <div className="checkpoint-hidden-text" key={checkpoint}>{checkpoint}</div>
                </div>
              ))}
            </div>
        </>
    )
}

export default HiddenCheckpoints; 