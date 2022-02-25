import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Web3Service } from 'src/app/services/web3.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-test-dapp',
  templateUrl: './test-dapp.component.html',
  styleUrls: ['./test-dapp.component.scss']
})
export class TestDappComponent implements OnInit, OnDestroy {
  destroy$: Subject<void> = new Subject<void>();

  public form: FormGroup = new FormGroup({
    value: new FormControl(null, [])
  })

  constructor(
    private web3Service: Web3Service,
  ) { }

  ngOnInit(): void {}

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }

  public changeStorage(): void {
    const formValue: number | null = this.form.get('value')?.value;
    if (formValue) {
      this.web3Service.changeStore(formValue);
    }
  }
}
