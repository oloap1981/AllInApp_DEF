import { CircolariPage } from './circolari.page';

import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CircolariPageRoutingModule } from './circolari-routing.module';
import { FormsModule } from '@angular/forms';
import { ListObjectComponent } from 'src/app/components/list-object/list-object';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
declarations: [CircolariPage,
        ListObjectComponent],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        FontAwesomeModule,
        CircolariPageRoutingModule],
exports: [CircolariPage]
})
export class CircolariPageModule {}
