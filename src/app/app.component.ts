import { Component } from '@angular/core';
import { TodoModel } from './models/todo';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  todos: TodoModel[] = [];
  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getAllTodos().subscribe({
      next: (data) => {
        this.todos = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }
}
