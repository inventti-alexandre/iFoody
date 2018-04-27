import { imageDefault } from "./../../constant/global";
import { Injectable } from "@angular/core";
import { Router, NavigationEnd  } from '@angular/router';

@Injectable()
export class ShareFunctionService {
  constructor() {}
}
export function handelImgErro(event) {
  event.target.src = imageDefault;
}
export function checkOpenStore(openHour, closeHour) {
  let openHourConvert = openHour.split(":");
  let openTimeSeconds =
    +openHourConvert[0] * 60 * 60 + +openHourConvert[1] * 60;

  let closeHourConvert = closeHour.split(":");
  let closeTimeSeconds =
    +closeHourConvert[0] * 60 * 60 + +closeHourConvert[1] * 60;

  let currentTime = new Date();
  let currentSeconds =
    currentTime.getHours() * 60 * 60 + currentTime.getMinutes() * 60;

  let isOpen = false;
  if (currentSeconds > openTimeSeconds && currentSeconds < closeTimeSeconds) {
    isOpen = true;
  }
  return isOpen;
}
export function scrollTop(router){
  router.events.subscribe((evt) => {
    if (!(evt instanceof NavigationEnd)) {
        return;
    }
    window.scroll(0, 0);
  });
}
export function enCodeUrl(para){
    return btoa(para);
}
export function deCodeUrl(para){
  return atob(para);
}

