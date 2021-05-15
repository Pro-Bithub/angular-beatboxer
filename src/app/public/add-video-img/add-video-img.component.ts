import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Observable, Subject, of } from "rxjs";

import { catchError } from "rxjs/operators";
import { Notify } from "src/app/core/model/notify";
import { AdminService } from "src/app/core/Services";

@Component({
  selector: "add-video-img",
  templateUrl: "./add-video-img.component.html",
  styleUrls: ["./add-video-img.component.css"],
})
export class AddVideoImgComponent implements OnInit {
  buttonDisabled: boolean = false;
  count: number = 0;
  addform: FormGroup;
  submitted = false;
  loadingError$ = new Subject<boolean>();
  selectedFile: File;

  notify: Notify = null;
  private checkObs$: Observable<string>;

  constructor(
    private adminService: AdminService,
    private router: Router,
    private formBuilder: FormBuilder,
    private titleService: Title
  ) {
    this.titleService.setTitle("BeatBoxer - Add video or imge");
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  ngOnInit() {
    this.addform = this.formBuilder.group({
      url: [, Validators.required],
      title: [, Validators.required],
      desc: [, Validators.required],
      type: [, Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addform.invalid) {
      return;
    }

    /* 
		 const uploadData = new FormData();
  uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
  this.http.post('my-backend.com/file-upload', uploadData)
	.subscribe(...); */

    this.checkObs$ = this.adminService.addvideo(this.addform.value);
    /*     this.notifierService.notify("success", "You are awesome! I mean it!"); */
    this.checkObs$.subscribe(
      (rep) => {
        this.notify = { type: "success", message: rep };
        this.addform.reset();

        this.router.navigate(["/my-profile"]);
      },
      (error) => {
        console.log(error);
        this.notify = { type: "danger", message: error.error };
      }
    );
  }
  get f() {
    return this.addform.controls;
  }

  /* 	test() {
		this.loginService.test('2020-02').subscribe((data) => {
			console.log(data);
		});
	} */
}
