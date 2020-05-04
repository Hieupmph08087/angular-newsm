import { Component, OnInit } from '@angular/core';
import {MotelsServiceService} from '../motels-service.service'

@Component({
  selector: 'app-motels',
  templateUrl: './motels.component.html',
  styleUrls: ['./motels.component.css']
})
export class MotelsComponent implements OnInit {
motels=[];
  constructor(private MotelService : MotelsServiceService) { }

  ngOnInit() {
    this.MotelService.getMotel().subscribe(data =>{
      console.log(data);
      this.motels = data;
    })
  }

}