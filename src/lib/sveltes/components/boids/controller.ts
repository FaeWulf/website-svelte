type boidSpawnOption = "boid" | "obstacle" | "attract boids" | "repel boids" | "none";
type boidSettings = {
    speed: number;
    visionRadius: number;
    visionAngle: number;
    localRadius: number;
    rivalRadius: number;
    flockRadius: number;
}

export type { boidSpawnOption, boidSettings };