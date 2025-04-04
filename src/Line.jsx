import './styles/Line.css'

function Line({guess, isFinal, solution}){

    const WORD_LENGTH = 5

    const tiles = []

    for(let i = 0; i < WORD_LENGTH; i++){
        const char = guess[i]
        let className = 'tile'

        if (isFinal) {
            if (char === solution[i]){
                className += ' correct'
            } else if (solution.includes(char)){
                className += ' close'
            } else{
                className += ' incorrect'
            }
        }
        tiles.push(<div key={i} className={className} >{char}</div>)
    }

    return(
        <div className="line">
            {tiles}
        </div>
    )
}

export default Line;