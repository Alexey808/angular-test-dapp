import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDappComponent } from './test-dapp.component';

describe('TestDappComponent', () => {
  let component: TestDappComponent;
  let fixture: ComponentFixture<TestDappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestDappComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
