export interface IArtist {
  _id: string;
  user: string;
  name: string;
  info: string;
  image: File | null;
  isPublished: boolean;
}

export interface IArtistMutation {
  name: string;
  info: string;
  image: File | null;
}

export interface IAlbum {
  _id: string;
  user: string;
  name: string;
  artist: {
    _id: string;
    name: string;
  };
  release_year: number;
  image: File | null;
  isPublished: boolean;
}

export interface IAlbumMutation {
  name: string;
  artist: {
    _id: string;
    name: string;
  };
  release_year: string;
  image: File | null;
}

export interface ITrack {
  _id: string;
  user: string;
  name: string;
  album: {
    _id: string;
    name: string;
    image: File | null;
    artist: {
      name: string;
    };
  };
  duration: string;
  track_number: string;
  youtubeLink: string;
  isPublished: boolean;
}

export interface ITrackMutation {
  name: string;
  artist: {
    _id: string;
    name: string;
  };
  album: {
    _id: string;
    name: string;
  };
  duration: string;
  track_number: number;
  youtubeLink: string;
}

export interface IUser {
  _id: string;
  username: string;
  token: string;
  role: string;
}

export interface ITrackHistory {
  _id: string;
  track: {
    name: string;
    album: {
      name: string;
      image: File | null;
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
