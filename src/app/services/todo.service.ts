import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment"
import { TodoModel } from "../models/todo"
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }
  todos: TodoModel[] = []
  baseUrl = environment.apiUrl + "/todos"

  getAllTodos() {
    return this.http.get<any[]>(this.baseUrl)
  }

  getTodoById(idTodo: number) {
    return this.http.get<any[]>(`${this.baseUrl}/byId/${idTodo}`)
  }

  getTodoByTitle(titre: string) {
    return this.http.get<any[]>(`${this.baseUrl}/byTitle/${titre}`)
  }

  createTodo(todo: TodoModel) {
    return this.http.post<TodoModel[]>(this.baseUrl, todo)
  }

  updateTodo(idTodo: number, todo: TodoModel) {
    return this.http.put<any[]>(`${this.baseUrl}/${idTodo}`, todo)
  }

  deleteTodo(idTodo: number) {
    return this.http.delete(`${this.baseUrl}/${idTodo}`)
  }

}
