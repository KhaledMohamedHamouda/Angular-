import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartLoaderService {
  
   isLoading = signal(false);

  showLoader() {
    this.isLoading.set(true);
  }
  hideLoader() {
    this.isLoading.set(false);
  }
  get isLoadingStatus() {
    return this.isLoading(); 
  }
}
