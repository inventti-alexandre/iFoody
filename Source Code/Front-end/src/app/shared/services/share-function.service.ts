import { imageDefault } from "./../../constant/global";
import { Injectable } from "@angular/core";

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
export function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback,errorCallback,{timeout:10000});
  }
  function successCallback(position) {
    debugger
    var pos;
    pos.lat = position.coords.latitude;
    pos.lng = position.coords.longitude;
    return pos
  }
  function errorCallback(){debugger}
}

