import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../../../services/validate.service';

@Component({
  selector: 'app-tdashboard',
  templateUrl: './tdashboard.component.html',
  styleUrls: ['./tdashboard.component.css']
})
export class TdashboardComponent implements OnInit {
  name: String;
  email: String;
  number: Number;
  experience: String;
  expertise: String;
  address: String;
  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private validateService: ValidateService
  ) { }

  ngOnInit() {
    var data = localStorage.getItem('teacher');
    var object = JSON.parse(data);
    //  console.log(object.name);
    document.querySelector('#name').innerHTML = object.name;
  }

  onLogoutClick() {
    this.authService.onLogout();
    this.flashMessage.show('You have logged out successfully', {cssClass: 'alert-success', timeout: 4000});
    this.router.navigate(['/']);
    return false;
  }

  onSubmit() {
    const psychologist = {
      name: this.name,
      email: this.email,
      number: this.number,
      expertise: this.expertise,
      experience: this.experience,
      address: this.address
    }
    if (!this.validateService.validateDetailedForm(psychologist)) {
      this.flashMessage.show("Please fill in all the fields", { cssClass: 'alert-danger', timeout: 4000 });
    } else {
      // Math.floor((Math.random() * 5) + 1);
      this.authService.addpsychologist(psychologist).subscribe(data => {
        console.log(data);
        if (data.success) {
          this.flashMessage.show("Psychologist successfully added!", { cssClass: 'alert-success', timeout: 3000 });
        }
        else {
          this.flashMessage.show(data.msg, { cssClass: 'alert-danger' });
        }
      })
    }
  }
}
