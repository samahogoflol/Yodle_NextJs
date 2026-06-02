import { StaticImageData } from "next/image";

export interface Reviews {
    id : number;
    name : string;
    review : string;
    grade : number;
    photoMain : string | StaticImageData;
    photoInALesson : string | StaticImageData;
}