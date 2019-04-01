export abstract class CacheItem {
    public cacheID: string;
    protected timestamp: number;
    protected interval: number;

    constructor() {
        this.refresh();
    }

    public checkRefresh(): boolean {
        const currentTime = Number((Date.now() / this.interval).toFixed()); //milliseconds to hours
        if(this.timestamp == undefined || this.timestamp < currentTime) {
            this.timestamp = currentTime;
            this.refresh();
            return true;
        }
        return false;
    }

    abstract refresh(): void;
}
