import type Quadtree from "@timohausmann/quadtree-js";
import type { boids } from "../boids";
import type { obstacle } from "../obstacle";
import { angleBetween2Points } from "$lib/utils";

export function rulesHandler(elementList: boids[], elementQuadTree: Quadtree, obstacleList: obstacle[], delta: number, border: boolean) {
    for (let i = 0; i < elementList.length; i++) {
        const element = elementList[i];

        /**
         *  Custom rule: avoid screen border
         */
        if (border)
            elementList = boidRuleCustomBorder(elementList, i, elementQuadTree, delta);

        //custom rule: avoid obstacle
        elementList = boidRuleCustomObstacle(elementList, i, elementQuadTree, obstacleList, delta);

        //rule 1
        elementList = boidRule1(elementList, i, elementQuadTree, delta);

        //rule 3
        elementList = boidRule3(elementList, i, elementQuadTree, delta);


        //Custom rule: rival
        elementList = boidRuleCustomRival(elementList, i, elementQuadTree, delta);

        //rule 2
        elementList = boidRule2(elementList, i, elementQuadTree, delta);

        //rule 3


        //done
        element.update(delta, border);
    }

    elementQuadTree.clear();
    elementList.forEach((element) => {
        elementQuadTree.insert(element);
    });

}


/*
 *
 *   Function that handle rules
 *
*/


/**
 *
 *  Rule 1 Separation: boids avoid colides eachother
 *
 */

function boidRule1(elementList: boids[], elementId: number, elementQuadTree: Quadtree, delta: number) {
    //get element inside nodes
    const element = elementList[elementId];

    if (element.ignoreRule1)
        return elementList;

    const intersectElement = elementQuadTree.retrieve({
        x: element.element.x - element.visionRadius / 2,
        y: element.element.y - element.visionRadius / 2,
        width: element.visionRadius,
        height: element.visionRadius
    });

    intersectElement.forEach((nodeElement) => {
        if (nodeElement.x === element.element.x && nodeElement.y === element.element.y) return;

        //check collision
        const distance = Math.sqrt(
            Math.pow(element.element.x - nodeElement.x, 2) +
            Math.pow(element.element.y - nodeElement.y, 2)
        );

        //first rule
        if (distance < element.visionRadius) {
            //get angle of the element and the current element
            const current_element_angle = angleBetween2Points(
                element.element.x,
                element.element.y,
                nodeElement.x,
                nodeElement.y
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
                // element.velocity = 0.8;
                element.setAngle(element.getAngle() + delta * 5);
                //element.element.tint = 0x0000ff;
            }
            //if other boids on the right, turn left by 5deg
            else if (delta_angle >= -element.visionAngle && delta_angle <= 0) {
                // element.velocity = 0.8;
                element.setAngle(element.getAngle() + delta * -5);
                //element.element.tint = 0xff0000;
            } else {
                element.velocity = 1;
                //element.element.tint = 0xffffff;
            }
        }


    });

    return elementList;
}

/**
 *  Rule 2 Alignment: boids with same type will try to move the same direction
 */
function boidRule2(elementList: boids[], elementId: number, elementQuadTree: Quadtree, delta: number) {
    const element = elementList[elementId];

    if (element.ignoreRule2)
        return elementList;

    const intersectElement = elementQuadTree.retrieve({
        x: element.element.x - element.localRadius / 2,
        y: element.element.y - element.localRadius / 2,
        width: element.localRadius,
        height: element.localRadius
    });
    //rule 2 vars
    let boidsAngleSum = element.getAngle();
    let boidsVelocitySum = element.speed;
    let boidsLocalCount = 1;

    intersectElement.forEach((nodeElement) => {
        if (nodeElement.x === element.element.x && nodeElement.y === element.element.y) return;

        //seccond rule of boids

        //check collision
        const distance = Math.sqrt(
            Math.pow(element.element.x - nodeElement.x, 2) +
            Math.pow(element.element.y - nodeElement.y, 2)
        );

        const nodeElementBoids = nodeElement as boids;
        if (distance < element.localRadius && element.boidType == nodeElementBoids.boidType) {
            boidsAngleSum += nodeElementBoids.getAngle();
            boidsVelocitySum += nodeElementBoids.speed;
            boidsLocalCount++;
        }
    });

    //rule 2 update: add avg angle of all nearby boids to self
    if (boidsLocalCount > 1) {
        element.setAngle(
            element.getAngle() +
            (boidsAngleSum / boidsLocalCount - element.getAngle()) * 0.05 * delta
        );

        const avgVelocity = boidsVelocitySum / boidsLocalCount;

        element.velocity = avgVelocity / element.speed;
    }
    else {
        element.velocity = 1;
    }

    return elementList
}

/**
 *
 *  Rule 3 Cohesion: boids with same type will move towrad the center of the boid's flock
 *
*/

function boidRule3(elementList: boids[], elementId: number, elementQuadTree: Quadtree, delta: number) {
    const element = elementList[elementId];

    if (element.ignoreRule3)
        return elementList;

    const intersectElement = elementQuadTree.retrieve({
        x: element.element.x - element.localRadius / 2,
        y: element.element.y - element.localRadius / 2,
        width: element.localRadius,
        height: element.localRadius
    });
    //rule 2 vars
    let boidSumX = element.x;
    let boidSumY = element.y;
    let boidsLocalCount = 1;

    intersectElement.forEach((nodeElement) => {
        if (nodeElement.x === element.element.x && nodeElement.y === element.element.y) return;

        //check collision
        const distance = Math.sqrt(
            Math.pow(element.element.x - nodeElement.x, 2) +
            Math.pow(element.element.y - nodeElement.y, 2)
        );

        const nodeElementBoids = nodeElement as boids;
        if (distance < element.flockRadius && element.boidType == nodeElementBoids.boidType) {
            boidSumX += nodeElementBoids.x;
            boidSumY += nodeElementBoids.y;
            boidsLocalCount++;
        }
    });

    if (boidsLocalCount > 1) {

        const avgX = boidSumX / boidsLocalCount;
        const avgY = boidSumY / boidsLocalCount;

        const angle_between_avgpoint_and_element = angleBetween2Points(
            element.element.x,
            element.element.y,
            avgX,
            avgY
        )
        let delta_angle = element.getAngleCounterClockwise() - angle_between_avgpoint_and_element;
        //always use smaller angle
        if (delta_angle > 180) {
            delta_angle = delta_angle - 360;
        }

        if (delta_angle < -180) {
            delta_angle = delta_angle + 360;
        }

        element.setAngle(
            element.getAngle() + delta_angle * 0.01 * delta
        )
    }

    return elementList
}

//custom rule: avoid obstacle
function boidRuleCustomObstacle(elementList: boids[], elementId: number, elementQuadTree: Quadtree, obstacleList: obstacle[], delta: number) {
    const element = elementList[elementId]

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

    return elementList
}

/**
 * Custom rule : different boids will avoid each other
 */
function boidRuleCustomRival(elementList: boids[], elementId: number, elementQuadTree: Quadtree, delta: number) {
    const element = elementList[elementId];

    if (element.ignoreRuleRival)
        return elementList;

    const intersectElement = elementQuadTree.retrieve({
        x: element.element.x - element.visionRadius / 2,
        y: element.element.y - element.visionRadius / 2,
        width: element.rivalRadius,
        height: element.rivalRadius
    });
    //custom rule: rival avoid
    //
    intersectElement.forEach((nodeElement) => {
        if (nodeElement.x === element.element.x && nodeElement.y === element.element.y) return;

        const distance = Math.sqrt(
            Math.pow(element.element.x - nodeElement.x, 2) +
            Math.pow(element.element.y - nodeElement.y, 2)
        );

        if (
            distance < element.rivalRadius &&
            element.boidType != (nodeElement as boids).boidType
        ) {
            //get angle of the element and the current element
            const current_element_angle = angleBetween2Points(
                element.element.x,
                element.element.y,
                nodeElement.x,
                nodeElement.y
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
                // element.velocity = 0.8;
                element.setAngle(element.getAngle() + delta * 5);
                //element.element.tint = 0x0000ff;
            }
            //if other boids on the right, turn left by 5deg
            else if (delta_angle >= -element.visionAngle && delta_angle <= 0) {
                // element.velocity = 0.8;
                element.setAngle(element.getAngle() + delta * -5);
                //element.element.tint = 0xff0000;
            } else {
                element.velocity = 1;
                //element.element.tint = 0xffffff;
            }
        }
    });

    return elementList
}

/**
 * Custom rule: avoid screen border
 */

function boidRuleCustomBorder(elementList: boids[], elementId: number, elementQuadTree: Quadtree, delta: number) {
    const element = elementList[elementId];

    //0 - 360
    const angle = element.getAngle()
    let triggers = false

    /**
     *          | y
     *        -----
     *          |
    */
    if (angle < 90) {
        const distanceY = Math.abs(element.y - element.minY)
        const distanceX = Math.abs(element.x - element.maxX)

        if (distanceY < element.visionRadius) {
            element.velocity = 0.1
            element.setAngle(angle + 10 * delta)
            triggers = true
        }

        if (distanceX < element.visionRadius) {
            element.velocity = 0.1
            element.setAngle(angle - 10 * delta)
            triggers = true
        }

    }

    /**
     *          |
     *        -----
     *          | y
    */
    if (angle >= 90 && angle < 180) {
        const distanceY = Math.abs(element.y - element.maxY)
        const distanceX = Math.abs(element.x - element.maxX)

        if (distanceY < element.visionRadius) {
            element.velocity = 0.1
            element.setAngle(angle - 10 * delta)
            triggers = true
        }

        if (distanceX < element.visionRadius) {
            element.velocity = 0.1
            element.setAngle(angle + 10 * delta)
            triggers = true
        }

    }

    /**
         *          |
         *        -----
         *        Y |
        */
    if (angle >= 180 && angle < 270) {
        const distanceY = Math.abs(element.y - element.maxY)
        const distanceX = Math.abs(element.x - element.minX)


        if (distanceY < element.visionRadius) {
            element.velocity = 0.1
            element.setAngle(angle + 10 * delta)
            triggers = true
        }

        if (distanceX < element.visionRadius) {
            element.velocity = 0.1
            element.setAngle(angle - 10 * delta)
            triggers = true
        }

    }

    /**
             *        y |
             *        -----
             *          |
            */
    if (angle >= 270 && angle < 360) {
        const distanceY = Math.abs(element.y - element.minY)
        const distanceX = Math.abs(element.x - element.minX)

        if (distanceY < element.visionRadius) {
            element.velocity = 0.1
            element.setAngle(angle - 10 * delta)
            triggers = true
        }

        if (distanceX < element.visionRadius) {
            element.velocity = 0.1
            element.setAngle(angle + 10 * delta)
            triggers = true
        }

    }

    if (triggers) {
        element.ignoreRule1 = true
        element.ignoreRule2 = true
        element.ignoreRuleRival = true
        //element.element.tint = 0xaaaaaa
    }
    else {
        element.velocity = 1
        element.ignoreRule1 = false
        element.ignoreRule2 = false
        element.ignoreRuleRival = false
        //element.element.tint = 0xffffff
    }

    return elementList
}