import { CacheItem } from './cache-item';

export class GeocacheItem extends CacheItem {
    public pokemonID: string;
    public lat: number;
    public lng: number;
    public active: boolean;

    constructor(item?: any) {
        super();
        this.interval = 3600000; // 1 hour
        if(item != undefined) {
            this.cacheID = item.cacheID;
            this.timestamp = item.timestamp;
            this.pokemonID = item.pokemonID;
            this.lat = item.lat;
            this.lng = item.lng;
            this.active = item.active;
        }
    }

    refresh(): void {
        this.pokemonID = (Math.random() * 807).toFixed(); //807 pokemon in database
        this.active = true;
    }
}
