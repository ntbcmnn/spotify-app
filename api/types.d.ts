export interface IArtist {
    name: string;
    info: string;
    image: string | null;
}

export interface IAlbum {
    name: string;
    artist: string;
    release_year: number;
    image: string | null;
}

export interface ITrack {
    name: string;
    album: string;
    duration: string;
}