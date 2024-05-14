import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  constructor() {}

  fact: string = '';

  async getFact() {
    this.fact = '';
    try {
      const res = await fetch('https://api.api-ninjas.com/v1/facts', {
        headers: { 'X-Api-Key': 'Bhxc9wq5aZnE8ju8mX7JYQ==gprZ6q9sPXpiSiSv' },
      });
      const json = await res.json()
      this.fact = json[0].fact;
    } catch (error) {
      console.error(error);
    }
  }

  ngOnInit() {
    this.getFact();
  }
}
