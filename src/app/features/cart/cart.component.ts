import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { CartResponse } from '../../core/interfaces/api.interface';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CartLoadingComponent } from '../../shared/cart-loading/cart-loading.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  imports: [CartLoadingComponent, ReactiveFormsModule,TranslatePipe],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartData: CartResponse | null = null;
  isLoading = false;
  IsAddressFormIsOpen = false;

  // todo   form group  
  AddressForm = new FormGroup({
    details: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required])
  });

  get detailsController() {
    return this.AddressForm.get('details')
  }
  get CityController() {
    return this.AddressForm.get('city')
  }
  get PhoneController() {
    return this.AddressForm.get('phone')
  }


  constructor(private cartService: CartService, private toaster: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.getUserCart();
  }
  // todo  get cart
  getUserCart() {
    this.isLoading = true;
    this.cartService.getUserCart().subscribe({
      next: (response) => {
        this.cartData = response;
        this.isLoading = false;
      },
      error: (error) => {
        // this.toaster.error(error?.message || 'Error getting cart');
        this.isLoading = false;
      }
    });
  }
  // todo   ypdate product cart  
  Update_productCart(id: string, count: number) {
    if (count < 1) return;
    this.cartService.updateProduct(id, count).subscribe({
      next: (response) => {
        this.toaster.success('Updated quantity to ' + count);
        this.cartData = response;
      },
      error: (error) => {
        // this.toaster.error(error?.message || 'there is some thing wrong');
      }
    });
  }
  // todo   delete product in cart
  deleteSpecficProduct(id: string) {
    this.cartService.deleteProduct(id).subscribe({
      next: (response) => {
        this.cartData = response;
        this.toaster.success('Deleted : Success');
      },
      error: () => {
        // this.toaster.error('Deleted : Fail');
      }
    });
  }
  // todo   claer all cart
  clearCart() {
    this.cartService.clearCart().subscribe({
      next: () => {
        this.cartData = null;
        this.toaster.success('Your Cart is Empty now');
      },
      error: (error) => {
        // this.toaster.error(error?.message || 'Something went wrong');
      }
    });
  }
  // todo   checkout session   
  CheckOutSession() {
    if (!this.cartData?.cartId) return;

    if (this.AddressForm.invalid) {
      this.AddressForm.markAllAsTouched();
      return;
    }

    // API يتوقع shippingAddress كـ object
    const body = {
      shippingAddress: this.AddressForm.value
    };

    this.cartService.checkOut_session(this.cartData.cartId, body).subscribe({
      next: (response) => {
        if (response?.session?.url) {
          window.location.href = response.session.url;
        } else {
          this.toaster.error('No checkout session returned');
        }
      },
      error: (error) => {
        this.toaster.error(error?.message || 'Something went wrong');
      }
    });
  }
  // todo   continue shoping
  continueShopping() {
    this.router.navigate(['/home']);
  }
}
