import { Component, Input } from "@angular/core";
import { Notify } from "src/app/core/model/notify";

@Component({
  selector: "notifyalsert",
  templateUrl: "./notify.component.html",
  styleUrls: ["./notify.component.css"],
})
export class NotifyComponent {
  @Input()
  notify: Notify;
}
