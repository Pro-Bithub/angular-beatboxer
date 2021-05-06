import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import * as all from ".";
import { ProtectedRoutingModule } from "./protected-routing.module";

@NgModule({
  declarations: [...all.components],
  imports: [CommonModule, ProtectedRoutingModule, SharedModule],
})
export class ProtectedModule {}
