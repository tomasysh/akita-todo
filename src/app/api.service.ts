import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Todo } from 'src/app/todo.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient
  ) {}

  addTodo(title: string, description: string): Observable<Todo> {
    return this.http.post<Todo>('http://localhost:3000/todos', {title, description, id: '3'});
  }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>('http://localhost:3000/todos');
  }

  deleteTodo(id: string): Observable<Todo> {
    return this.http.delete<Todo>(`http://localhost:3000/todos/${id}`);
  }

  updateTodo(id: string, chagnes: Todo): Observable<Todo> {
    return this.http.put<Todo>(`http://localhost:3000/todos/${id}`, chagnes);
  }

}
