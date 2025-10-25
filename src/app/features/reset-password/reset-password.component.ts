import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  new_password: any;

  constructor(private toaster: ToastrService, private authservice: AuthService, private cookie: CookieService, private router: Router) { }
  step = 1;

  // --------------Forms------------------
  // todo   Forget form   
  Forget_password_group = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })
  // todo   verfy code form
  Verfy_Code_group = new FormGroup({
    verfyCode: new FormControl('', [Validators.required, Validators.minLength(6)])
  })
  // todo   reset password 
  reset_password = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    new_password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })
  // ------------------------------------------------------------------------
  // ----------- functions calls backend ---------------
  // todo Submit => forget password   
  submit_Forget_password() {
    if (this.Forget_password_group.invalid) {
      this.Forget_password_group.markAllAsTouched()
      return;
    }
    this.Forget_password_group.value.email;
    this.reset_password.get('email')?.patchValue(this.Forget_password_group.value.email || '');
    this.authservice.forgetPassword({ email: this.Forget_password_group.value.email! }).subscribe({
      next: (response) => {
        console.log(response)
        this.step = 2;
      },
      error: (err) => {
        this.toaster.error(err.message, 'Error', { timeOut: 1500 })
      }
    })

  }
  // todo   submit => verfy code  
  submit_Verfy_code() {
    if (this.Verfy_Code_group.invalid) {
      this.Verfy_Code_group.markAllAsTouched()
      return;
    }
    this.authservice.verfyCode({ resetCode: this.Verfy_Code_group.value.verfyCode! }).subscribe({
      next: (response) => {
        this.step = 3;
        console.log(response);
      },
      error: (err) => {
        this.toaster.error('verfy Code is not correct')
      }
    })
  }
  // todo   submit => reset password
  submit_reset_password() {

    if (this.reset_password.invalid) {
      this.reset_password.markAllAsTouched()
      return;
    }
    this.authservice.resetPassword({ email: this.reset_password.value.email!, newPassword: this.reset_password.value.new_password! }).subscribe({
      next: (res) => {
        console.log(res)
        this.toaster.success('password reset sucess', "", { timeOut: 1500, progressBar: true })
        // todo  token be in this res
        this.cookie.get(res.token);
        this.authservice.decodedToken(res.token);
        this.router.navigate(['/login`'])
      },
      error: (err) => {
        console.log(err)
        this.toaster.error('Error')
      }
    })
  }
  // -----------------------------------------
  // functions  : ==>   getter

  get emailController() {
    return this.Forget_password_group.get('email');
  }
  get VerfyCodeController(){
    return this.Verfy_Code_group.get('verfyCode');
  }
  get newPassword(){
    return this.reset_password.get('new_password');
  }
}

