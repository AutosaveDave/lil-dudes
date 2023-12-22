/*  When creating a new scene, all scene properties are set to
    these default values unless the specified variant object contains
    a value for that property (in which case the variant's property
    values are used instead) */

export const defaults = {
    variant: 'default',
    camera: {
        angle: 35,
        direction: 0,
        x: 0.5,     
        y: 0.5,
        zoom: 1,
    },
    objects: [],
    speed: 1,
}