import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UppetPage } from './uppet.page';

describe('UppetPage', () => {
  let component: UppetPage;
  let fixture: ComponentFixture<UppetPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UppetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
