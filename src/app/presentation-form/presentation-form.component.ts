import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Presentation} from "../Presentation";

@Component({
  selector: 'app-presentation-form',
  templateUrl: './presentation-form.component.html',
  styleUrls: ['./presentation-form.component.css']
})
export class PresentationFormComponent implements OnInit {

  @Input() presentation:Presentation= new Presentation();
  @Output() notif= new EventEmitter<any[]>();
  file!: any;
  presfile!: File;
  imgUrl!:any;

  emmision: any[]=[];
  constructor() { }

  ngOnInit(): void {

  }


  onImage(event:any){
    this.file=event.target.files[0];
    let reader= new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload=(_event)=>this.imgUrl=reader.result;
  }

  onfile(event:any){
    this.presfile=event.target.files[0];

  }

  sendDataToParent(f:any){
    this.emmision.push(f.value);
    this.emmision.push(this.file);
    this.emmision.push(this.presfile);
    this.notif.emit(this.emmision);
    f.resetForm()
  }

}
