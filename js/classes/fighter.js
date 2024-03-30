class Fighter {
    constructor({ position, velocity, color, moveSpeed, jumpSpeed, offset }) {
        this.position = position
        this.velocity = velocity
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
        this.width = 50
        this.height = 150
        this.lastKey = ''
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

        if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
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