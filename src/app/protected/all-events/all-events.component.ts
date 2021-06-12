import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
import { AdminService } from "src/app/core/Services";
import { FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Observable } from "rxjs";
import { User } from "src/app/core/model/user";
import { Notify } from "src/app/core/model/notify";
import { Events } from "src/app/core/model/events";
@Component({
  selector: "app-all-events",
  templateUrl: "./all-events.component.html",
  styleUrls: ["./all-events.component.css"],
})
export class alleventsComponent implements OnInit {
  Events$: Observable<Events[]>;
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
    this.findAllAllEvents();
  }
  findAllAllEvents() {
    this.Events$ = this.adminService.Getevents();
  }

  Deleteeventbyid(id) {
    this.checkObs$ = this.adminService.Deleteventbyid(id);
    /*     this.notifierService.notify("success", "You are awesome! I mean it!"); */
    this.checkObs$.subscribe(
      (rep) => {
        this.notify = { type: "success", message: rep };
        this.findAllAllEvents();
      },
      (error) => {
        console.log(error);
        this.notify = { type: "danger", message: error.error };
      }
    );

    this.Events$ = this.adminService.Getevents();
  }
}
