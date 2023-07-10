import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title: string = 'client';
  users: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('http://localhost:7013/api/appusers').subscribe({
      next: (data) => (this.users = data),
      error: (error) => console.log(error),
      complete: () => console.log('Request completed'),
    });

    console.log(this.users);
  }
}
