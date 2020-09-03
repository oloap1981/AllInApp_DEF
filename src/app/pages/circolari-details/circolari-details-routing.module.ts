import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CircolariDetailsPage } from './circolari-details';

const routes: Routes = [
  {
    path: '',
    component: CircolariDetailsPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CircolariDetailsPageRoutingModule {}
