import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { videos } from 'src/app/core/model/videos';
import { AdminService } from 'src/app/core/Services';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/model/user';

@Component({
	selector: 'profile-community',
	templateUrl: './profile-community.component.html',
	styleUrls: [ './profile-community.component.css' ]
})
export class ProfileCommunityComponent implements OnInit {
	videos$: Observable<videos[]>;
	User$: Observable<User>;
	id: string;
	constructor(private route: ActivatedRoute, private adminService: AdminService, private titleService: Title) {
		this.titleService.setTitle('BeatBoxer -  Profile community');
	}

	GetVideosBYiduser(id) {
		this.videos$ = this.adminService.GetVideosBYiduser(id);
	}
	getf(Userinfo) {
		console.log('Userinfo');
		console.log(Userinfo);
	}

	GetUserBYid(id) {
		this.User$ = this.adminService.GetUserBYid(id);
		/* 	this.User$.subscribe((rps) => {
			console.log('rps');
			console.log(rps);
		}); */
	}

	ngOnInit() {
		this.route.params.subscribe((params) => {
			this.id = params['id'];
		});

		this.GetVideosBYiduser(this.id);
		this.GetUserBYid(this.id);
	}
}
