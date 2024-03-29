const canvas = document.querySelector('#canvas')
const context = canvas.getContext('2d')

// canvas.width = 1024
// canvas.height = 574

canvas.width = window.innerWidth - 20
canvas.height = window.innerHeight - 20

const gravity = 0.2

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}

class Sprite {
    constructor({ position, velocity, color }) {
        this.width = 50
        this.height = 150
        this.position = position
        this.velocity = velocity
        this.lastKey = ''
        this.color = color
    }

    draw() {
        context.fillStyle = this.color
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else {
            this.velocity.y += gravity
        }
    }
}

const animate = () => {
    window.requestAnimationFrame(animate)
    context.fillStyle = 'black'
    context.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0

    // player movement
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -3
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 3
    }

    // enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -3
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 3
    }
}

const player = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
       x: 0,
       y: 0
    },
    color: 'red'
})

const enemy = new Sprite({
    position: {
        x: 400,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'blue'
})

window.addEventListener('keydown', (event) => {
    console.log(event.key)

    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
           break

        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break

        case 'w':
            player.velocity.y = -10
            break

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break

        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break

        case 'ArrowUp':
            enemy.velocity.y = -10
            break

        default:
            break
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        // player keys
        case 'd':
            keys.d.pressed = false
            break

        case 'a':
            keys.a.pressed = false
            break

        case 'w':
            keys.w.pressed = false
            break

        // enemy keys
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break

        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break

        case 'ArrowUp':
            keys.ArrowUp.pressed = false
            break

        default:
            break
    }
})

context.fillRect(0, 0, canvas.width, canvas.height)

player.draw()
enemy.draw()

animate()