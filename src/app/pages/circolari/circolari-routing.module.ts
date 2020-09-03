import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CircolariPage } from './circolari.page';

const routes: Routes = [
  {
    path: '',
    component: CircolariPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CircolariPageRoutingModule {}
