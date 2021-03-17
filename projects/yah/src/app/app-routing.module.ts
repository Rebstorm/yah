import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'main',
    loadChildren: () =>
      import('./modules/main/main.module').then((m) => m.MainModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/setup/setup.module').then((m) => m.SetupModule),
  },
  {
    path: 'blank',
    loadChildren: () => import('yah-ui').then((m) => m.UiModule),
  },
  {
    path: '**',
    redirectTo: 'main',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true } )],
  exports: [RouterModule],
})
export class AppRoutingModule {}
