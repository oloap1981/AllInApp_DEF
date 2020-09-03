import { CircolariDetailsPage } from './circolari-details';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CircolariDetailsPageRoutingModule } from './circolari-details-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    CircolariDetailsPage,
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    CircolariDetailsPageRoutingModule
  ],
  exports: [
    CircolariDetailsPage
  ]
})
export class CircolariDetailsModule {}
