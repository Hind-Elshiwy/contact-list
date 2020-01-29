import {
  Component,
  OnInit,
  QueryList,
  ViewChildren,
  ElementRef
} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import contacts from '../../assets/contacts.json';
import recentContacts from '../../assets/recent-contact.json';
import { ContactService } from '../services/contact.service.js';

@Component({
  selector: "app-contact-list",
  templateUrl: "./contact-list.component.html",
  styleUrls: ["./contact-list.component.css"]
})
export class ContactListComponent implements OnInit {
  constructor(private http: HttpClient, private contactservice:ContactService) {}

  alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  allContacts;
  formatedContacts;
  recentContacts;
  serachMode: boolean = false;
  searchQueryWord: string = "";
  identicalContacts = [];
  noDataFound: boolean = false;

  ngOnInit() {
    this.recentContacts = this.contactservice.recentContacts
    this.getAllContacts();
  }

  // Get All contacts
  getAllContacts() {
      this.allContacts = this.contactservice.allContacts.map(user => {
        user["fullName"] = user.firstName + " " + user.lastName;
        return user;
      });
      // we want to group the items by the first letter
      let formatedDataAsObject = this.contactservice.allContacts.reduce((acc, current) => {
        console.log(current)
        let firstLetter = current.firstName.charAt(0).toLowerCase();

        // If accumulator have this letter
        if (acc[firstLetter]) {
          acc[firstLetter]["items"].push(current);
        } else {
          // If don't
          acc[firstLetter] = {
            letter: firstLetter,
            items: [current]
          };
        }
        return acc;
      }, {});

      // Convert the data to array so we can easily loop over it
      let formatedDataAsArray = [];
      for (let key in formatedDataAsObject) {
        formatedDataAsArray.push(formatedDataAsObject[key]);
      }
      this.formatedContacts = formatedDataAsArray;
  }

  // Close search section when focusOut on search input
  closeSearchSection(e) {
    if (e.target.value.length == 0) {
      this.serachMode = false;
    }
  }

  // Go back to contact list
  backToContact(searchInput) {
    this.serachMode = false;
    searchInput.value = "";
  }

  // Get seach query word
  handleSearchFunctionality(e) {
    if (e.length > 0) {
      this.serachMode = true;
      this.identicalContacts = [];
      // search with query word over all contacts and that contact will match push it in identicalContacts array
      this.allContacts.filter(item => {
        // if search word match
        if (item.fullName.toLowerCase().search(e.toLowerCase()) >= 0) {
          this.identicalContacts.push(item);
        } else {
          if (this.identicalContacts.length === 0) {
            this.noDataFound = true;
          } else {
            this.noDataFound = false;
          }
        }
        return item;
      });
    } else {
      this.serachMode = false;
    }
  }

  @ViewChildren("contacts") contacts: QueryList<ElementRef>;
  // scroll to the letter group section with click event
  scrollToLetterSection(letter) {
    if (this.contacts["_results"].length > 0) {
      this.contacts["_results"].forEach(({ nativeElement: el }) => {
        if (el.classList.contains(letter)) {
          el.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      });
    }
  }
}
