import { Injectable } from '@angular/core';
import {environment} from "../environments/environment";
import {HttpClient, HttpEvent} from "@angular/common/http";
import {Observable} from "rxjs";
import {Presentation} from "./Presentation";
import {Resource} from "@angular/compiler-cli/src/ngtsc/metadata";

@Injectable({
  providedIn: 'root'
})
export class PresentationService {
  baseurl=environment.api_uri+'presentations';
  constructor(private http:HttpClient) { }

  getAll():Observable<Presentation[]>{
    return this.http.get<Presentation[]>(this.baseurl);
  }

  download(filename:string):Observable<Blob>{
    return this.http.get(this.baseurl+"/download/"+filename,{
      responseType: 'blob'
    });
  }
  addPresentation(formdata:FormData):Observable<any>{
    return this.http.post<any>(this.baseurl, formdata)

  }
  deletePresentation( id:any):Observable<Presentation>{
    return this.http.delete<Presentation>(this.baseurl+"/"+id)
  }

  updatePresentation(Presentation:any){
    return this.http.put<any>(this.baseurl, Presentation )
  }
}
