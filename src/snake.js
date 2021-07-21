const { css } = require("./util")

class Snake{
    constructor(parent, options){
        this.snake = []
        this.parent = parent
        this.options = options

        this.init()
    }

    init(){
        for(let i = 0; i < this.options.startsize; i++){
            this.addItem()
        }
    }

    getLastItem(){
        return this.snake[this.snake.length - 1]
    }

    getElements(){
        return this.snake
    }

    getLeader(){
        return this.snake[this.snake.length - 1]
    }

    getCurrentPosition(){
        return this.snake.map(({x, y}) => x + ':' + y)
    }

    snakeIterator(callback, from){
        let index, length        

        index = from ? Math.min(this.snake.length - 1, from) : 0
        length = this.snake.length - 1 - index

        for(let i = length; i >= 0; i--){
            callback(this.snake[i])
        }
    }

    addItem(){
        let item, element, x, y, coords, dir

        element = document.createElement('span')
        element.setAttribute('class', 'snake-item')

        css(element, {
            width: this.options.size + 'px',
            height: this.options.size + 'px'
        })

        coords = this.nextStep(this.getLastItem())

        dir = coords.dir
        x = coords.x 
        y = coords.y

        item = { element, x, y, dir }

        this.parent.append(element)
        this.snake.push(item)

        return element
    }

    nextStep(element){
        const direction = this.options.getDirection()
        
        if(!element) return {x: 0, y: 0, dir: this.snakeDir(direction)}

        const { cols, rows } = this.options
        let { x, y, dir } = element

        if(direction === 'Up'){
            const next = y - 1
            y = next < 0 ? rows - 1 : next
        }
        if(direction === 'Down'){
            const next = y + 1
            y = next > rows - 1 ? 0 : next
        }
        if(direction === 'Left'){
            const next = x - 1
            x = next < 0 ? cols - 1 : next
        }
        if(direction === 'Right'){
            const next = x + 1
            x = next > cols - 1 ? 0 : next
        }

        dir = this.snakeDir(direction)

        return { 
            x, y, dir, direction,
            move(){
                element.x = x,
                element.y = y
                element.dir = dir
            }
        }
    }

    snakeDir(d){
        if(d === 'Up') return -90
        if(d === 'Down') return 90
        if(d === 'Left') return 180
        if(d === 'Right') return 0
    }   
}

module.exports = Snake