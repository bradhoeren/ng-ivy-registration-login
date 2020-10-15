import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay } from 'rxjs/operators';
import { Customer } from '../_models/customer';

@Component({
  selector: 'app-cinfo',
  templateUrl: './cinfo.component.html',
  styleUrls: ['./cinfo.component.css']
})
export class CinfoComponent implements OnInit {
  infoForm: FormGroup;
  loading = false;
  error: string;
  customer: Customer;

  constructor(
      private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.infoForm = this.formBuilder.group({
      instanceName: ['', Validators.required],
      databaseName: ['', Validators.required]
  });
  }

  onSubmit() {
    this.loading = true;
    delay(2000);
    this.loading = false;
    console.log("Submitted to server!")
    return;
  }
}