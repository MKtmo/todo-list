import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service"

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userList: any = []
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(user => this.userList.push(user));
  }

}
