import { Component } from '@angular/core';
import { Web3Service } from './services/web3.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
      private web3Service: Web3Service,
  ) {
    this.web3Service.bootstrapWeb3();
  }
}
