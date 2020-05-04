import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { MotelDetailComponent } from './motel-detail/motel-detail.component';
import { MotelsServiceService } from './motels-service.service';
import { MotelFormComponent } from './motel-form/motel-form.component';
import { MotelsComponent } from './motels/motels.component';
import { StudentFormComponent } from './student-form/student-form.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule,
    RouterModule.forRoot([
    {path: '', component:MotelsComponent},
    {path:'detail/:id' , component:MotelDetailComponent },
    {path:'add-motel', component:MotelFormComponent},
    {path:'edit-motel/:id', component:MotelFormComponent},
    {path:'motels/:mid/edit-student/:id', component:StudentFormComponent},
    {path:'motels/:mid/add-student', component:StudentFormComponent},
  
  ]) 
   ],
  declarations: [ AppComponent, HelloComponent, MotelDetailComponent, MotelFormComponent, MotelsComponent, StudentFormComponent ],
  bootstrap:    [ AppComponent ],
  providers: [MotelsServiceService]
})
export class AppModule { }
