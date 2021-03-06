import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GearReviewsComponent } from './gear-reviews/gear-reviews.component';
import { VideosComponent } from './videos/videos.component';
import { VideoslearnComponent } from './videos-learn/videoslearn.component';
import { EventsComponent } from './events/events.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { CommunityComponent } from './community/community.component';
import { ProfileCommunityComponent } from './profile-community/profile-community.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AddVideoImgComponent } from './add-video-img/add-video-img.component';
import { AuthGuard } from '../core/_helpers/auth.guard';
import { EditerProfileComponent } from './editer-profile/editer-profile.component';
import { NotAuth } from '../core/_helpers/not-auth.guard';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		children: [
			{ path: 'gear_reviews', component: GearReviewsComponent },
			{ path: 'videos', component: VideosComponent },
			{ path: 'lessons', component: VideoslearnComponent },
			{ path: 'events', component: EventsComponent },
			{ path: 'community', component: CommunityComponent },
			{ path: 'community/profile/:id', component: ProfileCommunityComponent },
			{
				path: 'my-profile',
				component: MyProfileComponent,
				canActivate: [ AuthGuard ]
			},
			{
				path: 'add-video-img',
				component: AddVideoImgComponent,
				canActivate: [ AuthGuard ]
			},
			{
				path: 'editer-profile',
				component: EditerProfileComponent,
				canActivate: [ AuthGuard ]
			},
			{
				path: 'register',
				component: RegisterComponent,
				canActivate: [ NotAuth ]
			},
			{
				path: 'login',
				component: LoginComponent,
				canActivate: [ NotAuth ]
			}
		]
	}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class PublicRoutingModule {}
