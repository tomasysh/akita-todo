import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { take, filter, switchMap } from 'rxjs/operators';

import { ApiService } from 'src/app/api.service';
import { Todo, TodoStatus } from 'src/app/todo.model';
import { TodoQuery } from 'src/app/state/query';
import { TodoStore } from 'src/app/state/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loading = false;
  todos: Todo[] = [];
  todoStates = TodoStatus;

  constructor(
    private router: Router,
    private todoQuery: TodoQuery,
    private todoStore: TodoStore,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.todoQuery.getIsLoading().subscribe((isLoading) => this.loading = isLoading);
    this.todoQuery.getTodos().subscribe((todos) => this.todos = todos);
    this.todoQuery.getLoaded().pipe(
      take(1),
      filter((res) => !res),
      switchMap(() => {
        this.todoStore.setLoading(true);
        return this.apiService.getTodos();
      })
    ).subscribe((todos) => {
      this.todoStore.update((state) => {
        return {
          todos
        };
      });
      this.todoStore.setLoading(false);
    },
    err => {
      console.log(err);
      this.todoStore.setLoading(false);
      }
    );
  }

  addTodo(): void {
    this.router.navigateByUrl('/add-todo');
  }

  markAsComplete(targetTodo: Todo): any {
    const completedTodo = {
      ...targetTodo,
      status: TodoStatus.DONE
    };
    this.apiService.updateTodo(targetTodo.id, completedTodo).subscribe((res) => {
      this.todoStore.update((state) => {
        const todos = [...state.todos];
        const index = todos.findIndex((todo) => todo.id === targetTodo.id);
        todos[index] = {
          ...todos[index],
          status: TodoStatus.DONE
        };
        return {
          ...state,
          todos
        };
      });
    }, err => console.log(err));
  }

  deleteTodo(id: string): any {
    this.apiService.deleteTodo(id).subscribe((res) => {
      this.todoStore.update((state) => {
        return {
          ...state,
          todos: state.todos.filter((todo) => todo.id !== id)
        };
      });
    }, err => console.log(err));
  }
}
