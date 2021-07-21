function parseOptions(useropc, defaultopc, getDirection){
    for(let property in defaultopc){
        if(useropc.hasOwnProperty(property) === false){
            useropc[property] = defaultopc[property]
        }
    }
    useropc.blockswin = useropc.cols * useropc.rows 
    useropc.startsize = Math.min( useropc.cols - 1, useropc.startsize )
    useropc.getDirection = getDirection

    return useropc
}

function css(elements, styles){
    if(!Array.isArray(elements)) elements = [elements]

    elements.forEach(element => {
        for(let prop in styles){
            element.style[prop] = styles[prop]
        }
    })    
}

function parsePositions({ cols, rows }){
    const positions = []

    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){
            positions.push(i + ':' + j)
        }
    }

    return positions
}

function excludePosition(positions, current){
    return positions.filter(pos => !current.includes(pos))
}

module.exports.excludePosition = excludePosition
module.exports.parsePositions = parsePositions
module.exports.parseOptions = parseOptions
module.exports.css = css