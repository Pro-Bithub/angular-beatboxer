import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../core/Services/login.service';

import { Admin } from '../../core/model/admin';
import { Observable, Subject, of } from 'rxjs';
import { Notify } from 'src/app/core/model/notify';
import { AdminService } from 'src/app/core/Services';

@Component({
	selector: 'register',
	templateUrl: './register.component.html',
	styleUrls: [ './register.component.css' ]
})
export class RegisterComponent implements OnInit {
	buttonDisabled: boolean = false;
	count: number = 0;

	loginForm: FormGroup;

	notify: Notify = null;
	private checkeventObs$: Observable<string>;
	submitted = false;
	loadingError$ = new Subject<boolean>();
	constructor(
		private router: Router,
		private formBuilder: FormBuilder,
		private adminService: AdminService,
		private titleService: Title
	) {
		this.titleService.setTitle('BeatBoxer - Register');
	}

	ngOnInit() {
		this.loginForm = this.formBuilder.group({
			name: [ , Validators.required ],
			email: [ , Validators.required ],

			phone: [ , Validators.required ],
			username: [ , Validators.required ],
			password: [ , Validators.required ],
			repassword: [ , Validators.required ]
		});
	}

	GoPageAdminRout(info) {
		this.router.navigate([ '/profile-Employser' ]);
		return true;
	}

	onSubmit() {
		this.submitted = true;

		// stop here if form is invalid
		if (this.loginForm.invalid) {
			return;
		}

		this.checkeventObs$ = this.adminService.register(this.loginForm.value);
		/*     this.notifierService.notify("success", "You are awesome! I mean it!"); */
		this.checkeventObs$.subscribe(
			(rep) => {
				this.notify = { type: 'success', message: rep };
				this.loginForm.reset();
				console.log('rep');
				console.log(rep);
				this.router.navigate([ '/my-profile' ]);
			},
			(error) => {
				console.log(error);
				this.notify = { type: 'danger', message: error.error };
				this.adminService.showNotification('error', 'Whoops, something went wrong. Probably.');
			}
		);
	}
	get f() {
		return this.loginForm.controls;
	}

	/* 	test() {
		this.loginService.test('2020-02').subscribe((data) => {
			console.log(data);
		});
	} */
}
