import * as THREE from "three";

import React, { useEffect, useRef } from "react";

import { Button } from "@material-ui/core";
import heartUrl from "../assets/heart.png";
import moonUrl from "../assets/moon.jpg";
import normalUrl from "../assets/normal.jpg";
import pokerTableUrl from "../assets/pokertable.jpg";

export default function Game() {
  const ref = useRef(null);

  let vertical = false;

  useEffect(() => {
    console.log("Initializing the scene...");

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 25;

    const renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    ref.current.appendChild(renderer.domElement);

    // Lights

    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);

    // Background

    const tableTexture = new THREE.TextureLoader().load(pokerTableUrl);
    scene.background = tableTexture;

    // Avatar

    const firstCardTexture = new THREE.TextureLoader().load(heartUrl);

    const firstCard = new THREE.Mesh(
      new THREE.BoxGeometry(3, 3, 3),
      new THREE.MeshBasicMaterial({ map: firstCardTexture })
    );

    scene.add(firstCard);

    // Moon

    const moonTexture = new THREE.TextureLoader().load(moonUrl);
    const normalTexture = new THREE.TextureLoader().load(normalUrl);

    const moon = new THREE.Mesh(
      new THREE.SphereGeometry(3, 32, 32),
      new THREE.MeshStandardMaterial({
        map: moonTexture,
        normalMap: normalTexture,
      })
    );

    scene.add(moon);

    moon.position.z = 0;

    firstCard.position.z = 0;
    firstCard.position.x = 10;

    const animate = () => {
      requestAnimationFrame(animate);
      if (vertical) {
        moon.rotation.x += 0.005;
      } else {
        moon.rotation.y += 0.005;
      }

      renderer.render(scene, camera);
    };

    animate();
  }, []);

  return (
    <div>
      <div ref={ref} />
      <div className="game-buttons">
        <Button
          variant="contained"
          onClick={() => {
            vertical = !vertical;
          }}
        >
          Toggle Rotation
        </Button>
      </div>
    </div>
  );
}
