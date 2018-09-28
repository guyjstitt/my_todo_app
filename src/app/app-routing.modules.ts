import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionsResolver } from './core/resolvers/permissions.resolver';

const appRoutes: Routes = [
  {
    path: '',
    loadChildren: './pages/home/home.module#HomeModule',
    resolve: {
      permissions: PermissionsResolver
    }
  },
  {
    path: 'home',
    loadChildren: './pages/home/home.module#HomeModule',
    resolve: {
      permissions: PermissionsResolver
    }
  },
  {
    path: 'todo',
    loadChildren: './pages/todo/todo.module#TodoModule',
    resolve: {
      permissions: PermissionsResolver
    }
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {useHash: true}) // important to use hash if the app has to work correctly on Peach platform!!!
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
