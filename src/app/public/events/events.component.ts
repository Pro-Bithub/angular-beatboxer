import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Observable } from "rxjs";
import { AdminService } from "src/app/core/Services";
import { Events } from "src/app/core/model/events";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Notify } from "src/app/core/model/notify";

@Component({
  selector: "events",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.css"],
})
export class EventsComponent implements OnInit {
  events$: Observable<Events[]>;
  notify: Notify = null;
  /*    { type: "1st prop", message: "2nd prop" }; */
  private checksendeventObs$: Observable<string>;

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
    this.checksendeventObs$ = this.adminService.send_event_req(
      this.eventForm.value
    );
    /*     this.notifierService.notify("success", "You are awesome! I mean it!"); */
    this.checksendeventObs$.subscribe(
      (rep) => {
        this.notify = { type: "success", message: rep };
        this.eventForm.reset();
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
  get f() {
    return this.eventForm.controls;
  }
  ngOnInit() {
    this.eventForm = this.formBuilder.group({
      name: [, Validators.required],
      email: [, Validators.required],
      eventname: [, Validators.required],
      city: [, Validators.required],
      country: [, Validators.required],
      date: [, Validators.required],
    });
    this.Getevents();
  }
}
