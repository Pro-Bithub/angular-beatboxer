import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import * as all from ".";

const routes: Routes = [
  {
    path: "",
    component: all.JoursFeriesComponent,
    children: [{ path: "joursFeries", component: all.JoursFeriesComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProtectedRoutingModule {}
