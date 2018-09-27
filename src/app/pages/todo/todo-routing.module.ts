import { TodoEditComponent } from './todo-edit/todo-edit.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const todoRoutes: Routes = [
  {
    path: '',
    component: TodoListComponent
  },
  {
    path: 'task/:taskId',
    component: TodoEditComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(todoRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class TodoRoutingModule { }
