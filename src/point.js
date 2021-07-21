const { excludePosition, css } = require("./util")

class Point{
    constructor(parent, options){
        this.options = options
        this.parent = parent

        this.init()
    }

    init(){
        this.point = document.createElement('div')
        this.point.setAttribute('class', 'snake-point')

        css(this.point, {
            width: this.options.size + 'px',
            height: this.options.size + 'px'
        })

        this.parent.prepend(this.point)
    }

    setPosition(current){
        let variants, index, position

        variants = excludePosition(this.options.positions, current)
        index = Math.floor( Math.random() * variants.length )
        if(!variants.length){
            return false
        }
        position = variants[index].split(':')
        this.x = Number(position[0])
        this.y = Number(position[1])

        css(this.point, {
            top: this.y * this.options.size + 'px',
            left: this.x * this.options.size + 'px'
        })     

    }
}

module.exports = Point