import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validator, Validators } from '@angular/forms';
import { AuthService, LoginData, UserData } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})


export class LoginComponent {

  LoginForm: FormGroup = new FormGroup(
    {
      // todo   handle controller by logic & catching it    
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z][a-z@0-9]{5,10}$/)]),
    }
  )

  // todo     crating constructor         

  constructor(private authService: AuthService, private toaster: ToastrService, private router: Router , private cookieService:CookieService) {


  }



  IsLoading: boolean = false;

  // todo       post value to backend  after click on submit button  

  Loginvalues(value: LoginData) {
    this.IsLoading = true;
    this.authService.login(value).subscribe({
      next: (log: any) => {
        this.IsLoading = false;
        console.log('Login Form :', log)
        this.toaster.success("Login Sucessful", "Sucess")
        this.router.navigate(['/home'])
        // !! store token in local storage
        // localStorage.setItem('token', log.token)
        // !! cookie store
        this.cookieService.set('token',log.token)

        // todo     going to auth service to take token  
        // تشفير التوكن
        this.authService.decodedToken
      },
      error: (error: { error: { message: string | undefined; }; }) => {
        this.IsLoading = false;
        console.log(error);
        if (error?.error?.message) {
          this.toaster.error(error.error.message, "Error")
        }
      }
    })
  }


  // submit function()
  submitForm() {
    console.log(this.LoginForm.getError('noMatch '))
    if (this.LoginForm.invalid) {
      this.LoginForm.markAllAsTouched();
      return;
    }
    // todo   putting data in const called response and send it as an argument in function     
    const response = this.LoginForm.value
    this.Loginvalues(response)
  }

  // get email controller
  get emailController() {
    return this.LoginForm.get('email')
  }
  // get password controller
  get passwordController() {
    return this.LoginForm.get('password')
  }

  goingToResetPassword(){
    this.router.navigate(['/reset-password'])
  }
}
