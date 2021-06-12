import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Observable, Subject } from "rxjs";

import { Notify } from "src/app/core/model/notify";
import { AdminService } from "src/app/core/Services";
import { TokenStorageService } from "src/app/core/Services/token-storage.service";
import { Events } from "src/app/core/model/events";

@Component({
  selector: "editer-event",
  templateUrl: "./editer-event.component.html",
  styleUrls: ["./editer-event.component.css"],
})
export class EditerEventComponent implements OnInit {
  buttonDisabled: boolean = false;
  count: number = 0;
  addform: FormGroup;
  submitted = false;
  loadingError$ = new Subject<boolean>();
  selectedFile: File;
  Event: Events = null;
  notify: Notify = null;
  private checkObs$: Observable<string>;

  private EventObs$: Observable<Events>;
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

    this.adminService.editerprofileimg(formData, this.Event.id).subscribe(
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
        this.router.navigate(["/Events"]);
        /*  sessionStorage.setItem("auth-Event", JSON.stringify(res)); */
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
  get_Event_from_db_storage() {
    this.EventObs$ = this.adminService.GetEventBYid(this.id);
    this.EventObs$.subscribe(
      (rep) => {
        console.log("get_Event_from_db_storage");
        console.log(rep);
        /*  this.notify = { type: "success", message: rep }; */
        this.Event = rep;
        this.set_in_to_form_builder();
      },
      (error) => {
        console.log(error);
        this.notify = { type: "danger", message: error.error };
        this.adminService.showNotification(
          "error",
          "Whoops, something went wrong. Probably."
        );
      }
    );
  }
  set_in_to_form_builder() {
    if (this.Event != null) {
      if (this.Event.id != null) {
        this.addform.get("id").setValue(this.Event.id);
      }
      if (this.Event.title != null) {
        this.addform.get("title").setValue(this.Event.title);
      }
      if (this.Event.desc != null) {
        this.addform.get("desc").setValue(this.Event.desc);
      }
    }
  }
  ngOnInit() {
    this.fileUploadForm = this.formBuilder.group({
      uploadedImage: [""],
    });
    this.route.params.subscribe((params) => {
      this.id = params["id"];
    });
    this.addform = this.formBuilder.group({
      id: [, Validators.required],
      title: [, Validators.required],
      desc: [, Validators.required],
    });
    this.get_Event_from_db_storage();
    this.set_in_to_form_builder();
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

    this.checkObs$ = this.adminService.editerprofile(this.addform.value);
    /*     this.notifierService.notify("success", "You are awesome! I mean it!"); */
    this.checkObs$.subscribe(
      (rep) => {
        this.notify = { type: "success", message: rep };
        this.addform.reset();

        /*    sessionStorage.setItem("auth-Event", rep); */
        this.router.navigate(["/admin/events"]);
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
