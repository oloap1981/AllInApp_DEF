import { CircolariDetailsModule } from './pages/circolari-details/circolari-details.module';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'circolari',
    loadChildren: () => import('./pages/circolari/circolari.module').then(m => m.CircolariPageModule)
  },
  {
    path: 'circolari-details',
    loadChildren: () => import('./pages/circolari-details/circolari-details.module').then(m => m.CircolariDetailsModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
