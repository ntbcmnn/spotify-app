export interface IArtist {
  _id: string;
  name: string;
  info: string;
  image: string | null
}

export interface IAlbum {
  _id: string;
  name: string;
  artist: {
    name: string;
  };
  release_year: number;
  image: string | null;
}

export interface ITrack {
  _id: string;
  name: string;
  album: {
    name: string;
    artist: {
      name: string;
    };
  };
  duration: string;
  track_number: number;
}
