import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthInterceptor} from '../../interceptors/auth.interceptor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  message = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.http.get('http://localhost:8000/api/user')
      .subscribe({
        next: (res: any) => {
          this.message = `Hi ${res.name}`;
        },
        error: () => {
          this.router.navigate(['/login']);
        }
      });
  }

  logout() {
    this.http.post('http://localhost:8000/api/logout', {}, {withCredentials: true})
      .subscribe(() => {
        AuthInterceptor.accessToken = '';

        this.router.navigate(['/login']);
      });
  }
}
