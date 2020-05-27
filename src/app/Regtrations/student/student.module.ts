import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';


import { StudentPageRoutingModule } from './student-routing.module';

import { StudentPage } from './student.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentPageRoutingModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule
  ],
  declarations: [StudentPage]
})
export class StudentPageModule {}
