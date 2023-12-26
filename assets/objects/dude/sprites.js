import { getDudeParts } from "../../images/dudeParts/index.js";

export function getSprites( partsObj ) {
    const spritePaths = getDudeParts();
    const result = {};
    const img = document.createElement('img');
    img.src = 'assets/images/dudeParts/dude1/';
}

export function getPartSprite( part, partName ) {
    const spritePaths = getDudeParts();
    const result = document.createElement('img');
    result.src = spritePaths[ partName ][ part ];
    console.log('RESULT')
    console.log(result)
    return result;
}