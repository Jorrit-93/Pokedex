import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeCatchPage } from './poke-catch.page';

describe('PokeCatchPage', () => {
  let component: PokeCatchPage;
  let fixture: ComponentFixture<PokeCatchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokeCatchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeCatchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
