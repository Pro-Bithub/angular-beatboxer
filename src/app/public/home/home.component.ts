import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Title } from "@angular/platform-browser";

/* import { Observable } from "rxjs/Observable"; */
import { Observable, Subscription } from "rxjs";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

import { AdminService } from "src/app/core/Services/admin.service";
declare var $: any;
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  buttonDisabled: boolean = false;
  count: number = 0;

  strcheckuser: string;
  private id;

  private checkuserObs$: Observable<string>;
  private tackedfingerObs$: Observable<string>;
  private insertuserObs$: Observable<any>;
  private adduser: Subscription;
  errorMessage: any[];
  errorServer: String;
  private cleckedgetfinger: boolean;
  private ajouterUser: FormGroup;

  submitted = false;
  constructor(
    /*  private router: Router, */
    private formBuilder: FormBuilder,
    /*    private route: ActivatedRoute, */

    private adminService: AdminService,

    private router: Router,
    private titleService: Title
  ) {
    this.titleService.setTitle("Beatbox - gear-reviews");
  }

  ngOnInit() {
    /*    if (this.route.snapshot.paramMap.get("id") !== undefined) {
			 this.id = this.route.snapshot.paramMap.get("id");
			 this.empreinteService.findLigneByID(this.id)
			   .pipe()
			   .subscribe(data => {
				 this.empreinte = data;
				 this.ajouterUser.setValue(this.empreinte);
			   });
		   } */
    this.createForm();
  }

  get f() {
    return this.ajouterUser.controls;
  }

  createForm() {
    this.ajouterUser = this.formBuilder.group({
      username: [, Validators.required],
      password: [],
      laboName: [, Validators.required],
      name: [, Validators.required],
      lastName: [, Validators.required],
      cin: [, Validators.required],
      finger: [],
      tele: [],
      roles: [Validators.required],

      /* 
				fingers: this.formBuilder.array([]), */
      /*   optFg: [Validators.required] */
    });
  }

  /*   get fingersFormArray(): FormArray {
		  return this.ajouterUser.get('fingers') as FormArray;
		}
		addFinger(finger) {
		  let fg = this.formBuilder.group(finger);
		  console.log(finger);
		  this.fingersFormArray.push(fg);
		}
	   */
  GoDashbord(info) {
    this.router.navigate(["/profile-Employser"]);
    console.log(info);
    return true;
  }
  enregistrerEmployer() {
    if (this.ajouterUser.invalid) {
      return;
    }

    this.adduser = this.adminService
      .insertEmployerAndEmpriente(this.ajouterUser.value)
      .subscribe(
        (data) => {
          if (data != "2" && data != "1") {
            $("#addvalid").css("display", "block");
            $.bigBox(
              {
                title: "Success Message Example",
                content:
                  "Lorem ipsum dolor sit amet, test consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
                color: "#739E73",
                //timeout: 8000,
                icon: "fa fa-check",
              },
              function () {
                //closedthis();
              }
            );
            this.GoDashbord(data);
          }
          if (data == "2") {
            $("#errornom").css("display", "block");
          }
          if (data == "1") {
            $("#errorcin").css("display", "block");
          }
        },
        (error) => {
          const err: any = error.error as JSON;
          const obj = JSON.parse(err);
          console.log(obj.message);
          this.errorServer = obj.message;
          this.errorMessage = obj.details;
          $("#errorserver").css("display", "block");
        }
      );
    /* 	this.ajouterUser.reset(); */

    /*  console.log(this.ajouterUser.value.finger) */
  }

  checkuser() {
    this.buttonDisabled = true;
    this.checkuserObs$ = this.adminService.checkfingeradmin();
    /*  this.checkuserObs$.subscribe(data => console.log(data)); */
  }

  getfinger() {
    this.cleckedgetfinger = true;
    this.tackedfingerObs$ = this.adminService.checkfingeradmin();
  }
  checkusebynumbernotexist(numberwithhashcode) {
    var array = numberwithhashcode.split(":");
    if (numberwithhashcode == "DEvice0") {
      return "DEvice0";
    }
    if (numberwithhashcode == "serveur0") {
      return "serveur0";
    }

    if (array[0] == "1") {
      return "Existe";
    }
    if (array[0] == "0") {
      /*    this.addFinger(array[1]); */
      this.ajouterUser.value.finger = array[1];
      return "0";
    }
  }
  checkusebynumber(numberwithhashcode) {
    var array = numberwithhashcode.split(":");

    if (array[0] == "0") {
      return null;
    } else {
      /*   console.log(array[1]); */
      return array[1];
    }
  }

  ngAfterViewInit() {}
}
