import { Component, AfterViewInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { FlowbiteService } from '../../../../app/core/services/Flowbite.Service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register implements AfterViewInit {

  constructor(private flowbiteService: FlowbiteService) { }

  ngAfterViewInit(): void {
    this.flowbiteService.loadFlowbite(() => {
      initFlowbite();
    });
  }
//    todo form group and form controls with validators
  registerForm = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(50)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    role: new FormControl('', [Validators.required]),
  });
  //      todo getters for form controls           
  get userName() {
    return this.registerForm.get('userName');
  }
  get emailControl() {
    return this.registerForm.get('email');
  }
  get phoneControl() {
    return this.registerForm.get('phone');
  }
  get roleControl() {
    return this.registerForm.get('role');
  }

  logform(){
    console.log(this.registerForm);
    
  }
}
