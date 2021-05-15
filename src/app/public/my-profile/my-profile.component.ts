import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Observable } from "rxjs";
import { videos } from "src/app/core/model/videos";
import { AdminService } from "src/app/core/Services";
import { Community } from "src/app/core/model/community";
import { ActivatedRoute } from "@angular/router";
import { User } from "src/app/core/model/user";
import { TokenStorageService } from "src/app/core/Services/token-storage.service";
import { Notify } from "src/app/core/model/notify";

@Component({
  selector: "my-profile",
  templateUrl: "./my-profile.component.html",
  styleUrls: ["./my-profile.component.css"],
})
export class MyProfileComponent implements OnInit {
  videos$: Observable<videos[]>;
  User$: Observable<User>;
  User: User = null;
  id: string;

  notify: Notify = null;
  private checkObs$: Observable<string>;

  constructor(
    private tokenStorageService: TokenStorageService,
    private route: ActivatedRoute,
    private adminService: AdminService,
    private titleService: Title
  ) {
    this.titleService.setTitle("BeatBoxer -  Profile community");
  }

  GetVideosBYiduser(id) {
    this.videos$ = this.adminService.GetVideosBYiduser(id);
  }
  deletevideo(id) {
    this.checkObs$ = this.adminService.deletevideo(id);
    /*     this.notifierService.notify("success", "You are awesome! I mean it!"); */
    this.checkObs$.subscribe(
      (rep) => {
        this.notify = { type: "success", message: rep };
        this.GetVideosBYiduser(this.id);
      },
      (error) => {
        console.log(error);
        this.notify = { type: "danger", message: error.error };
      }
    );

    this.videos$ = this.adminService.GetVideosBYiduser(id);
  }

  GetUserBYid(id) {
    console.log("GetUserBYid");
    //this.User$ = this.adminService.GetUserBYid(id);
    /* 	this.User$.subscribe((rps) => {
			console.log('rps');
			console.log(rps);
		}); */

    this.User = this.tokenStorageService.getUser();
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.id = params["id"];
    });

    this.GetVideosBYiduser(this.id);
    this.GetUserBYid(this.id);
  }
}
