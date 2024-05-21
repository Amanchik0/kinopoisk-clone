export interface Genre {
    id: number;
    name: string;
  }
  
  export interface Comment {
    author: string;
    text: string;
    rate: number;
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
  }
  
  export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    fullName: string;
    image?: string;
    isAdmin: boolean;
    // name:string;
  }     
  