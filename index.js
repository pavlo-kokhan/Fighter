const canvas = document.querySelector('#canvas')
const context = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

// canvas.width = window.innerWidth - 20
// canvas.height = window.innerHeight - 20

const gravity = 0.7

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './images/background.png'
})

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

const animate = () => {
    window.requestAnimationFrame(animate)
    context.fillStyle = 'black'
    context.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
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

const player = new Fighter({
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

const enemy = new Fighter({
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
