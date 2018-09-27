import { mergeMap } from 'rxjs/operators';
import { BeyondService } from '@getbeyond/ng-beyond-js';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable()
export class UserService {
  private resource: any;

  constructor(
    private beyondService: BeyondService
  ) {
    this.resource = this.beyondService.api.resource('users');
  }

  load(findObject: object | number = null, otherParams: object = null): Observable<any> {
   return this.resource.find()
      .pipe(
        mergeMap((response) => {
          return of(response['results']);
        })
      );
  }
}
