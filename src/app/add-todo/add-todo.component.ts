import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { ApiService } from 'src/app/api.service';
import { TodoStore } from 'src/app/state/store';
import { Todo } from 'src/app/todo.model';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private todoStore: TodoStore,
    private apiService: ApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: this.formBuilder.control(null, [Validators.required]),
      description: this.formBuilder.control(null, [Validators.required]),
    });
  }

  addTodo(): Observable<Todo> {
    console.log(this.form.value);
    if (this.form.valid) {
      const { title, description } = this.form.value;
      this.todoStore.setLoading(true);
      this.apiService.addTodo(title, description).subscribe((res) => {
        this.todoStore.update((state) => {
          return {
            todos: [
              ...state.todos,
              res
            ]
          };
        });
        this.todoStore.setLoading(false);
        this.router.navigateByUrl('');
      });
    } else {
      return;
    }
  }

}
