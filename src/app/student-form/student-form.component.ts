import { Component, OnInit } from '@angular/core';
import {MotelsServiceService} from '../motels-service.service';
import {Router,ActivatedRoute} from '@angular/router';
import { FormControl, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
motelData = null;
studentForm = new FormGroup({
    id: new FormControl(null), 
    motelId: new FormControl(null),
    name: new FormControl('',[
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
      Validators.pattern(/^-?(\s)?$/)
    ]),
    roll_number: new FormControl('',[
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(10),
      Validators.pattern(/^-?(0|[1-9]\d*)?$/)
    ]),
    avatar: new FormControl('',[
      Validators.required,
      Validators.pattern(/\.(gif|jpe?g|tiff|png|webp|bmp)$/i)
    ]),
    address: new FormControl('',[
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(50)
    ]),
    room_no: new FormControl('',[
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(7),
      Validators.pattern(/^-?(0|[1-9]\d*)?$/)
    ]),
   
  });
  constructor( private motelService: MotelsServiceService,
      private activeRoute: ActivatedRoute,
      private route: Router) { }

get name() { return this.studentForm.get('name'); }
get roll_number() { return this.studentForm.get('roll_number'); }
get avatar() { return this.studentForm.get('avatar'); }
get address() { return this.studentForm.get('address'); }
get room_no() { return this.studentForm.get('room_no'); }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe(params => {
      let motelId = params.get('mid');
      let studentid = params.get('id');
      this.motelService.getMotelById(motelId).subscribe(data =>{
        console.log(data);
        this.motelData = data;
      })
      this.motelService.geStudent2(motelId, studentid).subscribe(data =>{
        console.log(data);
       this.studentForm.setValue(data);
      })
      
      
    })
  }
  saveStudent() {
    this.studentForm.value.MotelId = this.motelData.id;
    if (this.studentForm.value.id == null) {
      this.motelService.addStudent(this.motelData.id, this.studentForm.value).subscribe(data => {
        this.route.navigate(['/detail/'+this.motelData.id]);
      });
    } else {
     this.motelService.updateStudentById(this.motelData.id, this.studentForm.value).subscribe(data =>{
        console.log(data);
        this.route.navigate(['/detail/'+this.motelData.id]);
      })
    }
    this.resetStudent();
  }
  resetStudent(){
     this.studentForm = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(""),
    roll_number: new FormControl(null),
    avatar: new FormControl(""),
    address: new FormControl(""),
    room_no: new FormControl(null),
    MotelId: new FormControl(null)
  });

  }

}