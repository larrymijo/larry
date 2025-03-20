document.addEventListener('DOMContentLoaded', function() {
    // Set up audio context and analyzers for each audio element
    const audioElements = document.querySelectorAll('audio');
    
    if (audioElements.length > 0) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        audioElements.forEach((audio, index) => {
            const canvas = document.getElementById(`visualizer${index + 1}`);
            if (!canvas) return;
            
            const ctx = canvas.getContext('2d');
            
            // Set canvas dimensions
            function resizeCanvas() {
                canvas.width = canvas.offsetWidth;
                canvas.height = canvas.offsetHeight;
            }
            
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);
            
            // Create audio source and analyzer
            const source = audioContext.createMediaElementSource(audio);
            const analyser = audioContext.createAnalyser();
            
            // Configure analyzer for better visualization
            analyser.fftSize = 512;
            analyser.smoothingTimeConstant = 0.85;
            
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            
            // Connect audio nodes
            source.connect(analyser);
            analyser.connect(audioContext.destination);
            
            // Animation variables
            let hueRotation = 0;
            
            // Draw function
            function draw() {
                requestAnimationFrame(draw);
                
                // Get frequency data
                analyser.getByteFrequencyData(dataArray);
                
                // Clear canvas with fade effect
                ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                // Calculate average frequency for effects
                let sum = 0;
                for (let i = 0; i < bufferLength; i++) {
                    sum += dataArray[i];
                }
                const average = sum / bufferLength;
                const scaledAverage = average / 256;
                
                // Update hue rotation based on audio
                hueRotation = (hueRotation + scaledAverage * 2) % 360;
                
                // Create blue sci-fi gradient
                const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
                gradient.addColorStop(0, "rgba(0, 191, 255, 0.9)");      // Deep sky blue
                gradient.addColorStop(0.3, "rgba(30, 144, 255, 0.9)");   // Dodger blue
                gradient.addColorStop(0.6, "rgba(0, 0, 255, 0.9)");      // Blue
                gradient.addColorStop(1, "rgba(138, 43, 226, 0.9)");     // Blue violet
                
                // Draw waveform bars similar to mini_meters but more vibrant
                const barWidth = 4;
                const barSpacing = 1;
                const barCount = Math.min(Math.floor(canvas.width / (barWidth + barSpacing)), bufferLength);
                const frequencyStep = Math.floor(bufferLength / barCount);
                
                for (let i = 0; i < barCount; i++) {
                    // Get frequency value for this bar
                    const frequencyIndex = i * frequencyStep;
                    let value = dataArray[frequencyIndex] / 255.0;
                    
                    // Apply some easing for smoother animation
                    value = Math.pow(value, 1.5);
                    
                    // Calculate bar height
                    const barHeight = value * canvas.height;
                    
                    // Calculate x position
                    const x = i * (barWidth + barSpacing);
                    
                    // Draw top bar (mirrored from the example image)
                    ctx.fillStyle = gradient;
                    ctx.fillRect(x, 0, barWidth, barHeight / 2);
                    
                    // Draw bottom bar (mirrored)
                    ctx.fillRect(x, canvas.height, barWidth, -barHeight / 2);
                    
                    // Add glow effect to bars
                    ctx.shadowBlur = 10 + value * 10;
                    ctx.shadowColor = 'rgba(0, 191, 255, 0.7)';
                }
                
                // Reset shadow
                ctx.shadowBlur = 0;
                
                // Note: Center line and dot have been removed as requested
            }
            
            // Start animation
            draw();
            
            // Handle play/pause
            audio.addEventListener('play', function() {
                if (audioContext.state === 'suspended') {
                    audioContext.resume();
                }
            });
        });
    }
});