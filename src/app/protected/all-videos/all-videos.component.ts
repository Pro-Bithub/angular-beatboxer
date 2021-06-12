import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
import { AdminService } from "src/app/core/Services";
import { FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Observable } from "rxjs";
import { User } from "src/app/core/model/user";
import { Notify } from "src/app/core/model/notify";
import { Events } from "src/app/core/model/events";
import { videos } from "src/app/core/model/videos";
@Component({
  selector: "app-all-videos",
  templateUrl: "./all-videos.component.html",
  styleUrls: ["./all-videos.component.css"],
})
export class allvideosComponent implements OnInit {
  videos$: Observable<videos[]>;
  private checkObs$: Observable<string>;

  notify: Notify = null;
  constructor(
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    private titleService: Title
  ) {
    this.titleService.setTitle("BeatBoxer - dashbord - admin - all videos");
  }

  ngOnInit() {
    this.findAllAllvideos();
  }
  findAllAllvideos() {
    this.videos$ = this.adminService.GetVideos();
  }

  Deleteeventbyid(id) {
    this.checkObs$ = this.adminService.Deleteventbyid(id);
    /*     this.notifierService.notify("success", "You are awesome! I mean it!"); */
    this.checkObs$.subscribe(
      (rep) => {
        this.notify = { type: "success", message: rep };
        this.findAllAllvideos();
      },
      (error) => {
        console.log(error);
        this.notify = { type: "danger", message: error.error };
      }
    );

    this.videos$ = this.adminService.GetVideos();
  }
}
