/* create component test for login.component.ts and UI interaction*/
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from './../auth.service';
import { FormBuilder } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

describe('LoginComponent (UI Interaction)', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock: jest.Mocked<AuthService>;
  let routerMock: { navigate: jest.Mock };

  beforeEach(() => {
    authServiceMock = {
      login: jest.fn()
    } as unknown as jest.Mocked<AuthService>;
    
    routerMock = { navigate: jest.fn() };

    TestBed.configureTestingModule({
      imports: [
        LoginComponent,        
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatButtonModule,
        MatInputModule
      ],
      
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display form controls', () => {
    const emailInput = fixture.debugElement.query(By.css('input[formControlName="email"]'));
    const passwordInput = fixture.debugElement.query(By.css('input[formControlName="password"]'));
    const loginButton = fixture.debugElement.query(By.css('button[type="submit"]'));
    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(loginButton).toBeTruthy();
  });

  it('should not call login if form is invalid', () => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');
    fixture.detectChanges();
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', {});
    fixture.detectChanges();
    expect(authServiceMock.login).not.toHaveBeenCalled();
    expect(component.loginSuccess).toBe(false);
  });

  it('should call AuthService.login and navigate on valid credentials', fakeAsync(() => {
    const email = 'test@example.com';
    const password = 'password123';
    component.loginForm.controls['email'].setValue(email);
    component.loginForm.controls['password'].setValue(password);
    fixture.detectChanges();

    // Set the mock return value BEFORE triggering submit
    (authServiceMock.login as jest.Mock).mockReturnValue(of([{}]));

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', {});
    tick(); // Let observables complete
    fixture.detectChanges();

    expect(authServiceMock.login).toHaveBeenCalledWith({ email, password });
    expect(component.loginSuccess).toBe(true);
    expect(component.errorMessage).toBe('');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/dashboard']);
  }));

  it('should show error message on login error', fakeAsync(() => {
  // Spy on console.error to suppress the expected error message
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  
  const email = 'wronguser@example.com';
  const password = 'wrongpassword';
  component.loginForm.controls['email'].setValue(email);
  component.loginForm.controls['password'].setValue(password);
  fixture.detectChanges();
  
  (authServiceMock.login as jest.Mock).mockReturnValue(throwError(() => new Error('Login failed')));
  
  const form = fixture.debugElement.query(By.css('form'));
  form.triggerEventHandler('ngSubmit', {});
  tick();
  fixture.detectChanges();
  
  expect(authServiceMock.login).toHaveBeenCalledWith({ email, password });
  expect(component.loginSuccess).toBe(false);
  expect(component.errorMessage).toBe('An error occurred during login');
  
  // Verify console.error was called with the expected message
  expect(consoleSpy).toHaveBeenCalledWith('Login error:', expect.any(Error));
  
  // Restore console.error
  consoleSpy.mockRestore();
}));

});