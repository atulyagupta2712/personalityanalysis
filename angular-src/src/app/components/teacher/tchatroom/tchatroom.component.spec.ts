/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TchatroomComponent } from './tchatroom.component';

describe('TchatroomComponent', () => {
  let component: TchatroomComponent;
  let fixture: ComponentFixture<TchatroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TchatroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TchatroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
