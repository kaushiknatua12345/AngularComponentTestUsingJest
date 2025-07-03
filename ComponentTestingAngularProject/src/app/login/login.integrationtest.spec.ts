import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from './../auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('LoginComponent Integration', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpMock: HttpTestingController;
  let routerMock: { navigate: jest.Mock };

  beforeEach(() => {
    routerMock = { navigate: jest.fn() };

    TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should login successfully and navigate to dashboard', fakeAsync(() => {
    const email = 'test@example.com';
    const password = 'password123';
    component.loginForm.controls['email'].setValue(email);
    component.loginForm.controls['password'].setValue(password);
    fixture.detectChanges();

    // Trigger form submit
    const form = fixture.debugElement.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    tick();

    // Expect HTTP request
    const req = httpMock.expectOne((r) =>
      r.url.includes('/employees') || r.url.includes('emplyeedb.json')
    );
    // Simulate backend returns a matching user
    req.flush([{ email, password }]);
    tick();
    fixture.detectChanges();

    expect(component.loginSuccess).toBe(true);
    expect(component.errorMessage).toBe('');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/dashboard']);
  }));

  it('should show error message on invalid credentials', fakeAsync(() => {
    const email = 'wrong@example.com';
    const password = 'wrongpassword';
    component.loginForm.controls['email'].setValue(email);
    component.loginForm.controls['password'].setValue(password);
    fixture.detectChanges();

    // Trigger form submit
    const form = fixture.debugElement.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    tick();

    // Expect HTTP request
    const req = httpMock.expectOne((r) =>
      r.url.includes('/employees') || r.url.includes('emplyeedb.json')
    );
    // Simulate backend returns no user
    req.flush([]);
    tick();
    fixture.detectChanges();

    expect(component.loginSuccess).toBe(false);
    expect(component.errorMessage).toBe('Invalid email or password');
    expect(routerMock.navigate).not.toHaveBeenCalled();
  }));

  it('should show error message on HTTP error', fakeAsync(() => {
    const email = 'test@example.com';
    const password = 'password123';
    component.loginForm.controls['email'].setValue(email);
    component.loginForm.controls['password'].setValue(password);
    fixture.detectChanges();

    // Trigger form submit
    const form = fixture.debugElement.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    tick();

    // Expect HTTP request
    const req = httpMock.expectOne((r) =>
      r.url.includes('/employees') || r.url.includes('emplyeedb.json')
    );
    // Simulate HTTP error
    req.error(new ErrorEvent('Network error'));
    tick();
    fixture.detectChanges();

    expect(component.loginSuccess).toBe(false);
    expect(component.errorMessage).toBe('An error occurred during login');
    expect(routerMock.navigate).not.toHaveBeenCalled();
  }));
});