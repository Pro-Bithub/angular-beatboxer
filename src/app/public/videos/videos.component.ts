import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Observable } from "rxjs";
import { videos } from "src/app/core/model/videos";
import { AdminService } from "src/app/core/Services";

@Component({
  selector: "videos",
  templateUrl: "./videos.component.html",
  styleUrls: ["./videos.component.css"],
})
export class VideosComponent implements OnInit {
  videos$: Observable<videos[]>;

  constructor(
    private adminService: AdminService,

    private titleService: Title
  ) {
    this.titleService.setTitle("BeatBoxer -Videos");
  }

  GetVideos() {
    this.videos$ = this.adminService.GetVideos();
  }

  ngOnInit() {
    this.GetVideos();
  }
}
