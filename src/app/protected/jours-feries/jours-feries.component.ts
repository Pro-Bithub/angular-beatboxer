import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
@Component({
  selector: "app-jours-feries",
  templateUrl: "./jours-feries.component.html",
  styleUrls: ["./jours-feries.component.css"],
})
export class JoursFeriesComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    this.findAlljoursFeries();
  }
  findAlljoursFeries() {}
}
