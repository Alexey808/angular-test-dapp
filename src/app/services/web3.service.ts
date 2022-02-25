import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  EMPTY,
  filter,
  forkJoin,
  from,
  map,
  Observable,
  of,
  switchMap,
  take,
} from 'rxjs';
import Web3 from 'web3';


const SimpleStorageContract = require('./../../../build/contracts/SimpleStorage.json');

@Injectable()
export class Web3Service {
  private web3$: BehaviorSubject<Web3> = new BehaviorSubject<Web3>(this.defaultWeb3);
  private accounts: string[] = [];
  private contract: any;
  private isReady$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  private get defaultWeb3(): Web3 {
    return new Web3(
      new Web3.providers.HttpProvider('http://localhost:8545')
    )
  }

  public get web3IsReady$(): Observable<boolean> {
    return this.isReady$.asObservable().pipe(
      filter((web3IsReady:boolean) => web3IsReady),
    )
  }

  constructor() {}

  public bootstrapWeb3(): void {
    window.addEventListener('load', () => {
      this.onInitWeb3();
    });
  }

  private onInitWeb3(): void {
    this.web3$.asObservable().pipe(
      switchMap((web3: Web3) => forkJoin([
        from(web3.eth.getAccounts()),
        from(web3.eth.getChainId()),
        of(web3),
      ])),
      catchError(() => {
        this.isReady$.next(false);
        return EMPTY;
      }),
    ).subscribe(([accounts, networkId, web3]: [string[], number, Web3]) => {
      this.accounts = accounts;
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      this.contract = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      this.isReady$.next(true);

      console.table({
        metaMaskActiveAddress: this.accounts[0],
        contractAddress: deployedNetwork.address,
        networkId: networkId,
      });
    });

    this.getWeb3$().pipe(
      catchError(() => {
        this.isReady$.next(false);
        return EMPTY;
      }),
      take(1),
    ).subscribe((web3: Web3 | undefined) => {
      if (web3) {
        this.web3$.next(web3);
      }
    });
  }

  private getWeb3$(): Observable<Web3> {
    return typeof window['ethereum'] !== 'undefined'
      ? from(window['ethereum'].enable()).pipe(
          map(() => new Web3(window['ethereum']))
      )
      : of(this.defaultWeb3);
  }

  public changeStore(value: number): void {
    this.web3IsReady$.pipe(
      switchMap(() => from(this.contract.methods.set(value).send({ from: this.accounts[0] }))),
      take(1),
    ).subscribe(() => {
      this.checkChangedStore();
    })
  }

  private checkChangedStore(): void {
    this.web3IsReady$.pipe(
      switchMap(() => from(this.contract.methods.get().call())),
      take(1),
    ).subscribe((value) => console.log('checkChangedStore: ', value));
  }
}
