import "../styles/Instruction.css"

function Instructions(){

    return (
        <div className="instruction">
            <div className="indicate"><div className="gray"></div> it means word doesn't contain that charaters</div>
            <div className="indicate"><div className="yellow"></div> it means character is in word</div>
            <div className="indicate"><div className="limeGreen"></div> it means character is on right place</div>
        </div>
    )
}

export default Instructions;