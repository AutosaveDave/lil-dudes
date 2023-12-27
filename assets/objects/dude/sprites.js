import { getDudeParts } from "../../images/dudeParts/index.js";

export function getPartSprite( part, partName ) {
    const spritePaths = getDudeParts();
    const result = document.createElement('img');
    
    result.src = spritePaths[ partName ][ part ];
    return result;
}
