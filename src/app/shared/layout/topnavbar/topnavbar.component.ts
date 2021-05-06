import { Component, OnInit } from "@angular/core";

import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

declare var $: any;
@Component({
  selector: "app-topnavbar",
  templateUrl: "./topnavbar.component.html",
  styleUrls: ["./topnavbar.component.css"],
})
export class TopnavbarComponent {
  private checkuserObs$: Observable<string>;
  formnom: FormGroup;
  submitted = false;
  chercheUsers$: Observable<any>;
  constructor(
    private formBuilder: FormBuilder,

    private router: Router
  ) {}
}
