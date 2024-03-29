const canvas = document.querySelector('#canvas')
const context = canvas.getContext('2d')

// canvas.width = 1024
// canvas.height = 574

canvas.width = window.innerWidth - 20
canvas.height = window.innerHeight - 20

const gravity = 0.7

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
    constructor({ position, velocity, color, moveSpeed, jumpSpeed }) {
        this.width = 50
        this.height = 150
        this.position = position
        this.velocity = velocity
        this.lastKey = ''
        this.color = color
        this.moveSpeed = moveSpeed
        this.jumpSpeed = jumpSpeed
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
        player.velocity.x = -player.moveSpeed
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = player.moveSpeed
    }

    // enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -enemy.moveSpeed
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = enemy.moveSpeed
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
    color: 'red',
    moveSpeed: 5,
    jumpSpeed: 20
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
    color: 'blue',
    moveSpeed: 5,
    jumpSpeed: 20
})

window.addEventListener('keydown', (event) => {
    console.log(event.code)
    // player keys
    switch (event.code) {
        case 'KeyD':
            keys.d.pressed = true
            player.lastKey = 'd'
           break

        case 'KeyA':
            keys.a.pressed = true
            player.lastKey = 'a'
            break

        case 'KeyW':
            player.velocity.y = -player.jumpSpeed
            break

        // enemy keys
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break

        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break

        case 'ArrowUp':
            enemy.velocity.y = -enemy.jumpSpeed
            break

        default:
            break
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.code) {
        // player keys
        case 'KeyD':
            keys.d.pressed = false
            break

        case 'KeyA':
            keys.a.pressed = false
            break

        case 'KeyW':
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