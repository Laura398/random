import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab0',
  templateUrl: './tab0.page.html',
  styleUrls: ['./tab0.page.scss'],
})
export class Tab0Page implements OnInit {
  constructor(private storage: Storage) {}

  isReady: boolean = false;
  quote: string = '';
  author: string = '';
  fact: string = '';
  joke: string = '';

  async getQuote() {
    this.quote = '';
    try {
      const res = await fetch('https://api.api-ninjas.com/v1/quotes', {
        headers: { 'X-Api-Key': 'Bhxc9wq5aZnE8ju8mX7JYQ==gprZ6q9sPXpiSiSv' },
      });
      const json = await res.json();
      this.quote = json[0].quote;
      this.author = json[0].author;
    } catch (error) {
      this.quote = 'An error occurred while fetching the quote.';
      this.author = '';
    }
  }

  async getFact() {
    this.fact = '';
    try {
      const res = await fetch('https://api.api-ninjas.com/v1/facts', {
        headers: { 'X-Api-Key': 'Bhxc9wq5aZnE8ju8mX7JYQ==gprZ6q9sPXpiSiSv' },
      });
      const json = await res.json();
      this.fact = json[0].fact;
    } catch (error) {
      this.fact = 'An error occurred while fetching the fact.';
    }
  }

  async getJoke() {
    this.joke = '';
    try {
      const res = await fetch('https://api.api-ninjas.com/v1/jokes', {
        headers: { 'X-Api-Key': 'Bhxc9wq5aZnE8ju8mX7JYQ==gprZ6q9sPXpiSiSv' },
      });
      const json = await res.json();
      this.joke = json[0].joke;
    } catch (error) {
      this.joke = 'An error occurred while fetching the joke.';
    }
  }

  async ngOnInit() {
    await this.storage.create();
    const todayDate = new Date().toDateString();
    const dateInStorage = await this.storage.get('date');

    if (todayDate === dateInStorage) {
      const quote = await this.storage.get('quote');
      if (!quote) {
        await this.getQuote();
        this.storage.set('quote', this.quote);
        this.storage.set('author', this.author);
      } else {
        this.quote = quote;
        this.author = await this.storage.get('author') || '';
      }

      const fact = await this.storage.get('fact');
      if (!fact) {
        await this.getFact();
        this.storage.set('fact', this.fact);
      } else {
        this.fact = fact;
      }

      const joke = await this.storage.get('joke');
      if (!joke) {
        await this.getJoke();
        this.storage.set('joke', this.joke);
      } else {
        this.joke = joke;
      }
    } else {
      await Promise.all([this.getQuote, this.getFact, this.getJoke]);
      this.storage.set('quote', this.quote);
      this.storage.set('author', this.author);
      this.storage.set('fact', this.fact);
      this.storage.set('joke', this.joke);
      this.storage.set('date', todayDate);
    }
    this.isReady = true;
  }
}
