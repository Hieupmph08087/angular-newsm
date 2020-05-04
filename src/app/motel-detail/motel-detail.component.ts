import { Component, OnInit } from '@angular/core';
import {MotelsServiceService} from '../motels-service.service';
import {Router , ActivatedRoute} from '@angular/router'
import { FormControl, FormGroup } from "@angular/forms";
@Component({
  selector: 'app-motel-detail',
  templateUrl: './motel-detail.component.html',
  styleUrls: ['./motel-detail.component.css']
})
export class MotelDetailComponent implements OnInit {
  motelData = null;
  studentMotel = [];
  studentForm = new FormGroup({
    id: new FormControl(null),
    motelId: new FormControl(null),
    name: new FormControl(''),
    roll_number: new FormControl(''),
    avatar: new FormControl(''),
    address: new FormControl(''),
    room_no: new FormControl(''),
  });
  constructor(private motelService: MotelsServiceService,
      private activeRoute: ActivatedRoute,
      private route: Router) { }

  ngOnInit() {
     this.activeRoute.paramMap.subscribe(params => {
      let motelId = params.get('id');
      this.motelService.getMotelById(motelId).subscribe(data =>{
        console.log(data);
        this.motelData = data;
        
      })
      this.motelService.geStudent(motelId).subscribe(data => {
      console.log(data);
      this.studentMotel= data;
        
    })
    })
  }
 removeMotel(){
    let conf = confirm("Bạn muốn xóa nhà trọ này?");
    if (conf == true) {
    this.motelService.removeMotelById(this.motelData.id).subscribe(data =>{
      this.route.navigate(['']);
    })
    }
  }

   removeS(studentMotel){
    let conf = confirm("Bạn muốn xóa sinh vien này?");
    if (conf == true) {
    this.motelService.removeStudentById(this.motelData.id , studentMotel.id).subscribe(data =>{
        this.ngOnInit();
    })
    }
  }

  editStudent(student) {
   this.motelService.geStudent2(this.motelData.id,student.id).subscribe(data =>{
        console.log(data);
       this.studentForm.setValue(data);
      })
  }
}