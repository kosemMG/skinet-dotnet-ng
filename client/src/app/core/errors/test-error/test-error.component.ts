import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent implements OnInit {
  public validationErrors: string[] = [];

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  get404Error(): void {
    this.http.get(this.baseUrl + 'products/42').subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    });
  }

  get500Error(): void {
    this.http.get(this.baseUrl + 'buggy/servererror').subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    });
  }

  get400Error(): void {
    this.http.get(this.baseUrl + 'buggy/badrequest').subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    });
  }

  get400ValidationError(): void {
    this.http.get(this.baseUrl + 'products/fortytwo').subscribe({
      next: response => console.log(response),
      error: error => {
        console.log(error);
        this.validationErrors = error.errors;
      }
    });
  }

}
