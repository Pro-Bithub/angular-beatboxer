import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { componen1 } from ".";
import { SharedModule } from "../shared/shared.module";
import { PublicRoutingModule } from "./Public-routing.module";
import { SafePipe } from "../core/_helpers/safe.pipe";

@NgModule({
  declarations: [...componen1, SafePipe],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule,
 
  ],
})
export class PublicModule {}
