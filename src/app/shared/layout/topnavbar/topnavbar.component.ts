import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/core/Services/token-storage.service';
import { User } from 'src/app/core/model/user';
import { AdminService } from 'src/app/core/Services';

declare var $: any;
@Component({
	selector: 'app-topnavbar',
	templateUrl: './topnavbar.component.html',
	styleUrls: [ './topnavbar.component.css' ]
})
export class TopnavbarComponent implements OnInit {
	private checkuserObs$: Observable<string>;
	formnom: FormGroup;
	submitted = false;

	chercheUsers$: Observable<any>;

	user: User = null;
	constructor(private adminService: AdminService) {}
	get_user_from_session_storage() {
		this.adminService.user.subscribe((x) => {
			console.log('this.adminService.user.subscribe called');
			this.user = x;
		});
	}
	logout() {
		this.adminService.logout();
	}
	ngOnInit() {
		this.get_user_from_session_storage();
	}
}
