import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Observable, Subject } from "rxjs";

import { Notify } from "src/app/core/model/notify";
import { AdminService } from "src/app/core/Services";
import { TokenStorageService } from "src/app/core/Services/token-storage.service";
import { User } from "src/app/core/model/user";

@Component({
  selector: "add-video",
  templateUrl: "./add-video.component.html",
  styleUrls: ["./add-video.component.css"],
})
export class AddVideoComponent implements OnInit {
  buttonDisabled: boolean = false;
  count: number = 0;
  addform: FormGroup;
  submitted = false;
  loadingError$ = new Subject<boolean>();
  selectedFile: File;

  notify: Notify = null;
  private checkObs$: Observable<string>;

  fileUploadForm: FormGroup;
  fileInputLabel: string;

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

    this.fileUploadForm = this.formBuilder.group({
      uploadedImage: [""],
    });
  }

  onFileSelect(event) {
    const file = event.target.files[0];
    this.fileInputLabel = file.name;
    this.fileUploadForm.get("uploadedImage").setValue(file);
  }

  onFormSubmit() {
    if (!this.fileUploadForm.get("uploadedImage").value) {
      alert("Please fill valid details!");
      return false;
    }

    const formData = new FormData();
    formData.append(
      "uploadedImage",
      this.fileUploadForm.get("uploadedImage").value
    );
    formData.append("agentId", "007");
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
