import { Component, OnInit } from '@angular/core';
import { TodoModel } from '../../models/todo';
import { TodoService } from '../../services/todo.service';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos: any[] = [];
  todoForm: boolean = false;
  isNewTodo: boolean = true;
  newTodo: TodoModel = new TodoModel();
  editTodoForm: boolean = false;
  editedTodo: TodoModel = new TodoModel();
  idTodo: number = 5

  selected: number = 0;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getAllTodos().subscribe({
      next: (data) => {
        data = data.sort((function (a,b) {
          return a.date.rendered - b.date.rendered
        }))
        this.todos = data;
        console.log(data);
        console.log(this.todoForm)
      },
      error: (e) => console.error(e)
    });
  }

  selectOption(id: number) {
    //getted from event
    console.log(id);
    //getted from binding
    console.log(this.selected)
  }


  showEditTodoForm(todo: TodoModel) {
    if (!todo) {
      this.todoForm = false;
      return;
    }
    this.editTodoForm = true;
    this.todoForm = false;
    this.editedTodo = todo;
  }

  showAddTodoForm() {
    // resets form if edited user
    if (this.todos.length) {
      this.newTodo = new TodoModel;
    }
    this.todoForm = true;
    this.editTodoForm = false;
    this.isNewTodo = true;
  }

  saveTodo(todo: TodoModel): void {
    if (this.isNewTodo) {
      // add a new user
      this.todoService.createTodo(todo).subscribe(() => {
        console.log(todo)
      })
      this.todos.push(todo);
    }
    this.todoForm = false;
  }

  updateTodo() {
    this.todoService.updateTodo(this.idTodo, this.editedTodo);
    this.editTodoForm = false;
    this.editedTodo = new TodoModel;
  }

  removeTodo(todo: TodoModel) {
    this.todoService.deleteTodo(todo.idTodo).subscribe(res => {
      this.ngOnInit()
    });
  }

  cancelEdits() {
    this.editedTodo = new TodoModel();
    this.editTodoForm = false;
    this.todoForm = false;
  }

  cancelNewTodo() {
    this.editedTodo = new TodoModel();
    this.editTodoForm = false;
    this.todoForm = false;
  }
}
