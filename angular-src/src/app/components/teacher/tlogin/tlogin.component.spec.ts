/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TloginComponent } from './tlogin.component';

describe('TloginComponent', () => {
  let component: TloginComponent;
  let fixture: ComponentFixture<TloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
