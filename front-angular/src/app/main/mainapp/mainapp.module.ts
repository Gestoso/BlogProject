import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { MainappRoutingModule } from './mainapp-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MainappRoutingModule,
    DatePipe
  ],
  providers:[DatePipe]
})
export class MainappModule { }
