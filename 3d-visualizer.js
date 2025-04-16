class Audio3DVisualizer {
    constructor(audioElement, canvasId) {
        this.audio = audioElement;
        this.canvas = document.getElementById(canvasId);
        
        // Three.js setup with improved rendering
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            60, // Wider field of view
            this.canvas.clientWidth / this.canvas.clientHeight,
            0.1,
            1000
        );
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: this.canvas,
            antialias: true,
            alpha: true
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.renderer.setClearColor(0x000000, 0); // Transparent background
        
        // Enhanced audio analyzer setup
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.analyser = this.audioContext.createAnalyser();
        this.source = this.audioContext.createMediaElementSource(this.audio);
        this.source.connect(this.analyser);
        this.analyser.connect(this.audioContext.destination);
        this.analyser.fftSize = 512; // Higher resolution frequency analysis
        this.analyser.smoothingTimeConstant = 0.8; // Smoother transitions
        
        // Create audio-reactive elements
        this.createAudioElements();
        
        // Camera position and controls
        this.camera.position.z = 30;
        this.camera.lookAt(0, 0, 0);
        
        // Animation loop
        this.animate();
        
        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize());
    }
    
    createAudioElements() {
        // Clear scene
        while(this.scene.children.length > 0) { 
            this.scene.remove(this.scene.children[0]); 
        }
        
        // Add lighting
        const ambientLight = new THREE.AmbientLight(0x404040);
        this.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(1, 1, 1);
        this.scene.add(directionalLight);
        
        // Create frequency bars
        this.bars = [];
        const barCount = 128; // More bars for better frequency resolution
        const radius = 10;
        
        // Create a circular array of bars
        for (let i = 0; i < barCount; i++) {
            const angle = (i / barCount) * Math.PI * 2;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            // Create bar geometry
            const geometry = new THREE.BoxGeometry(0.2, 0.2, 1);
            
            // Color based on position (rainbow spectrum)
            const hue = i / barCount;
            const color = new THREE.Color().setHSL(hue, 0.9, 0.6);
            
            const material = new THREE.MeshPhongMaterial({
                color: color,
                emissive: color,
                emissiveIntensity: 0.5,
                specular: 0x111111,
                shininess: 30,
                transparent: true,
                opacity: 0.9
            });
            
            const bar = new THREE.Mesh(geometry, material);
            bar.position.set(x, y, 0);
            bar.rotation.z = angle + Math.PI/2;
            
            // Store original position for animation
            bar.userData = {
                originalZ: 0,
                angle: angle
            };
            
            this.scene.add(bar);
            this.bars.push(bar);
        }
        
        // Create central sphere
        const sphereGeometry = new THREE.SphereGeometry(3, 32, 32);
        const sphereMaterial = new THREE.MeshPhongMaterial({
            color: 0x00bfff,
            emissive: 0x0066cc,
            emissiveIntensity: 0.5,
            specular: 0x111111,
            shininess: 30,
            transparent: true,
            opacity: 0.8
        });
        this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        this.scene.add(this.sphere);
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Get frequency data
        const bufferLength = this.analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        this.analyser.getByteFrequencyData(dataArray);
        
        // Calculate average frequency
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
            sum += dataArray[i];
        }
        const average = sum / bufferLength;
        const scaledAverage = average / 255;
        
        // Animate bars based on frequency data
        this.bars.forEach((bar, i) => {
            // Get frequency value for this bar
            const frequencyIndex = Math.floor((i / this.bars.length) * bufferLength);
            const frequencyValue = dataArray[frequencyIndex] / 255;
            
            // Scale bar height based on frequency
            const scaleZ = 1 + frequencyValue * 10;
            bar.scale.z = scaleZ;
            
            // Add pulsing effect
            const pulse = Math.sin(Date.now() * 0.002 + i * 0.1) * 0.2;
            bar.position.z = bar.userData.originalZ + pulse;
            
            // Add color variation
            const material = bar.material;
            const hue = (i / this.bars.length + Date.now() * 0.0001) % 1;
            material.color.setHSL(hue, 0.9, 0.6);
            material.emissive.setHSL(hue, 0.9, 0.3);
        });
        
        // Animate sphere
        this.sphere.scale.set(
            1 + scaledAverage * 0.5,
            1 + scaledAverage * 0.5,
            1 + scaledAverage * 0.5
        );
        
        // Rotate entire scene slowly
        this.scene.rotation.y += 0.001;
        
        this.renderer.render(this.scene, this.camera);
    }
    
    onWindowResize() {
        this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    }
}