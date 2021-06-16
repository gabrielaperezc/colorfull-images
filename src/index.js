import {registerImage} from './lazy';

const imagesContainer = document.getElementById("main__imagesContainer");
const colorButtons = document.getElementById("main__buttonsContainer");
const deleteButton = document.getElementById("main__buttonDelete");
const main = document.getElementById("main");

const getImageSrc = async (query) => {
    const clientId = "0pjxCqNOFdM1VuTiPRxqavjzGZDpR0Ht13Dk3em1Q0E";
    const URL = `https://api.unsplash.com/photos/random?query=${query}&client_id=${clientId}`;  

    try{
        const response = await fetch(URL);
        const info = await response.json();
        const urlImg = info.urls.small;
        return urlImg;      
    } catch (error){
        console.log(error);
    }
}

const createImgNode = (url) => {
    const imgContainer = document.createElement("div");
    imgContainer.className = "px-2 pb-4 w-4/12 tablet-div-image mobile-div-image";

    const image = document.createElement("img");
    image.dataset.src = url;
    image.className = "object-cover rounded-md h-full w-full";
    imgContainer.appendChild(image);

    return imgContainer;
}

const buttonToDelete = () => {
    imagesContainer.hasChildNodes() 
        ? deleteButton.className = "displayButton"
        : deleteButton.className = "hidden"; 
}

const getImage = async (e) => {
    if(e.target.nodeName === "BUTTON"){
        const data = await getImageSrc(e.target.value);
        const newImage = createImgNode(data);
        imagesContainer.appendChild(newImage);
        registerImage(newImage);

        if(imagesContainer.children.length === 1){
            main.className = "displayMainContent";
            imagesContainer.classList.remove("hidden");
            imagesContainer.className = "displayImagesContainer";
            buttonToDelete();
	    }
    }
}

const deleteImage = () => {
    imagesContainer.replaceChildren()
    buttonToDelete();
    if(imagesContainer.children.length === 0){
        imagesContainer.className = "hidden";
        main.className = "main";
    }
}

colorButtons.addEventListener('click', getImage);  
deleteButton.addEventListener('click', deleteImage);






