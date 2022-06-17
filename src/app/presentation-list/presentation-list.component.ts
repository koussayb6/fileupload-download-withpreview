import {Component, OnInit} from '@angular/core';
import {Presentation} from "../Presentation";
import {PresentationService} from "../presentation.service";
import {HttpErrorResponse, HttpEventType} from "@angular/common/http";
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-presentation-list',
  templateUrl: './presentation-list.component.html',
  styleUrls: ['./presentation-list.component.css']
})
export class PresentationListComponent implements OnInit {
  presentations!:Presentation[];
  presentation!:Presentation;
  showEdit:boolean=false;
  page = 1;
  count = 0;
  tableSize = 2;
  tableSizes = [3, 6, 9, 12];
  index!:any;

  constructor(private servicePres:PresentationService) { }

  ngOnInit(): void {
    this.getAll();
  }
  getAll(){
    this.servicePres.getAll().
    subscribe((resultat)=>{

        this.presentations=resultat;

      },
      (error)=>{
        console.log(error.status)
      }
    );
  }
  onTableDataChange(event:any){
    this.page = event;
    this.getAll();
  }

  onTableSizeChange(event:any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAll();
  }
  download(filename: string){
    this.servicePres.download(filename).subscribe( event => {
        console.log(event);
        saveAs(event, filename);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  addPresentation(event:any){
    let close= document.getElementById("close")
    close?.click()
    console.log(event[0]);

    let data= new FormData();

    data.append('title', event[0].title);
    data.append('description', event[0].description);
    data.append('preview', event[1]);
    data.append('file', event[2]);
    this.servicePres.addPresentation(data).subscribe((resultat)=>{
        console.log(resultat);
        this.presentations.unshift(resultat);

      },
      (error)=>{
        console.log(error.status)
      }
    );

  }
  update(presentation:any,i:any){
    this.showEdit=true;
    this.presentation=presentation;
    this.index=i;

  }
  updatePresentation(event:any){

    let close= document.getElementById("close")
    close?.click()
    console.log(event[0]);

    let data= new FormData();

    data.append('title', event[0].title);
    data.append('description', event[0].description);
    data.append('preview', event[1]);
    data.append('file', event[2]);
    data.append('id', this.presentation.id.toString());
    this.servicePres.updatePresentation(data).subscribe((resultat)=>{
        console.log(resultat);
        this.presentations[this.index]=resultat;
      },
      (error)=>{
        console.log(error.status)
      }
    );
    this.showEdit=false;
  }

  delete(id:number){
    var result=confirm("sure?");
    if(result){
      this.servicePres.deletePresentation(id).subscribe(
        () => this.presentations = this.presentations.filter(e => e.id != id),
      );}
  }


}
