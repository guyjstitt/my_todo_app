import { UserService } from './services/user/user.service';
import { TaskService } from './services/task/task.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionsPipe } from './pipes/permissions.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PermissionsPipe],
  providers: [
    TaskService,
    UserService
  ]
})
export class SharedModule { }
