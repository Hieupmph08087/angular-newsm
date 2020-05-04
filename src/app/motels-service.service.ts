import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const apiUrl = 'https://5ea69d4c84f6290016ba6e8d.mockapi.io/motels'
@Injectable()
export class MotelsServiceService {

  constructor(private http: HttpClient) { }
getMotel(): Observable<any>{
    return this.http.get<any>(apiUrl);
  }
  geStudent(motelId): Observable<any>{
   students : String;
  let url = `${apiUrl}/${motelId}/${'students'}`;
    return this.http.get<any>(url);
  }
  geStudentByID(id): Observable<any>{
  students : String;
  let url = `${apiUrl}/${id}/${'students'}`;
    return this.http.get<any>(url);
  }
  getMotelById(id): Observable<any>{
    let url = `${apiUrl}/${id}`;
    return this.http.get<any>(url);
  }
  removeMotelById(id): Observable<any>{
    let url = `${apiUrl}/${id}`
    return this.http.delete<any>(url);
  }
  addNewMotel(motelObject): Observable<any>{
    
    return this.http.post<any>(apiUrl, motelObject);
  }
  updateMotel(motelObject): Observable<any>{
    let url = `${apiUrl}/${motelObject.id}`;
    return this.http.put<any>(url, motelObject);
  }
  //students
  removeStudentById(motId,stId): Observable<any>{
    students : String;
    let url = `${apiUrl}/${motId}/${'students'}/${stId}`;
    return this.http.delete<any>(url);
  }
  //cap nhat
  updateStudentById(motId,studentObject): Observable<any>{
    students : String;
    let url = `${apiUrl}/${motId}/${'students'}/${studentObject.id}`;
    return this.http.put<any>(url, studentObject);
  }

  geStudent2(motelId, studentid): Observable<any>{
   students : String;
  let url = `${apiUrl}/${motelId}/${'students'}/${studentid}`;
    return this.http.get<any>(url);
  }

   addStudent(motelId, studentObject): Observable<any> {
     students : String;
    let url = `${apiUrl}/${motelId}/${'students'}`;
    return this.http.post<any>(url, studentObject);
  }
}