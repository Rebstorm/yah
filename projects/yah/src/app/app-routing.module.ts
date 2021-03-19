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
    // Because of https://stackoverflow.com/questions/39763216/routerlink-with-auxiliary-routes
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
