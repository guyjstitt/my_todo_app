import { UserService } from './services/user/user.service';
import { TaskService } from './services/task/task.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    TaskService,
    UserService
  ]
})
export class SharedModule { }
