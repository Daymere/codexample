import './index.scss'
const { parseOptions, parsePositions, css } = require('./util')
const Snake = require('./snake')
const Point = require('./point')

class SnakeGame {  
    #default = {
        width: 400,
        height: 400,
        size: 40,
        startsize: 4,
        speed: 400,
        cols: 10,
        rows: 10,
        autostart: 'off'
    }

    constructor(element, options){
        this.arena = document.querySelector(element)
        this.direction = null
        this.options = parseOptions(options, this.#default, this.getDirection.bind(this))    
        this.disabled = false
        this.moving = null
        this.active = false
        
        this.#setup()

        if(this.options.autostart === 'on'){
            this.start()
        }
    }

    getDirection(){
        return this.direction
    }

    #setup(){
        css(this.arena, {
            width: this.options.width + 'px',
            height: this.options.height + 'px'
        })            

        this.options.positions = parsePositions(this.options)
        this.arena.setAttribute('tabindex', 0)
        this.arena.focus()
        this.direction = 'Right'        
        this.createArea()

        this.toggle.innerHTML = '&#9654; Начать'

        this.snake = new Snake(this.field, this.options)
        this.point = new Point(this.field, this.options)

        this.handlers()

        this.drawSnake()
        this.point.setPosition(this.snake.getCurrentPosition())        
    }

    drawSnake(){
        this.snake.snakeIterator(({ element, x, y, dir }) => {
            css(element, {
                top: y * this.options.size + 'px',
                left: x * this.options.size + 'px',                
                transform: `rotate(${dir}deg)`
            })
        })
    }

    move(){
        let leader, prev, next, move

        leader = this.snake.getLeader()
        next = this.snake.nextStep(leader)
        prev = {...leader}
        move = true
        
        if(this.accident(next.x, next.y)){
            this.stop()
            this.setLabel('Lose!', 'lose')

            move = false
        }

        if(move && this.grow(next.x, next.y)){
            this.snake.addItem()
            this.point.setPosition(this.snake.getCurrentPosition())

            move = false
        }   

        if(this.win()){
            this.stop()
            this.setLabel('Win!', 'win')

            move = false
        }

        if(move){
            next.move()

            this.snake.snakeIterator(item => {
                let { x, y } = prev
                let dir = null
                prev = {...item}

                if(item.x < x) dir = 'Right'
                if(item.x > x) dir = 'Left'
                if(item.y > y) dir = 'Up'
                if(item.y < y) dir = 'Down'
    
                item.x = x
                item.y = y
                item.dir = this.snake.snakeDir(dir)

            }, 1) 
        }
        console.log(this.snake.getElements())

        this.drawSnake()
    }

    grow(posX, posY){
        return posX === this.point.x && posY === this.point.y
    }

    accident(posX, posY){
        return !!this.snake.getElements().find(({x, y}) => posX === x && posY === y)
    }

    win(){
        let snakelength, winlength

        snakelength = this.snake.getElements().length
        winlength = this.options.cols * this.options.rows

        return snakelength === winlength
    }

    setLabel(text, result, ms = 0){
        let label, className

        if(result === 'win'){
            className = 'snake-label snake-win'
        }

        if(result === 'lose'){
            className = 'snake-label snake-lose'
        }

        label = document.createElement('div')
        label.setAttribute('class', className)
        label.innerHTML = text

        setTimeout(() => {
            this.field.innerHTML = label.outerHTML
        }, ms)
    }

    createArea(){
        let 
            field, controlls, toggle, reset

        //================ FIELD ================
        field = document.createElement('div')
        field.setAttribute('class', 'snake-field')

        this.arena.append(field)

        //================ CONTROLLS WRAPPER ================
        controlls = document.createElement('div')
        controlls.setAttribute('class', 'snake-controlls')

        this.arena.append(controlls)

        //================ Toggle Button ================
        toggle = document.createElement('button')
        toggle.setAttribute('class', 'snake-toggle-button')
        toggle.innerHTML = '&#9654; Начать'

        controlls.append(toggle)

        //================ Reset Button ================
        reset = document.createElement('button')
        reset.setAttribute('class', 'snake-reset-button')
        reset.innerHTML = '&#8634; Начать сначало'

        controlls.append(reset)

        this.field = field
        this.reset = reset
        this.toggle = toggle
    }

    handlers(){
        this.arena.addEventListener('keydown', this.keyDownHandlers.bind(this))
        this.reset.addEventListener('click', this.resetHandler.bind(this))
        this.toggle.addEventListener('click', this.toggleHandler.bind(this))
    }
    
    keyDownHandlers(event) {
        const keydown = event.key.replace('Arrow', '')
        const prev = this.getDirection()

        if(keydown === 'Up' && prev !== 'Down'){
            this.direction = keydown
        }

        if(keydown === 'Down' && prev !== 'Up'){
            this.direction = keydown
        }

        if(keydown === 'Left' && prev !== 'Right'){
            this.direction = keydown
        }

        if(keydown === 'Right' && prev !== 'Left'){
            this.direction = keydown
        }

        if(keydown === 'Enter'){
            this.toggleHandler()
        }

        if(keydown === 'r'){
            this.resetHandler()
        }
    }

    resetHandler(event) {
        this.stop()
        this.arena.innerHTML = ''
        this.#setup()
    }

    toggleHandler(event) {
        this.active ? this.stop() : this.start()
    }

    start(){
        this.active = true
        this.toggle.innerHTML = '&#10074;&#10074; Остановить'
        this.moving = setInterval(this.move.bind(this), this.options.speed)
    }

    stop(){
        this.active = false
        this.toggle.innerHTML = '&#9654; Продолжить'
        clearInterval(this.moving)
    }
    
    destroy(){
        this.stop()
        this.arena.remove()
    }
}   

new SnakeGame('#snake', {
    autostart: 'on'
})

module.exports = SnakeGame