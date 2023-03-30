import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemFormComponent } from './components/item-form/item-form.component';

import { CatListComponent } from './components/cat-list/cat-list.component';
import { CatFormComponent } from './components/cat-form/cat-form.component';
 
const routes: Routes = [
  {
    path: '',
    redirectTo: '/items',
    pathMatch: 'full'
  },
  {
    path: 'items',
    component: ItemListComponent
  },
  {
    path: 'cats',
    component: CatListComponent
  },
  {
    path: 'items/create',
    component: ItemFormComponent
  },
  {
    path: 'cats/create',
    component: CatFormComponent
  },
  {
    path: 'items/edit/:id',
    component: ItemFormComponent
  },
  {
    path: 'cats/edit/:id',
    component: CatFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
