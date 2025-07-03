import { FormBuilder } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AuthService } from './../auth.service';
import { of, throwError } from 'rxjs';

describe('LoginComponent (Unit)', () => {
  let component: LoginComponent;
  let loginServiceMock: jest.Mocked<AuthService>;
  let routerMock: { navigate: jest.Mock };

  beforeEach(() => {
    loginServiceMock = {
      login: jest.fn()
    } as unknown as jest.Mocked<AuthService>;
    routerMock = { navigate: jest.fn() };
    component = new LoginComponent(new FormBuilder(), loginServiceMock, routerMock as any);
  });

  it('should create the form with controls', () => {
    expect(component.loginForm.contains('email')).toBeTruthy();
    expect(component.loginForm.contains('password')).toBeTruthy();
  });

  it('should mark email as required', () => {
    const emailControl = component.loginForm.get('email');
    emailControl?.setValue('');
    expect(emailControl?.valid).toBeFalsy();
  });

  it('should mark password as required', () => {
    const passwordControl = component.loginForm.get('password');
    passwordControl?.setValue('');
    expect(passwordControl?.valid).toBeFalsy();
  });

  it('should call login method of AuthService on form submission', () => {
    const email = 'test@example.com';
    const password = 'password123';

    component.loginForm.setValue({ email, password });
    (loginServiceMock.login as jest.Mock).mockReturnValue(of({ token: 'fake-token' }));
    component.onSubmit();

    expect(loginServiceMock.login).toHaveBeenCalled();
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('should handle login error', () => {
    const email = 'invaliduser@abc.com';
    const password = 'wrongpassword';
    component.loginForm.setValue({ email, password });
    (loginServiceMock.login as jest.Mock).mockReturnValue(throwError(() => new Error('Login failed')));
    component.onSubmit();
    expect(loginServiceMock.login).toHaveBeenCalled();
    expect(component.loginForm.valid).toBeTruthy();
    expect(component.errorMessage).toBe('An error occurred during login');
  });
});