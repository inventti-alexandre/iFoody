import { Component, OnInit, Output, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
//   inputs:['activeColor','baseColor','overlayColor']
})
export class FileUploadComponent implements OnInit {
    @Input() activeColor = 'green';
    @Input() baseColor = '#ccc';
    @Input() overlayColor = 'rgba(255,255,255,0.5)';
    @Output() imageContent = new EventEmitter();
    dragging = false;
    loaded = false;
    imageLoaded = false;
    @Input('imageSrc') imageSrc = '';
    // Tuan Add
    @Output() file: any;
  constructor() { 
    
  }

  ngOnInit() {
  }
  
  
  
  handleDragEnter() {
      this.dragging = true;
  }
  
  handleDragLeave() {
      this.dragging = false;
  }
  
  handleDrop(e) {
      e.preventDefault();
      this.dragging = false;
      this.handleInputChange(e);
  }
  
  handleImageLoad() {
      this.imageLoaded = true;
    //   this.iconColor = this.overlayColor;
  }

  handleInputChange(e) {
     this.file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

      let pattern = /image-*/;
      let reader = new FileReader();

      if (!this.file.type.match(pattern)) {
          alert('invalid format');
          return;
      }

      this.loaded = false;

      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(this.file);
      console.log("fileupload works");
      console.log(this.file);
      return this.file;
  }
  
  _handleReaderLoaded(e) {
      let reader = e.target;
      this.imageSrc = reader.result;
      this.loaded = true;
      this.imageContent.emit(this.imageSrc);
    //   console.log(reader);
  }
  
  _setActive() {
    //   this.borderColor = this.activeColor;
      if (this.imageSrc.length === 0) {
        //   this.iconColor = this.activeColor;
      }
  }
  
  _setInactive() {
    //   this.borderColor = this.baseColor;
      if (this.imageSrc.length === 0) {
        //   this.iconColor = this.baseColor;
      }
  }
  

}
