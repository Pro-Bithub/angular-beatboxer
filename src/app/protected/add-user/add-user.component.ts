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
  selector: "add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.css"],
})
export class AddUserComponent implements OnInit {
  buttonDisabled: boolean = false;
  count: number = 0;
  addform: FormGroup;
  submitted = false;
  loadingError$ = new Subject<boolean>();
  selectedFile: File;
  User: User = null;
  notify: Notify = null;
  private checkObs$: Observable<string>;

  private userObs$: Observable<User>;
  fileUploadForm: FormGroup;
  fileInputLabel: string;
  id: string;
  constructor(
    private route: ActivatedRoute,
    private tokenStorageService: TokenStorageService,
    private adminService: AdminService,
    private router: Router,
    private formBuilder: FormBuilder,
    private titleService: Title
  ) {
    this.titleService.setTitle("BeatBoxer - dashbord");
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
    formData.append("file", this.fileUploadForm.get("uploadedImage").value);
    /* 	formData.append('agentId', '007'); */

    this.adminService.editerprofileimg(formData, this.User.id).subscribe(
      (res) => {
        // Reset the file input
        /*   this.uploadFileInput.nativeElement.value = ""; */
        this.fileInputLabel = undefined;

        this.notify = {
          type: "success",
          message: "changed photo profile successfully",
        };
        /* this.addform.reset(); */
        //JSON.stringify(rep[0])
        this.router.navigate(["/users"]);
        /*  sessionStorage.setItem("auth-user", JSON.stringify(res)); */
      },
      (error) => {
        console.log(error);
        this.notify = { type: "danger", message: error.error };
      }
    );
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  ngOnInit() {
    this.fileUploadForm = this.formBuilder.group({
      uploadedImage: [""],
    });
    this.route.params.subscribe((params) => {
      this.id = params["id"];
    });
    this.addform = this.formBuilder.group({
      email: [, Validators.required],
      name: [, Validators.required],
      username: [, Validators.required],
      password: [, Validators.required],
      phone: [, Validators.required],
      address: [, Validators.required],
      twitter: [, Validators.required],
      instagram: [, Validators.required],
      facebook: [, Validators.required],
      description: [, Validators.required],
      repassword: [, Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
    console.log("this.addform.invalid");
    console.log(this.addform.invalid);
    // stop here if form is invalid
    if (this.addform.invalid) {
      return;
    }

    /* 
		 const uploadData = new FormData();
  uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
  this.http.post('my-backend.com/file-upload', uploadData)
	.subscribe(...); */

    this.checkObs$ = this.adminService.register(this.addform.value);
    /*     this.notifierService.notify("success", "You are awesome! I mean it!"); */
    this.checkObs$.subscribe(
      (rep) => {
        this.notify = { type: "success", message: rep };
        this.addform.reset();

        /*    sessionStorage.setItem("auth-user", rep); */
        this.router.navigate(["/admin/users"]);
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
