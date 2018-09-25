import { Component, OnInit } from '@angular/core';
import { BeyondService } from '@getbeyond/ng-beyond-js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-todo-app';

  constructor(
    private router: Router,
    private beyondService: BeyondService
  ) {}

  ngOnInit() {
    this.beyondService.afterBeyondAppReady();
  }
}
