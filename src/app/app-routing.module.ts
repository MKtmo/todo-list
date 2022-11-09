import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoComponent } from './components/todo/todo.component';
import { UpdateTodoComponent } from './components/update-todo/update-todo.component';

const routes: Routes = [
  { path: '', component: TodoListComponent },
  { path: 'Todo', component: TodoComponent },
  { path: 'Todolist', component: TodoListComponent },
  { path: 'AddTodo', component: AddTodoComponent },
  { path: 'UpdateTodo', component: UpdateTodoComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
