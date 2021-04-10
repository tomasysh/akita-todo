import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiService } from 'src/app/api.service';
import { Todo } from 'src/app/todo.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  todos$: Observable<Todo[]>;

  constructor(
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.todos$ = this.apiService.getTodos();
  }

  addTodo() {
    // this.apiService.addTodo('hello', 'world');
    this.router.navigateByUrl('/add-todo')
  }

  deleteTodo() {
    this.apiService.deleteTodo('2');
  }

  updateTodo(): void {
    this.apiService.updateTodo('0', { title: 'aa', description: 'hh'}).subscribe((updateTodo) => {
      console.log(updateTodo);
    });
  }
}
