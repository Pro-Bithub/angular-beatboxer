import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
import { AdminService } from "src/app/core/Services";
import { FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Observable } from "rxjs";
import { User } from "src/app/core/model/user";
import { Notify } from "src/app/core/model/notify";
@Component({
  selector: "app-all-users",
  templateUrl: "./all-users.component.html",
  styleUrls: ["./all-users.component.css"],
})
export class AllUsersComponent implements OnInit {
  Users$: Observable<User[]>;
  private checkObs$: Observable<string>;

  notify: Notify = null;
  constructor(
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    private titleService: Title
  ) {
    this.titleService.setTitle("BeatBoxer - dashbord - admin - all user");
  }

  ngOnInit() {
    this.findAllAllUsers();
  }
  findAllAllUsers() {
    this.Users$ = this.adminService.findAllAllUsers();
  }

  Deleteuserbyid(id) {
    this.checkObs$ = this.adminService.Deleteuserbyid(id);
    /*     this.notifierService.notify("success", "You are awesome! I mean it!"); */
    this.checkObs$.subscribe(
      (rep) => {
        this.notify = { type: "success", message: rep };
        this.findAllAllUsers();
      },
      (error) => {
        console.log(error);
        this.notify = { type: "danger", message: error.error };
      }
    );

    this.Users$ = this.adminService.findAllAllUsers();
  }
}
