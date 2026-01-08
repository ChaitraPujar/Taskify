import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TokenService } from './token.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = `${environment.apiBaseUrl}/auth`;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  register(email: string, password: string) {
    return this.http.post(`${this.baseUrl}/register`, { email, passwordHash: password });
  }

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, { email, passwordHash: password })
      .pipe(
        tap(res => this.tokenService.setToken(res.token)) // store token automatically
      );
  }

  logout() {
    this.tokenService.clearToken();
  }

  isLoggedIn(): boolean {
    return this.tokenService.isLoggedIn();
  }
}

