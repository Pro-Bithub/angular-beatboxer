import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../core/Services/login.service';

import { Admin } from '../../core/model/admin';
import { Observable, Subject, of } from 'rxjs';

import { catchError } from 'rxjs/operators';

@Component({
	selector: 'register',
	templateUrl: './register.component.html',
	styleUrls: [ './register.component.css' ]
})
export class RegisterComponent implements OnInit {
	buttonDisabled: boolean = false;
	count: number = 0;
	private errorMessage: string;
	loginForm: FormGroup;
	private checkAdminObs$: Observable<string>;
	private checkAdminwithoutfingerObs$: Observable<string>;
	submitted = false;
	loadingError$ = new Subject<boolean>();
	private hashcode: string;
	constructor(
		private router: Router,
		private formBuilder: FormBuilder,
		private loginService: LoginService,
		private titleService: Title
	) {
		this.titleService.setTitle('BeatBoxer - Register');
	}

	ngOnInit() {
		this.loginForm = this.formBuilder.group({
			name: [ , Validators.required ],
			mail: [ , Validators.required ],

			phone: [ , Validators.required ],
			username: [ , Validators.required ],
			password: [ , Validators.required ]
		});
	}

	GoPageAdminRout(info) {
		this.router.navigate([ '/profile-Employser' ]);
		return true;
	}

	checkusebynumber(numberwithhashcode) {
		var array = numberwithhashcode.split(':');

		if (array[0] == '0') {
			return false;
		} else {
			/*   console.log(array[1]); */
			this.hashcode = array[1];
			return true;
		}
	}

	login() {
		this.errorMessage = '';
		if (this.loginForm.invalid) {
			this.errorMessage = 'Login et / ou mot de passe est incorrecte';
			return;
		}
		this.router.navigate([ '/profile-Employser' ]);

		/* let admin: Admin;
		admin = new Admin();
		admin.fingerprintAdmin = this.loginForm.controls.login.value;
		this.loginService.login(admin).pipe().subscribe(
			(data) => {
				if (this.checkadminbynumber(data) == null) {
					this.router.navigate(['/']);
				} else {
					this.router.navigate(['/home']);
				}

				
			},
			(error) => {
				this.errorMessage = 'Login et / ou mot de passe est incorrecte';
			}
		); */
	}

	onSubmit() {
		this.submitted = true;

		// stop here if form is invalid
		if (this.loginForm.invalid) {
			return;
		}
	}
	get f() {
		return this.loginForm.controls;
	}

	checkadminbynumber(numberwithhashcode) {
		var array = numberwithhashcode.split(':');

		if (array[0] == '0') {
			return null;
		} else {
			/*   console.log(array[1]); */
			return array[1];
		}
	}
	/* 	test() {
		this.loginService.test('2020-02').subscribe((data) => {
			console.log(data);
		});
	} */
}
