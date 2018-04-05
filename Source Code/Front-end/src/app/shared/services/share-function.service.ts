import { imageDefault } from './../../constant/global';
import { Injectable } from '@angular/core';

@Injectable()
export class ShareFunctionService {

  constructor() { }
}
export function handelImgErro(event){
  event.target.src = imageDefault;
}
