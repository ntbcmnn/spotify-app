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
    image: string | null;
    artist: {
      name: string;
    };
  };
  duration: string;
  track_number: number;
  youtubeLink: string;
}

export interface IUser {
  _id: string;
  username: string;
  token: string;
}

export interface ITrackHistory {
  _id: string;
  track: {
    name: string;
    album: {
      name: string;
      image: string | null;
      artist: {
        name: string;
      };
    };
  };
  datetime: string;
}

export interface RegisterResponse {
  user: IUser;
  message: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}
