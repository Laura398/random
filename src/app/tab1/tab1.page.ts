import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor() {}
  quote: string = '';
  author: string = '';

  async getQuote() {
    this.quote = '';
    try {
      const res = await fetch('https://api.api-ninjas.com/v1/quotes', {
        headers: { 'X-Api-Key': 'Bhxc9wq5aZnE8ju8mX7JYQ==gprZ6q9sPXpiSiSv' },
      });
      const json = await res.json()
      this.quote = json[0].quote;
      this.author = json[0].author;
    } catch (error) {
      this.quote = 'An error occurred while fetching the quote.';
      this.author = '';
    }
  }

  ngOnInit() {
    this.getQuote();
  }

}

