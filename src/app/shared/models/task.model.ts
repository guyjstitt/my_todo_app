import { FormGroup, Validators, FormControl } from '@angular/forms';

const FIELDS = ['assigned_user_id', 'description', 'due_date', 'is_complete', 'location_id'];

export class Task {
  constructor (
    fields: Partial<Task> &
    {
      description: Task['description'],
      assigned_user_id: Task['assigned_user_id']
    }) {}

  id?: number;
  description: string;
  is_complete = false;
  assigned_user_id: number;
  due_date: string;
  location_id: number;

  static asFormGroup(task: Partial<Task>): FormGroup {
    const { id, description, is_complete = false, assigned_user_id, due_date, location_id } = task;

    return new FormGroup({
      id: new FormControl(id),
      description: new FormControl(description, [Validators.required, Validators.maxLength(256)]),
      is_complete: new FormControl(is_complete),
      assigned_user_id: new FormControl(assigned_user_id),
      due_date: new FormControl(due_date),
      location_id: new FormControl(location_id)
    });
  }
}
