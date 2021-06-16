const isIntersecting = (entry) => {
    return entry.isIntersecting;
}

const loadImage = (entry) => {
    const container = entry.target;
    const image = container.firstChild;
    const url = image.dataset.src;
    //load image
    image.src = url;

    //unlisten
    observer.unobserve(container)
}

//para utilizar la API intersectionObserver se debe instanciar
const observer = new IntersectionObserver((entries) => { //funcion que dice que hacer por imagen
    entries
        .filter(isIntersecting)
        .forEach(loadImage)
}) 

export const registerImage = (image) => {
    //intersectionObserver -> observer(imagen)
    observer.observe(image);
} 