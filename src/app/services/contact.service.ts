import { Injectable } from '@angular/core';
import contacts from '../../assets/contacts.json';
import recentContacts from '../../assets/recent-contact.json';
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor() { }
  allContacts = contacts.data
  recentContacts = recentContacts.data
  getAllContacts() {
    return this.allContacts
  }
  getRecentContacts() {
    return this.recentContacts
  }
  addContact(user){
    this.allContacts.push(user)
  }
}
