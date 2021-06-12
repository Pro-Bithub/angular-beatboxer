import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashbordAdminComponent } from "./dashbord-admin/dashbord-admin.component";
import { AllUsersComponent } from "./all-users/all-users.component";
import { EditerUserComponent } from "./editer-user/editer-user.component";
import { AddUserComponent } from "./add-user/add-user.component";
import { alleventsComponent } from "./all-events/all-events.component";
import { AddEventComponent } from "./add-event/add-event.component";
import { EditerEventComponent } from "./editer-event/editer-event.component";
import { alleventsReqComponent } from "./all-events-req/all-events-req.component";
import { allvideosComponent } from "./all-videos/all-videos.component";
import { AddVideoComponent } from "./add-video/add-video.component";
import { allvideosLearnComponent } from "./all-videos-learn/all-videos-learn.component";

const routes: Routes = [
  {
    path: "admin",
    component: DashbordAdminComponent,
    children: [
      { path: "users", component: AllUsersComponent },
      { path: "user/:id", component: EditerUserComponent },
      { path: "users/add", component: AddUserComponent },
      { path: "events", component: alleventsComponent },
      { path: "events/add", component: AddEventComponent },
      { path: "event/:id", component: EditerEventComponent },
      { path: "events-request", component: alleventsReqComponent },
      { path: "videos", component: allvideosComponent },
      { path: "videos/add", component: AddVideoComponent },
      { path: "videos-Learn", component: allvideosLearnComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProtectedRoutingModule {}
