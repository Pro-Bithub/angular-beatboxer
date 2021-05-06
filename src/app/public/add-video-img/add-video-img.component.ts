import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable, Subject, of } from 'rxjs';

import { catchError } from 'rxjs/operators';

@Component({
	selector: 'add-video-img',
	templateUrl: './add-video-img.component.html',
	styleUrls: [ './add-video-img.component.css' ]
})
export class AddVideoImgComponent implements OnInit {
	buttonDisabled: boolean = false;
	count: number = 0;
	addform: FormGroup;
	submitted = false;
	loadingError$ = new Subject<boolean>();
	selectedFile: File;
	constructor(private router: Router, private formBuilder: FormBuilder, private titleService: Title) {
		this.titleService.setTitle('BeatBoxer - Add video or imge');
	}

	onFileChanged(event) {
		this.selectedFile = event.target.files[0];
	}

	ngOnInit() {
		this.addform = this.formBuilder.group({
			title: [ , Validators.required ],
			desc: [ , Validators.required ]
		});
	}

	onSubmit() {
		this.submitted = true;

		// stop here if form is invalid
		if (this.addform.invalid) {
			return;
		}

		/* 
		 const uploadData = new FormData();
  uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
  this.http.post('my-backend.com/file-upload', uploadData)
	.subscribe(...); */

		this.router.navigate([ '/my-profile' ]);
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
