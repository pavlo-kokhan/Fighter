class Sprite {
    constructor({ position, imageSrc }) {
        this.width = 50
        this.height = 150
        this.position = position
        this.image = new Image(imageSrc)
        this.image.src = imageSrc
    }

    draw() {
        context.drawImage(this.image, this.position.x, this.position.y)
    }

    update() {
        this.draw()
    }
}