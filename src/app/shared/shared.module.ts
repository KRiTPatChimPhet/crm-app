import { NgModule } from '@angular/core';
import { ThaiDatePipe } from './pipes/thaidate.pipe';
import { ThaiOrderStatusPipe } from './pipes/thai-order-status.pipe';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [ThaiDatePipe, ThaiOrderStatusPipe],
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule],
  exports: [ThaiDatePipe, ThaiOrderStatusPipe],
})
export class SharedModule {}
