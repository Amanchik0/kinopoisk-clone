export interface Genre {
  id: number;
  name: string;
}

export interface Comment {
  author: string;
  text: string;
  rate: number;
  userId: string | number ;   

}

export interface Film {
  id: number;
  titleRus: string;
  titleEng: string;
  year: string;
  time: string;
  genre: Genre;
  imageUrl: string;
  comments?: Comment[];
  linkForTrailer?: string;
  averageRating?: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  fullName: string;
  image?: string;
  isAdmin: boolean;
}

export type FilmData = Pick<Film, 'titleRus' | 'titleEng' | 'year' | 'time' | 'genre' | 'imageUrl' | 'linkForTrailer'>;
export type UserData = Pick<User, 'fullName' | 'email' | 'image'>;
