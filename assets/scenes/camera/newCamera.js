function getYScale( _angle ) {
    return Math.sin( _angle );
}

export const newCamera = ( x, y, angle ) => {
    return {
        angle: angle,
        direction: 0,
        x: x,     
        y: y,
        zoom: 1,
        yScale: getYScale( angle ),

        setAngle: function( newAngle ) {
            this.angle = newAngle;
            this.yScale = getYScale( newAngle );
        },
    }
}