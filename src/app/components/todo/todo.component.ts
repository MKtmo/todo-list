
import { Component, Injectable, Input, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { ModalConfig } from './modal.config'
/*import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'*/
import { TodoService } from "../../services/todo.service"
import { TodoModel } from "../../models/todo"
//import { ToastrService} from "ngx-toastr"

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

@Injectable()
export class TodoComponent implements OnInit {
  todos: TodoModel[] = [];
  currentTodo: TodoModel = new TodoModel();
  currentIndex = -1;
  todoForm: boolean = false;
  isNewTodo: boolean = true;
  newTodo: TodoModel = new TodoModel();
  editTodoForm: boolean = false;
  editedTodo: TodoModel = new TodoModel();
  idTodo: number = 5
  @Input() public modalConfig: ModalConfig | undefined
  @ViewChild('modal') private modalContent: TemplateRef<TodoComponent> | undefined
  /*private modalRef: NgbModalRef*/

  constructor(private todoService: TodoService, /*private modalService: NgbModal*/) { }

  ngOnInit() {
    this.todoService.getAllTodos().subscribe({
      next: (data) => {
        this.todos = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }
  /*
    open(): Promise<boolean> {
      return new Promise<boolean>(resolve => {
        this.modalRef = this.modalService.open(this.modalContent)
        this.modalRef.result.then(resolve, resolve)
      })
    }

    async close(): Promise<void> {
      if (this.modalConfig!.shouldClose === undefined || (await this.modalConfig!.shouldClose())) {
        const result = this.modalConfig!.onClose === undefined || (await this.modalConfig!.onClose())
        this.modalRef.close(result)
      }
    }

    async dismiss(): Promise<void> {
      if (this.modalConfig!.shouldDismiss === undefined || (await this.modalConfig!.shouldDismiss())) {
        const result = this.modalConfig!.onDismiss === undefined || (await this.modalConfig!.onDismiss())
        this.modalRef.dismiss(result)
      }
    }
    */

  retrieveTutorials(): void {
    this.todoService.getAllTodos()
      .subscribe({
        next: (data) => {
          this.todos = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveTutorials();
    this.currentTodo = new TodoModel();
    this.currentIndex = -1;
  }

  showEditTodoForm(todo: TodoModel) {
    if (!todo) {
      this.todoForm = false;
      return;
    }
    this.editTodoForm = true;
    this.editedTodo = todo;
  }

  showAddTodoForm() {
    // resets form if edited user
    if (this.todos.length) {
      this.newTodo = new TodoModel;
    }
    this.todoForm = true;
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
    this.todoService.deleteTodo(todo.idTodo);
    let index = this.todoService.todos.indexOf(this.currentTodo);
    this.todos.splice(index, 1);
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

