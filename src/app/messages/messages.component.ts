import { Component, OnInit } from '@angular/core';

// Open MessagesComponent and import the MessageService.
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  // Modify the constructor with a parameter that declares
  // a public messageService property. Angular will inject
  // the singleton MessageService into that property
  // when it creates the MessagesComponent.
  constructor(public messageService: MessageService) {}

  ngOnInit() {
  }

}
