import { TodoService } from './todo.service';
import { NgBeyondModule, BeyondProgressbarModule, BeyondPageModule, BeyondCardModule, BeyondModalModule, BeyondMessageModule, BeyondDialogModule, DialogComponent } from '@getbeyond/ng-beyond-js';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { MatCheckboxModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoEditComponent } from './todo-edit/todo-edit.component';
import { SharedModule } from '../../shared/shared.module';

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
    BeyondCardModule,
    BeyondModalModule,
    BeyondMessageModule,
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BeyondDialogModule
  ],
  declarations: [
    TodoComponent,
    TodoListComponent,
    TodoEditComponent
  ],
  providers: [
    TodoService
  ],
  entryComponents: [
    DialogComponent
  ]
})
export class TodoModule { }
