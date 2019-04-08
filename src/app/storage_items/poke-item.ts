import { CacheItem } from './cache-item';

export class PokeItem extends CacheItem {
    public pokemonID: string;
    public pokemon: any;

    constructor(item?: any) {
        super();
        this.interval = 86400000; //1 day
        if(item != undefined) {
            this.cacheID = item.cacheID;
            this.timestamp = item.timestamp;
            this.pokemonID = item.pokemonID;
            this.pokemon = item.pokemon;
        }
    }

    refresh(): void {
        this.pokemon = undefined;
    }
}
