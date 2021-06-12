import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
import { AdminService } from "src/app/core/Services";
import { FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
@Component({
  selector: "app-dashbord-admin",
  templateUrl: "./dashbord-admin.component.html",
  styleUrls: ["./dashbord-admin.component.css"],
})
export class DashbordAdminComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    private titleService: Title
  ) {
    this.titleService.setTitle("BeatBoxer - dashbord ");
  }

  ngOnInit() {
    this.findAllAllUsers();
  }
  findAllAllUsers() {}
  logout() {
    this.adminService.logout();
  }
}
