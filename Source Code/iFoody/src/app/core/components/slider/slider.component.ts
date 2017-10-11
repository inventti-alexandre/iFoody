import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  slider=[
    {src: "http://lorempixel.com/1200/600/animals/",name:"Lẩu cá", title:"Siêu cay, siêu ngon"},
    {src: "http://lorempixel.com/1200/600/food/", name:"Bún riêu cua", title:"Bí quyết thất truyền đã trở lại"},
    {src: "http://lorempixel.com/1200/600/nature/", name: "Kem xicola", title:"Mùa hè thiệt mát"}
  ]
}
