export function getDudeParts() {
    const result = {};
    const parts = [ "arm", "eye", "head", "leg", "mouth", "torso" ];
    const count = 1;
    for( let a = 0 ; a < count ; a += 1 ) {
        const typeName = `dude${ a }`;
        result[ typeName ] = {};
        parts.forEach( part => {
            result[ typeName ][ part ] = `assets/images/dudeParts/${ typeName }/${ part }.svg`;
        } );
    }
    return result;
}