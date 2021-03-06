import { Injectable } from '@angular/core';

import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';

import { TodoState, TodoStore } from 'src/app/state/store';
import { Todo } from 'src/app/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoQuery extends Query<TodoState> {
  constructor(private todoStore: TodoStore) {
    super(todoStore);
  }

  getTodos(): Observable<Todo[]> {
    return this.select(state => state.todos);
  }

  getLoaded(): Observable<boolean> {
    return this.select(state => state.isLoaded);
  }

  getIsLoading(): Observable<boolean> {
    return this.selectLoading();
  }

}
