import {ImageDomain} from '../assets/constants/apiUrl';
export function handelImagePath(listImage){
    listImage.forEach(image => {
        image.path = image.path.replace("~/",ImageDomain);
    });
    return listImage;
}