import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VaccunePage } from './vaccune.page';

describe('VaccunePage', () => {
  let component: VaccunePage;
  let fixture: ComponentFixture<VaccunePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccunePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
