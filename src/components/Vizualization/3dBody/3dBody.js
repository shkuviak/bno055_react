import { useEffect, useState } from 'react'
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './3dBody.css';

export default function DBody(props) { 
    const [leftLeg, setLeftLeg] = useState();
    const [rightLeg, setRightLeg] = useState();

    useEffect(() => {
        let camera, scene, renderer, clock, rightArm, domToRender;
        init();
        animate();
        
        function init() {
        
            camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.01, 10 );
            camera.position.set( 2, 2, - 2 );
            
            clock = new THREE.Clock();
        
            scene = new THREE.Scene();
            //scene.background = new THREE.Color( 0xffffff );
        
            const light = new THREE.HemisphereLight( 0xbbbbff, 0x444422 );
            light.position.set( 0, 1, 0 );
            scene.add( light );
        
            // model
            const loader = new GLTFLoader();
            loader.load( 'https://threejs.org/examples/models/gltf/Soldier.glb', function ( gltf ) {
        
                const model = gltf.scene;
                
                rightArm = model.getObjectByName( 'mixamorigRightArm' );
                setLeftLeg(model.getObjectByName('mixamorigLeftLeg'));
                setRightLeg(model.getObjectByName('mixamorigRightLeg'));
        
                scene.add( model );
                
                console.log( model );
        
        
            } );
        
            domToRender = document.getElementById('renderer');
            renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
            renderer.setPixelRatio( domToRender.devicePixelRatio );
            renderer.setSize( domToRender.getBoundingClientRect().width, domToRender.getBoundingClientRect().height );
            renderer.gammaOutput = true;
            renderer.gammaFactor = 2.2;
            domToRender.appendChild( renderer.domElement );
        
            window.addEventListener( 'resize', onWindowResize, false );
        
            const controls = new OrbitControls( camera, renderer.domElement );
            controls.target.set( 0, 1, 0 );
            controls.update();
            
        }
        
        function onWindowResize() {
        
            camera.aspect = domToRender.getBoundingClientRect().width / domToRender.getBoundingClientRect().height
            camera.updateProjectionMatrix();
        
            renderer.setSize( domToRender.getBoundingClientRect().width, domToRender.getBoundingClientRect().height );
        
        }
        
        function animate() {
        
            requestAnimationFrame( animate );
            
            const t = clock.getElapsedTime();
        
            if ( rightArm ) {
            
                // rightArm.rotation.z += Math.sin( t ) * 0.005;
                //rightArm.rotation.z = 1347 / 900 ;
            
            }
            
            if (leftLeg) {
                //leftLeg.rotation.x = 1517 /900;
            }
        
            renderer.render( scene, camera );
        
        }        
        
    }, []);

    useEffect(() => {
        console.log("move leg")
        moveBone(leftLeg, 'leftLeg')
        moveBone(rightLeg, 'rightLeg')
    }, [props.bonesPositions]);

    const moveBone = function(boneObj, name) {
        if(boneObj && props.bonesPositions.filter(x => x.bone == name).length > 0)
        boneObj.rotation.x = props.bonesPositions.filter(x => x.bone == name)[0].pitch / 900;
    }

    return(
        <div id="renderer"></div>
    )
    
}



