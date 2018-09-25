import { TodoService } from './todo.service';
import { NgBeyondModule, BeyondProgressbarModule, BeyondPageModule, BeyondCardModule } from '@getbeyond/ng-beyond-js';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TodoRoutingModule,
    NgBeyondModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    BeyondProgressbarModule,
    BeyondPageModule,
    BeyondCardModule
  ],
  declarations: [
    TodoComponent,
    TodoListComponent
  ],
  providers: [
    TodoService
  ]
})
export class TodoModule { }
