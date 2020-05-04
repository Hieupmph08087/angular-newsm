import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MotelsServiceService} from '../motels-service.service';
import {Router,ActivatedRoute} from '@angular/router'
@Component({
  selector: 'app-motel-form',
  templateUrl: './motel-form.component.html',
  styleUrls: ['./motel-form.component.css']
})
export class MotelFormComponent implements OnInit {
  motelForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl('',[
           Validators.required,
           
           Validators.minLength(4),
           Validators.maxLength(20)
      ]),
      owner: new FormControl('',[
        Validators.required,
           Validators.minLength(2),
           Validators.maxLength(10)
      ]),
      avatar: new FormControl('',[
        Validators.required,
        Validators.pattern(/\.(gif|jpe?g|tiff|png|webp|bmp)$/i)
      ]),
      address: new FormControl('',[
        Validators.required,
           Validators.minLength(5),
           Validators.maxLength(50)
      ]),
      room_number: new FormControl('',[
        Validators.required,
        Validators.maxLength(5),
        Validators.pattern(/^-?(0|[1-9]\d*)?$/)
      ])

  })
  constructor(private motelService : MotelsServiceService,
      private route: Router,
      private activeRoute: ActivatedRoute) { }

get name() { return this.motelForm.get('name'); }
get owner() { return this.motelForm.get('owner'); }
get avatar() { return this.motelForm.get('avatar'); }
get address() { return this.motelForm.get('address'); }
get room_number() { return this.motelForm.get('room_number'); }


  ngOnInit() {
     this.activeRoute.paramMap.subscribe(params =>{
        let motelId = params.get('id');
        this.motelService.getMotelById(motelId).subscribe(data =>{
          this.motelForm.setValue(data);
        })       
      })
  }
    saveMotel(){
    if(this.motelForm.value.id == null){
      //them moi
      this.motelService.addNewMotel(this.motelForm.value).subscribe(data =>{
        console.log(data);
        this.route.navigate(['']);
      
      })
    }else{
      //cap nhat
      this.motelService.updateMotel(this.motelForm.value).subscribe(data =>{
        console.log(data);
        this.route.navigate(['']);
      
      })
    }
  }

}