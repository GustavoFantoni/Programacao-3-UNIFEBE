class ManipulacaoImg {

    constructor() {
        this.canvas = fx.canvas();
        this.imageOriginal = null;
        this.image = null;
    }

    carregarImagem() {
        this.imageOriginal = document.getElementById('imageOriginal');
        this.image = document.getElementById('image');
    }

    converterEmTextura() {
        this.texture = this.canvas.texture(this.imageOriginal);
    }

    destroy() {
        this.texture.destroy();
    }

    inkFilter() {
        this.canvas.draw(this.texture).ink(0.25).update();
    }

    noise() {
        this.canvas.draw(this.texture).noise(1).update();
    }

    sepia() {
        this.canvas.draw(this.texture).sepia(1).update();
    }

    brilhoContraste(brilho, contraste) {
        this.canvas.draw(this.texture).brightnessContrast(brilho, contraste).update();
    }

    pixelate() {
        this.canvas.draw(this.texture).hexagonalPixelate(this.canvas.width / 2, this.canvas.height / 2, 10).update();
    }

    atualizarCanvas() {
        this.image.parentNode.insertBefore(this.canvas, this.image);
        this.image.parentNode.removeChild(this.image);
    }

    toDataUrl() {
        this.image.src = this.canvas.toDataURL('image/png');
    }
}
