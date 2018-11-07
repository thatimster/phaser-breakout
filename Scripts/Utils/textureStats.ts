module Breakout{

    export class imageMap{
        imageWidth: number;
        imageHeight: number;
        constructor(setWidth,setHeight){
            
            this.imageWidth = setWidth;
            this.imageHeight = setHeight;
        }
        getImageWidth(){
            return this.imageWidth;
        }
        getImageHeight(){
            return this.imageHeight;
        }
    }
    export interface imageObjectMap{
        [name:string]: imageMap; 
    }
}