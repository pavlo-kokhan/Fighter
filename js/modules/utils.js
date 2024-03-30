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