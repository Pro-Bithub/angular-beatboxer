import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { videos } from 'src/app/core/model/videos';
import { AdminService } from 'src/app/core/Services';
import { Community } from 'src/app/core/model/community';

@Component({
	selector: 'community',
	templateUrl: './community.component.html',
	styleUrls: [ './community.component.css' ]
})
export class CommunityComponent implements OnInit {
	Communitys$: Observable<Community[]>;

	constructor(private adminService: AdminService, private titleService: Title) {
		this.titleService.setTitle('BeatBoxer - Community');
	}

	GetCommunity() {
		this.Communitys$ = this.adminService.GetCommunity();
	}

	ngOnInit() {
		this.GetCommunity();
	}
}
