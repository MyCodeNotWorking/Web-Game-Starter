class CCD {
    constructor() {
        this.response = new SAT.Response();
    }

    // Detect collision between two circles
    circleCircleCollision(circle1, circle2) {
        this.response.clear();
        let result = SAT.testCircleCircle(circle1, circle2, this.response);
        return { collided: result, response: this.response };
    }

    // Detect collision between two polygons
    polygonPolygonCollision(polygon1, polygon2) {
        this.response.clear();
        let result = SAT.testPolygonPolygon(polygon1, polygon2, this.response);
        return { collided: result, response: this.response };
    }

    // Detect collision between a circle and a polygon
    circlePolygonCollision(circle, polygon) {
        this.response.clear();
        let result = SAT.testCirclePolygon(circle, polygon, this.response);
        return { collided: result, response: this.response };
    }

    // Function to simulate continuous motion and check collisions (CCD logic)
    continuousCollisionDetection(shape1, shape2, velocity1, velocity2, steps = 10) {
        for (let i = 0; i < steps; i++) {
            // Move shapes incrementally
            shape1.pos.x += velocity1.x / steps;
            shape1.pos.y += velocity1.y / steps;
            shape2.pos.x += velocity2.x / steps;
            shape2.pos.y += velocity2.y / steps;

            // Check for collision
            let collisionResult;
            if (shape1 instanceof SAT.Circle && shape2 instanceof SAT.Circle) {
                collisionResult = this.circleCircleCollision(shape1, shape2);
            } else if (shape1 instanceof SAT.Polygon && shape2 instanceof SAT.Polygon) {
                collisionResult = this.polygonPolygonCollision(shape1, shape2);
            } else if (shape1 instanceof SAT.Circle && shape2 instanceof SAT.Polygon) {
                collisionResult = this.circlePolygonCollision(shape1, shape2);
            } else if (shape1 instanceof SAT.Polygon && shape2 instanceof SAT.Circle) {
                collisionResult = this.circlePolygonCollision(shape2, shape1);
            }

            // Return the result if a collision is detected
            if (collisionResult.collided) {
                return { collided: true, step: i, response: collisionResult.response };
            }
        }
        return { collided: false, step: steps, response: null };
    }
}

var ccd = new CCD();