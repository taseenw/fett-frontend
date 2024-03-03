import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = 'http://localhost:8000/api/users'; // Adjust the URL based on your actual API endpoint

  constructor(private http: HttpClient) { }

  // Fetch all users
  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  // Create a new user
  createUser(email: string): Observable<any> {
    // Assuming the email is sent as a header based on your provided code snippet
    const headers = { email: email };
    return this.http.post(this.baseUrl, {}, { headers });
  }

   // Create a new user
   updateUser(email: string, phone: string, firstname: string, lastname: string): Observable<any> {
    // Assuming the email is sent as a header based on your provided code snippet
    const headers = { email: email };
    console.log('updating user')
    return this.http.put(this.baseUrl, {phone:phone, fname:firstname, lname:lastname}, { headers });
  }

  // Fetch a user by email
  getUserByEmail(email: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/email/${email}`);
  }
}
