import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable, Subject } from 'rxjs';

import { Notify } from 'src/app/core/model/notify';
import { AdminService } from 'src/app/core/Services';
import { TokenStorageService } from 'src/app/core/Services/token-storage.service';
import { User } from 'src/app/core/model/user';

@Component({
	selector: 'editer-profile',
	templateUrl: './editer-profile.component.html',
	styleUrls: [ './editer-profile.component.css' ]
})
export class EditerProfileComponent implements OnInit {
	buttonDisabled: boolean = false;
	count: number = 0;
	addform: FormGroup;
	submitted = false;
	loadingError$ = new Subject<boolean>();
	selectedFile: File;
	User: User = null;
	notify: Notify = null;
	private checkObs$: Observable<string>;

	constructor(
		private tokenStorageService: TokenStorageService,
		private adminService: AdminService,
		private router: Router,
		private formBuilder: FormBuilder,
		private titleService: Title
	) {
		this.titleService.setTitle('BeatBoxer - Add video or imge');
	}

	onFileChanged(event) {
		this.selectedFile = event.target.files[0];
	}
	get_user_from_session_storage() {
		this.User = this.tokenStorageService.getUser();
	}
	set_in_to_form_builder() {
		if (this.User != null) {
			if (this.User.id != null) {
				this.addform.get('id').setValue(this.User.id);
			}
			if (this.User.email != null) {
				this.addform.get('email').setValue(this.User.email);
			}
			if (this.User.name != null) {
				this.addform.get('name').setValue(this.User.name);
			}
			if (this.User.username != null) {
				this.addform.get('username').setValue(this.User.username);
			}
			if (this.User.password != null) {
				this.addform.get('password').setValue(this.User.password);
			}
			if (this.User.phone != null) {
				this.addform.get('phone').setValue(this.User.phone);
			}
			if (this.User.address != null) {
				this.addform.get('address').setValue(this.User.address);
			}
			if (this.User.description != null) {
				this.addform.get('description').setValue(this.User.description);
			}
			if (this.User.twitter != null) {
				this.addform.get('twitter').setValue(this.User.twitter);
			}
			if (this.User.instagram != null) {
				this.addform.get('instagram').setValue(this.User.instagram);
			}
			if (this.User.facebook != null) {
				this.addform.get('facebook').setValue(this.User.facebook);
			}
		}
	}
	ngOnInit() {
		this.addform = this.formBuilder.group({
			id: [ , Validators.required ],
			email: [ , Validators.required ],
			name: [ , Validators.required ],
			username: [ , Validators.required ],
			password: [ , Validators.required ],
			phone: [ , Validators.required ],
			address: [ , Validators.required ],
			twitter: [ , Validators.required ],
			instagram: [ , Validators.required ],
			facebook: [ , Validators.required ],
			description: [ , Validators.required ]
		});
		this.get_user_from_session_storage();
		this.set_in_to_form_builder();
	}

	onSubmit() {
		this.submitted = true;
		console.log('this.addform.invalid');
		console.log(this.addform.invalid);
		// stop here if form is invalid
		if (this.addform.invalid) {
			return;
		}

		/* 
		 const uploadData = new FormData();
  uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
  this.http.post('my-backend.com/file-upload', uploadData)
	.subscribe(...); */

		this.checkObs$ = this.adminService.editerprofile(this.addform.value);
		/*     this.notifierService.notify("success", "You are awesome! I mean it!"); */
		this.checkObs$.subscribe(
			(rep) => {
				this.notify = { type: 'success', message: rep };
				this.addform.reset();

				sessionStorage.setItem('auth-user', rep);
				this.router.navigate([ '/my-profile' ]);
			},
			(error) => {
				console.log(error);
				this.notify = { type: 'danger', message: error.error };
			}
		);
	}
	get f() {
		return this.addform.controls;
	}

	/* 	test() {
		this.loginService.test('2020-02').subscribe((data) => {
			console.log(data);
		});
	} */
}
