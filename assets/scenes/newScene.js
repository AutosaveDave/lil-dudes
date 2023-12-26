import { sceneVariants } from "./sceneVariants.js";
import { newDude } from "../objects/dude/newDude.js";
import { getPartSprite } from "../objects/dude/sprites.js";

export const newScene = ( variant, ctx, stageWidth, stageHeight ) => {
    const sceneProps = sceneVariants.defaults;
    if( sceneVariants.hasOwnProperty( variant ) ) {
        Object.assign( sceneProps, sceneVariants[ variant ] );
    }
    
    const newObjects = []
    sceneProps.objects.forEach( objArray => { newObjects.push( newDude( ...objArray, ctx ) ) } );
    sceneProps.objects = newObjects;

    const camx = sceneProps.camera.x * stageWidth;
    const camy = sceneProps.camera.y * stageHeight;
    sceneProps.camera.x = camx;
    sceneProps.camera.y = camy;
    return {
        ctx: ctx,
        sprites: { arm: [], eye: [], head: [],
                leg: [], mouth: [], torso: [], },
        ...sceneProps,

        loadSprites: function() {
            const loadedSprites = { arm: [], eye: [], head: [],
                                    leg: [], mouth: [], torso: [], };
            this.objects.forEach( ( obj, obj_index ) => {
                const _obj = obj;
                Object.keys( loadedSprites ).forEach( ( key ) => {
                    console.log(_obj)
                    console.log( _obj.parts[ key ] )
                    const sNames = ( _obj.parts[ key ].hasOwnProperty( 'spriteName' )
                        ? [ _obj.parts[ key ].spriteName ]
                        : [ _obj.parts[ key ].left.spriteName, _obj.parts[ key ].right.spriteName ] 
                    );
                    const sNameCount = sNames.length;
                    sNames.forEach( ( sName, sprite_index ) => {
                        let currentIndex = 0;
                        let newSpr = null;
                        if( !( loadedSprites[ key ].includes( sName ) ) ) {
                            currentIndex = loadedSprites[ key ].length;
                            loadedSprites[ key ].push( sName );
                            newSpr = getPartSprite( key, sName );
                            this.sprites[ key ].push( newSpr );
                            
                        } else {
                            loadedSprites[ key ].forEach( ( spr, spr_index ) => {
                                if( sName === spr ) {
                                    currentIndex = spr_index;
                                    newSpr = this.sprites[ key ][ spr_index ]
                                }
                            } );
                        }
                        if( sNameCount <= 1 ) {
                            this.objects[ obj_index ].parts[ key ].sprite = newSpr;
                        } else {
                            if( sprite_index === 0 ) {
                                this.objects[ obj_index ].parts[ key ].left.sprite = newSpr;
                            } else {
                                this.objects[ obj_index ].parts[ key ].right.sprite = newSpr;
                            }
                        }
                    } );
                    
                } );
            } );
        },
        step: function ( delta ) {
            if( !( delta === 0 || delta === undefined || delta === null ) ) {
                const objCount = this.objects.length;
                for( let i = 0 ; i < objCount ; i += 1 ) {
                    this.objects[ i ].step( delta );
                }
                
            }
        },
        draw: function() {
            this.objects.forEach( obj => {
                obj.draw();
            } )
        },
        start: function() {

        },
    }
}