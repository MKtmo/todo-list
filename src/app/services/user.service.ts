import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment"
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.apiUrl + "/users"
  userList: any = []

  getAllUsers() {
    return this.http.get<UserModel[]>(this.baseUrl)
  }

  getUserById(idUser: number) {
    return this.http.get<UserModel>(`${this.baseUrl}/${idUser}`)
  }

  createUser(user: UserModel) {
    return this.http.post<UserModel[]>(this.baseUrl, user)
  }

  updateUser(idUser: number, user: UserModel) {
    return this.http.put(`${this.baseUrl}/${idUser}`, user)
  }

  deleteUser(idUser: number) {
    return this.http.delete(`${this.baseUrl}/${idUser}`)
  }
}
