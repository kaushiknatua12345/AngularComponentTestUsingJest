/* Unit tests for AuthService */
// This code tests the AuthService class, specifically the loginUser method.

import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call GET with correct query params for login', () => {
    const credentials = { email: 'test@example.com', password: 'password123' };
    const mockResponse = [{ id: 1, name: 'Test User' }];

    service.login(credentials).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `http://localhost:3000/employees?username=${credentials.email}&password=${credentials.password}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  
  
});