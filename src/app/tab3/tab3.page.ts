import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor() {}

  joke: string = '';

  async getJoke() {
    this.joke = '';
    try {
      const res = await fetch('https://api.api-ninjas.com/v1/jokes', {
        headers: { 'X-Api-Key': 'Bhxc9wq5aZnE8ju8mX7JYQ==gprZ6q9sPXpiSiSv' },
      });
      const json = await res.json()      
      this.joke = json[0].joke;
    } catch (error) {
      this.joke = 'An error occurred while fetching the joke.';
    }
  }

  ngOnInit() {
    this.getJoke();
  }

}
