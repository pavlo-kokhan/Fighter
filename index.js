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
    constructor({ position, velocity, color, moveSpeed, jumpSpeed, offset }) {
        this.width = 50
        this.height = 150
        this.position = position
        this.velocity = velocity
        this.lastKey = ''
        this.color = color
        this.moveSpeed = moveSpeed
        this.jumpSpeed = jumpSpeed
        this.attackBlock = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 51
        }
        this.isAttacking = false
        this.health = 100
        this.damage = 20
    }

    draw() {
        context.fillStyle = this.color
        context.fillRect(this.position.x, this.position.y, this.width, this.height)

        // attack block draw
        if (this.isAttacking) {
            context.fillStyle = 'gray'
            context.fillRect(
                this.attackBlock.position.x,
                this.attackBlock.position.y,
                this.attackBlock.width,
                this.attackBlock.height
            )
        }
    }

    update() {
        this.draw()
        this.attackBlock.position.x = this.position.x + this.attackBlock.offset.x
        this.attackBlock.position.y = this.position.y

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else {
            this.velocity.y += gravity
        }
    }

    attack() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }
}

const rectangularCollision = ({ first, second }) => {
    return (
        first.attackBlock.position.x + first.attackBlock.width >= second.position.x
        && first.attackBlock.position.x <= second.position.x + second.width
        && first.attackBlock.position.y + first.attackBlock.height >= second.position.y
        && first.attackBlock.position.y <= second.position.y + second.height
    )
}

const determineWinner = ({ player, enemy, timerId }) => {
    clearTimeout(timerId)
    const label = document.querySelector('#winner_label')

    label.style.display = 'flex'
    if (player.health === enemy.health) {
        label.innerHTML = 'Tie'
    } else if (player.health > enemy.health) {
        label.innerHTML = 'Player 1 Wins'
    } else if (enemy.health > player.health) {
        label.innerHTML = 'Player 2 Wins'
    }
}

let timer = parseInt(document.querySelector('#timer').innerHTML)
let timerId
const decreaseTimer = () => {
    timerId = setTimeout(decreaseTimer, 1000)
    if (timer > 0) {
        timer--
        document.querySelector('#timer').innerHTML = timer.toString()
    }

    if (timer === 0) {
        determineWinner({ player, enemy, timerId })
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

    // detect collision for player
    if (rectangularCollision({
        first: player,
        second: enemy
    }) && player.isAttacking) {
        console.log('player attacking')
        player.isAttacking = false
        enemy.health -= player.damage
        document.querySelector('#enemy_health_bar').style.width = enemy.health + '%'
    }

    // detect collision for enemy
    if (rectangularCollision({
        first: enemy,
        second: player
    }) && enemy.isAttacking) {
        console.log('enemy attacking')
        enemy.isAttacking = false
        player.health -= enemy.damage
        document.querySelector('#player_health_bar').style.width = player.health + '%'
    }

    // end of the game based on health
    if (player.health <= 0 || enemy.health <= 0) {
        determineWinner({ player, enemy, timerId })
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
    jumpSpeed: 20,
    offset: {
        x: 0,
        y: 0
    }
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
    jumpSpeed: 20,
    offset: {
        x: -50,
        y: 0
    }
})

window.addEventListener('keydown', (event) => {
    //console.log(event.code)
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

        case 'Space':
            player.attack()
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

        case 'ControlRight':
            enemy.attack()
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

animate()
decreaseTimer()
