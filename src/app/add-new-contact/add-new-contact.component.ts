import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { ContactService } from '../services/contact.service';

@Component({
  selector: "app-add-new-contact",
  templateUrl: "./add-new-contact.component.html",
  styleUrls: ["./add-new-contact.component.css"]
})
export class AddNewContactComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router, private contactservice:ContactService) {}

  dataImageURL;

  ngOnInit() {}

  handlerFunction(contactForm) {
    contactForm.form.value.image = this.dataImageURL;
    if (contactForm.form.valid) {
      // Done
      this.contactservice.addContact(contactForm.form.value)
      contactForm.form.reset();
      this.router.navigate(["/"]);
    }
  }

  readURL(e, avatar) {
    if (e.target.files && e.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (res: any) => {
        this.dataImageURL = res.target.result;
        avatar.style.backgroundImage = `url(' ${res.target.result} ')`;
        avatar.style.backgroundSize = "cover";
        avatar.style.border = "0";
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }
}
