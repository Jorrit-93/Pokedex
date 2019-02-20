import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeDetailPage } from './poke-detail.page';

describe('PokeDetailPage', () => {
  let component: PokeDetailPage;
  let fixture: ComponentFixture<PokeDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokeDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
