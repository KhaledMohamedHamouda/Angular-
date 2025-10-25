// todo        note for form group there is two kind of formgroup
// temlate driven forms  //! import : (ngmodule) :small form
//reactive formgroup  //!import (ReactiveFormsModule) from @angular forms =>
//! import 1) FormGroup(parent) => formcontrol(inputs)    2) formArray   3)validator   4) formbuilder

// todo                        imports                                
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validator, Validators } from '@angular/forms';
import { AuthService, UserData } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerForm: FormGroup = new FormGroup({
    // todo   handle controller by logic & catching it    
    name: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email]),

    password: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)]),
    rePassword: new FormControl('', []),

    phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  }
    ,
    // second object may be in array if the vallidators :[this.Matching password , this.labal , this.lablab]
    { validators: this.MatchingPassword })


  // todo     crating constructor         
  constructor(private authService: AuthService, private toaster: ToastrService , private router : Router) { }
  IsLoading: boolean = false;
  // todo       post value to backend  after click on submit button  
  registervalues(value: UserData) {
    this.IsLoading = true;
    this.authService.register(value).subscribe({
      next: (log) => {
        this.IsLoading = false;
        console.log('register Form :', log)
        //! store token  at local storage
        localStorage.setItem('token',log.token)
        // todo     going to auth service to take token
        this.authService.decodedToken
        this.toaster.success("Registeration Sucessful", "Sucess")
        this.router.navigate(['/home'])
      },
      error: (error) => {
        this.IsLoading = false;
        console.log(error);
        if (error?.error?.message) {
          this.toaster.error(error.error.message, "Error")
        }
      }
    })
  }



  // Matching password
  MatchingPassword(group: AbstractControl): null | Record<string, any> {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;
    return password === rePassword ? null : { noMatch: true }
  }

  // submit function()
  submitForm() {
    console.log(this.registerForm.getError('noMatch '))
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    // todo   putting data in const called response and send it as an argument in function     
    const response = this.registerForm.value
    this.registervalues(response)
  }

  // get name controller
  get nameController() {
    return this.registerForm.get('name')
  }
  // get email controller
  get emailController() {
    return this.registerForm.get('email')
  }
  // get password controller
  get passwordController() {
    return this.registerForm.get('password')
  }
  // get rePassword controller
  get rePasswordController() {
    return this.registerForm.get('rePassword')
  }
  // get phone controller
  get phoneController() {
    return this.registerForm.get('phone')
  }
}
