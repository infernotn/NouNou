import { useEffect, useRef } from 'react';
import { PARTICLE_COUNT, HEART_SIZE } from '../config';

export const ParticleSystem = ({ isCelebrated }) => {
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);
    const timeRef = useRef(0);
    const stateRef = useRef({ width: 0, height: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        class Particle {
            constructor() {
                this.setTarget();
                this.x = this.tx;
                this.y = this.ty;
                this.z = this.tz;
                this.vx = this.vy = this.vz = 0;
                this.friction = 0.92;
                this.size = Math.random() * 2;
                this.color = `hsl(${340 + Math.random() * 40},100%,60%)`;
            }

            setTarget() {
                const t = Math.random() * Math.PI * 2;
                const u = Math.random();
                const s = Math.pow(u, 1 / 3) * HEART_SIZE;

                const x = 16 * Math.pow(Math.sin(t), 3);
                const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
                const z = (Math.random() - 0.5) * 10;

                this.tx = x * s;
                this.ty = y * s;
                this.tz = z * s;
            }

            update(beat, isCelebrated) {
                if (isCelebrated) {
                    this.x += this.vx;
                    this.y += this.vy;
                    this.z += this.vz;
                    this.vx *= this.friction;
                    this.vy *= this.friction;
                    this.vz *= this.friction;
                } else {
                    const pulse = 1 + beat * 0.12;
                    this.x += (this.tx * pulse - this.x) * 0.1;
                    this.y += (this.ty * pulse - this.y) * 0.1;
                    this.z += (this.tz * pulse - this.z) * 0.1;
                }
            }

            draw(rx, ry, ctx, width, height) {
                let y1 = this.y * Math.cos(rx) - this.z * Math.sin(rx);
                let z1 = this.z * Math.cos(rx) + this.y * Math.sin(rx);
                let x1 = this.x * Math.cos(ry) - z1 * Math.sin(ry);
                let z2 = z1 * Math.cos(ry) + this.x * Math.sin(ry);

                const p = 500;
                const scale = p / (p + z2);
                if (scale < 0) return;

                const x2d = width / 2 + x1 * scale;
                const y2d = height / 2 + y1 * scale;

                ctx.beginPath();
                ctx.fillStyle = this.color;
                ctx.arc(x2d, y2d, this.size * scale, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const resize = () => {
            stateRef.current.width = canvas.width = window.innerWidth;
            stateRef.current.height = canvas.height = window.innerHeight;
        };

        resize();
        window.addEventListener('resize', resize);

        // Initialize particles
        particlesRef.current = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particlesRef.current.push(new Particle());
        }

        let rx = 0, ry = 0;
        const animate = () => {
            const { width, height } = stateRef.current;

            ctx.fillStyle = 'rgba(15,2,5,0.35)';
            ctx.fillRect(0, 0, width, height);

            timeRef.current += 0.02;
            const beat = Math.pow(Math.sin(timeRef.current * 3), 60) * 0.5;

            ry += 0.003;

            ctx.globalCompositeOperation = 'lighter';
            particlesRef.current.forEach((p) => {
                p.update(beat, isCelebrated);
                p.draw(rx, ry, ctx, width, height);
            });
            ctx.globalCompositeOperation = 'source-over';

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
        };
    }, [isCelebrated]);

    return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: 1, width: '100%', height: '100%' }} />;
};
