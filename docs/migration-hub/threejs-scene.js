// Three.js Advanced 3D Scene for Cloud Genesis Migration Hub
// This file provides production-ready Three.js implementation for enterprise 3D visuals

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

class CloudMigrationScene {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            45,
            this.container.offsetWidth / this.container.offsetHeight,
            0.1,
            1000
        );
        
        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance'
        });
        
        this.clock = new THREE.Clock();
        this.mouse = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        
        this.init();
        this.setupLighting();
        this.createEnvironment();
        this.loadModels();
        this.setupPostProcessing();
        this.setupEventListeners();
        this.animate();
    }
    
    init() {
        this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x0f172a, 0);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.2;
        
        this.container.appendChild(this.renderer.domElement);
        
        this.camera.position.set(0, 5, 15);
        this.camera.lookAt(0, 0, 0);
        
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.enableZoom = false;
        this.controls.autoRotate = true;
        this.controls.autoRotateSpeed = 0.5;
        this.controls.maxPolarAngle = Math.PI / 2.2;
    }
    
    setupLighting() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0x60a5fa, 1.5);
        directionalLight.position.set(10, 15, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.camera.near = 0.1;
        directionalLight.shadow.camera.far = 50;
        directionalLight.shadow.camera.left = -10;
        directionalLight.shadow.camera.right = 10;
        directionalLight.shadow.camera.top = 10;
        directionalLight.shadow.camera.bottom = -10;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);
        
        const pointLight1 = new THREE.PointLight(0xa78bfa, 1, 20);
        pointLight1.position.set(-5, 3, 5);
        this.scene.add(pointLight1);
        
        const pointLight2 = new THREE.PointLight(0xec4899, 1, 20);
        pointLight2.position.set(5, 3, -5);
        this.scene.add(pointLight2);
        
        const hemisphereLight = new THREE.HemisphereLight(0x60a5fa, 0x1e293b, 0.5);
        this.scene.add(hemisphereLight);
    }
    
    createEnvironment() {
        const gridHelper = new THREE.GridHelper(30, 30, 0x60a5fa, 0x334155);
        gridHelper.material.opacity = 0.2;
        gridHelper.material.transparent = true;
        this.scene.add(gridHelper);
        
        const geometry = new THREE.PlaneGeometry(30, 30);
        const material = new THREE.MeshStandardMaterial({
            color: 0x0f172a,
            roughness: 0.8,
            metalness: 0.2
        });
        const plane = new THREE.Mesh(geometry, material);
        plane.rotation.x = -Math.PI / 2;
        plane.position.y = -0.01;
        plane.receiveShadow = true;
        this.scene.add(plane);
    }
    
    loadModels() {
        const loader = new GLTFLoader();
        
        // Load on-premises server infrastructure
        loader.load(
            '/assets/models/server-rack.glb',
            (gltf) => {
                this.serverRack = gltf.scene;
                this.serverRack.position.set(-6, 0, 0);
                this.serverRack.scale.set(2, 2, 2);
                this.serverRack.traverse((node) => {
                    if (node.isMesh) {
                        node.castShadow = true;
                        node.receiveShadow = true;
                    }
                });
                this.scene.add(this.serverRack);
            },
            undefined,
            (error) => {
                console.error('Error loading server rack model:', error);
                this.createFallbackServer(-6, 0, 0);
            }
        );
        
        // Load cloud platform
        loader.load(
            '/assets/models/cloud-platform.glb',
            (gltf) => {
                this.cloudPlatform = gltf.scene;
                this.cloudPlatform.position.set(6, 2, 0);
                this.cloudPlatform.scale.set(2, 2, 2);
                this.cloudPlatform.traverse((node) => {
                    if (node.isMesh) {
                        node.castShadow = true;
                        node.receiveShadow = true;
                    }
                });
                this.scene.add(this.cloudPlatform);
            },
            undefined,
            (error) => {
                console.error('Error loading cloud model:', error);
                this.createFallbackCloud(6, 2, 0);
            }
        );
        
        this.createDataFlowParticles();
    }
    
    createFallbackServer(x, y, z) {
        const geometry = new THREE.BoxGeometry(2, 3, 1.5);
        const material = new THREE.MeshStandardMaterial({
            color: 0x334155,
            roughness: 0.5,
            metalness: 0.8
        });
        const server = new THREE.Mesh(geometry, material);
        server.position.set(x, y + 1.5, z);
        server.castShadow = true;
        server.receiveShadow = true;
        this.scene.add(server);
        
        for (let i = 0; i < 5; i++) {
            const light = new THREE.Mesh(
                new THREE.BoxGeometry(0.1, 0.1, 0.05),
                new THREE.MeshBasicMaterial({
                    color: i % 2 === 0 ? 0x22c55e : 0x60a5fa,
                    emissive: i % 2 === 0 ? 0x22c55e : 0x60a5fa
                })
            );
            light.position.set(x + 0.8, y + 0.5 + i * 0.5, z + 0.76);
            this.scene.add(light);
        }
    }
    
    createFallbackCloud(x, y, z) {
        const cloudGroup = new THREE.Group();
        
        const geometry = new THREE.SphereGeometry(1.5, 32, 32);
        const material = new THREE.MeshStandardMaterial({
            color: 0x60a5fa,
            roughness: 0.3,
            metalness: 0.7,
            transparent: true,
            opacity: 0.8
        });
        
        const positions = [
            [0, 0, 0],
            [-1, 0.5, 0],
            [1, 0.5, 0],
            [0, 0.8, 0.5],
            [0, 0.8, -0.5]
        ];
        
        positions.forEach(pos => {
            const sphere = new THREE.Mesh(geometry, material.clone());
            sphere.position.set(pos[0], pos[1], pos[2]);
            sphere.scale.multiplyScalar(0.6 + Math.random() * 0.4);
            cloudGroup.add(sphere);
        });
        
        cloudGroup.position.set(x, y, z);
        this.scene.add(cloudGroup);
    }
    
    createDataFlowParticles() {
        const particleCount = 300;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = -6 + Math.random() * 12;
            positions[i + 1] = Math.random() * 5;
            positions[i + 2] = (Math.random() - 0.5) * 4;
            
            velocities[i] = 0.02 + Math.random() * 0.02;
            velocities[i + 1] = 0;
            velocities[i + 2] = 0;
            
            const color = new THREE.Color();
            color.setHSL(0.55 + Math.random() * 0.1, 1.0, 0.6);
            colors[i] = color.r;
            colors[i + 1] = color.g;
            colors[i + 2] = color.b;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const material = new THREE.PointsMaterial({
            size: 0.15,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });
        
        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }
    
    setupPostProcessing() {
        this.composer = new EffectComposer(this.renderer);
        
        const renderPass = new RenderPass(this.scene, this.camera);
        this.composer.addPass(renderPass);
        
        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            0.5,
            0.4,
            0.85
        );
        this.composer.addPass(bloomPass);
    }
    
    setupEventListeners() {
        window.addEventListener('resize', () => this.onWindowResize());
        this.container.addEventListener('mousemove', (e) => this.onMouseMove(e));
    }
    
    onWindowResize() {
        this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
        this.composer.setSize(this.container.offsetWidth, this.container.offsetHeight);
    }
    
    onMouseMove(event) {
        const rect = this.container.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    }
    
    updateParticles() {
        if (this.particles) {
            const positions = this.particles.geometry.attributes.position.array;
            const velocities = this.particles.geometry.attributes.velocity.array;
            
            for (let i = 0; i < positions.length; i += 3) {
                positions[i] += velocities[i];
                
                if (positions[i] > 6) {
                    positions[i] = -6;
                    positions[i + 1] = Math.random() * 5;
                    positions[i + 2] = (Math.random() - 0.5) * 4;
                }
            }
            
            this.particles.geometry.attributes.position.needsUpdate = true;
        }
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        const delta = this.clock.getDelta();
        
        this.controls.update();
        
        this.updateParticles();
        
        if (this.serverRack) {
            this.serverRack.rotation.y = Math.sin(this.clock.getElapsedTime() * 0.3) * 0.1;
        }
        
        if (this.cloudPlatform) {
            this.cloudPlatform.position.y = 2 + Math.sin(this.clock.getElapsedTime() * 0.8) * 0.2;
            this.cloudPlatform.rotation.y += delta * 0.2;
        }
        
        this.composer.render();
    }
    
    dispose() {
        this.controls.dispose();
        this.renderer.dispose();
        this.scene.traverse((object) => {
            if (object.geometry) object.geometry.dispose();
            if (object.material) {
                if (Array.isArray(object.material)) {
                    object.material.forEach(material => material.dispose());
                } else {
                    object.material.dispose();
                }
            }
        });
    }
}

// Initialize scene when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const scene = new CloudMigrationScene('migration-3d-container');
    
    window.addEventListener('beforeunload', () => {
        scene.dispose();
    });
});

// Export for module usage
export default CloudMigrationScene;
