import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Observable } from "rxjs";
import { AdminService } from "src/app/core/Services";
import { Events } from "src/app/core/model/events";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "events",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.css"],
})
export class EventsComponent implements OnInit {
  events$: Observable<Events[]>;

  constructor(
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    private titleService: Title
  ) {
    this.titleService.setTitle("BeatBoxer - events");
  }
  eventForm: FormGroup;
  submitted = false;
  Getevents() {
    this.events$ = this.adminService.Getevents();
    console.log("Getevents called");
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.eventForm.invalid) {
      return;
    }
  }
  get f() {
    return this.eventForm.controls;
  }
  ngOnInit() {
    this.eventForm = this.formBuilder.group({
      name: [, Validators.required],
      email: [, Validators.required],
      event: [, Validators.required],
      city: [, Validators.required],
      country: [, Validators.required],
      date: [, Validators.required],
    });
    this.Getevents();
  }
}
