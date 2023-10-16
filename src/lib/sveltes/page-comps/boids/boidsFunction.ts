import { angleBetween2Points } from "$lib/utils";
import type { boids } from "./boids";
import type { obstacle } from "./obstacle";

function boidsUpdate(elementList: boids[], obstacleList: obstacle[], delta: number) {
    // delta is 1 if running at 100% performance
    for (let i = 0; i < elementList.length; i++) {
        const element = elementList[i];

        //check if other elements are in the radius facing of the element
        for (let j = 0; j < elementList.length; j++) {
            //rule 2 vars
            let boidsAngleSum = element.getAngle();
            let boidsLocalCount = 1;

            if (element != elementList[j]) {
                const currentElementX = elementList[j].element.x;
                const currentElementY = elementList[j].element.y;

                const distance = Math.sqrt(
                    Math.pow(element.element.x - currentElementX, 2) +
                    Math.pow(element.element.y - currentElementY, 2)
                );

                //first rules
                if (distance < element.visionRadius) {
                    //get angle of the element and the current element
                    const current_element_angle = angleBetween2Points(
                        element.element.x,
                        element.element.y,
                        currentElementX,
                        currentElementY
                    );

                    const element_angle = element.getAngleCounterClockwise();

                    let delta_angle = element_angle - current_element_angle;

                    //always use smaller angle
                    if (delta_angle > 180) {
                        delta_angle = delta_angle - 360;
                    }

                    if (delta_angle < -180) {
                        delta_angle = delta_angle + 360;
                    }

                    //per side
                    //if other boids on the left, turn right by 5deg
                    if (delta_angle <= element.visionAngle && delta_angle >= 0) {
                        element.velocity = 1;
                        element.setAngle(element.getAngle() + delta * 5);
                        //element.element.tint = 0x0000ff;
                    }
                    //if other boids on the right, turn left by 5deg
                    else if (delta_angle >= -element.visionAngle && delta_angle <= 0) {
                        element.velocity = 1;
                        element.setAngle(element.getAngle() + delta * -5);
                        //element.element.tint = 0xff0000;
                    }
                    else {
                        element.velocity = 1;
                    }
                    //else element.element.tint = 0xffffff;
                }

                //custom rule: avoid all different boids
                if (distance < element.rivalRadius && element.boidType != elementList[j].boidType) {
                    //get angle of the element and the current element
                    const current_element_angle = angleBetween2Points(
                        element.element.x,
                        element.element.y,
                        currentElementX,
                        currentElementY
                    );

                    const element_angle = element.getAngleCounterClockwise();

                    let delta_angle = element_angle - current_element_angle;

                    //always use smaller angle
                    if (delta_angle > 180) {
                        delta_angle = delta_angle - 360;
                    }

                    if (delta_angle < -180) {
                        delta_angle = delta_angle + 360;
                    }

                    //per side
                    //if other boids on the left, turn right by 5deg
                    if (delta_angle <= element.visionAngle && delta_angle >= 0) {
                        element.setAngle(element.getAngle() + delta * 5);
                    }
                    //if other boids on the right, turn left by 5deg
                    else if (delta_angle >= -element.visionAngle && delta_angle <= 0) {
                        element.setAngle(element.getAngle() + delta * -5);
                    }
                }

                //seccond rule of boids
                if (distance < element.localRadius && element.boidType == elementList[j].boidType) {
                    const current_element_angle = elementList[j].getAngle();

                    boidsAngleSum += current_element_angle;
                    boidsLocalCount++;
                }
            }

            //rule 2 update: add avg angle of all nearby boids to self
            if (boidsLocalCount > 1) {
                elementList[i].setAngle(
                    elementList[i].getAngle() +
                    (boidsAngleSum / boidsLocalCount - elementList[i].getAngle()) * 0.01 * delta
                );
            }
        }

        //rule 3, check if obstacle is in the radius facing of the element
        for (let j = 0; j < obstacleList.length; j++) {
            const obstacle = obstacleList[j];
            const distance = Math.sqrt(
                Math.pow(obstacle.x - element.element.x, 2) +
                Math.pow(obstacle.y - element.element.y, 2)
            );

            if (distance < obstacle.radius) {
                element.setAngle(element.getAngle() + delta * 180);
                break
            }

            if (distance < obstacle.radius + element.visionRadius) {
                const current_element_angle = angleBetween2Points(
                    element.element.x,
                    element.element.y,
                    obstacle.x,
                    obstacle.y
                );

                const element_angle = element.getAngleCounterClockwise();

                let delta_angle = element_angle - current_element_angle;

                //always use smaller angle
                if (delta_angle > 180) {
                    delta_angle = delta_angle - 360;
                }

                if (delta_angle < -180) {
                    delta_angle = delta_angle + 360;
                }

                //per side
                //if other boids on the left, turn right by 5deg
                //const delta_distance = Math.abs(obstacle.radius + element.visionRadius - distance);
                if (delta_angle <= element.visionAngle - 60 && delta_angle >= 0) {
                    element.velocity = 0.7;
                    element.setAngle(element.getAngle() + delta * 5);
                    //element.element.tint = 0x0000ff;
                }
                //if other boids on the right, turn left by 5deg
                else if (delta_angle >= -element.visionAngle + 60 && delta_angle <= 0) {
                    element.velocity = 0.7;
                    element.setAngle(element.getAngle() + delta * -5);
                    //element.element.tint = 0xff0000;
                }
                else {
                    element.velocity = 1;
                }
            }
        }

        elementList[i].update();
    }
}

export default boidsUpdate;