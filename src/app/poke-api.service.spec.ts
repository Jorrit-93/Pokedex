import { TestBed } from '@angular/core/testing';

import { PokeAPIService } from './poke-api.service';

describe('PokeAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PokeAPIService = TestBed.get(PokeAPIService);
    expect(service).toBeTruthy();
  });
});
