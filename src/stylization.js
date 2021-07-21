const buttons = {
    display: 'block',
    cursor: 'pointer',
    padding: '7px 10px',
    border: 'none',
    backgroundColor: 'rgb(49, 138, 221)',
    whiteSpace: 'nowrap',
    color: '#fff',
    font: '500 15px sans-serif',
    outline: 'none',
    lineHeight: 1.2
}
const labelStyleWin = {
    backgroundColor: 'green',
    color: '#ff0000'
}
const labelStyleLoose = {
    backgroundColor: '#ff0000',
    color: 'green'
}

export function labelStyle(label, result){   
    css(label, {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '25px',
        position: 'absolute',
        top: '0',
        left: '0',
        zIndex: '100000',
        ...(result ? labelStyleWin : labelStyleLoose)
    })
}

export function stylePlay(element){
    css(element, buttons)
}

export function styleReset(element){
    css(element, {
        ...buttons,
        marginTop: '10px',
    })
}

export function styleWrapper(element){
    css(element, {
        position: 'absolute',
        top: '50%',
        left: '105%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column'
    })
}

export function css(element, styles){
    for(let prop in styles){
        element.style[prop] = styles[prop]
    }
}

export function snakePosition(items, size){
    if(!Array.isArray(items)) items = [items]

    items.forEach(({ element, x, y }) => {
        css(element, {
            top: y * size + 'px',
            left: x * size + 'px'
        })
    })
}