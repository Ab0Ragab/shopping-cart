import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { CartService } from '../shared/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  constructor(private cartService: CartService, 
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(11)]],
      address: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
  }, {
      
  });   
  }

   // convenience getter for easy access to form fields
   get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));

    this.cartService.clearCart();
    this.registerForm.reset();
    this.router.navigate(['/']);
}

onReset() {
    this.submitted = false;
    this.registerForm.reset();
}

}
