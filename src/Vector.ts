/**
 * Represents a vector in 2D space.
 * Instance methods mutate the instance itself,
 * while static methods return a new vector.
 * Also can represent a point.
 */
export default class Vector {
    public x: number;
    public y: number;

    /**
     * @param x The x coordinate.
     * @param y The y coorindate.
     */
    constructor(x: number, y: number) {
        this.x = x || 0;
        this.y = y || 0;
    }

    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
    }

    /**
     * Negates this instance's x and y coordinate.
     * @see Vector.negate
     */
    public negate() {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }

    /**
     * Adds a vector or scalar to this instance.
     * @param v Vector or scalar to add.
     */
    public add(v: Vector | number) {
        if (v instanceof Vector) {
            this.x += v.x;
            this.y += v.y;
        } else {
            this.x += v;
            this.y += v;
        }
        return this;
    }

    /**
     * Subtracts a vector or scalar from this instance.
     * @param v Vector or scalar to subtract.
     */
    public subtract(v: Vector | number) {
        if (v instanceof Vector) {
            this.x -= v.x;
            this.y -= v.y;
        } else {
            this.x -= v;
            this.y -= v;
        }
        return this;
    }

    /**
     * Multiplies this vector by another vector or scalar.
     * @param v Vector or scalar to multiply by.
     */
    public multiply(v: Vector | number) {
        if (v instanceof Vector) {
            this.x *= v.x;
            this.y *= v.y;
        } else {
            this.x *= v;
            this.y *= v;
        }
        return this;
    }

    /**
     * Divides this vector by another vector or scalar.
     * @param v Vector or scalar to divide by.
     */
    public divide(v: Vector | number) {
        if (v instanceof Vector) {
            if (v.x != 0) this.x /= v.x;
            if (v.y != 0) this.y /= v.y;
        } else {
            if (v != 0) {
                this.x /= v;
                this.y /= v;
            }
        }
        return this;
    }

    /**
     * Gets the dot product of this vector and another vector.
     * @param v Other vector to use.
     * @see Vector.cross
     */
    public dot(v: Vector) {
        return this.x * v.x + this.y * v.y;
    }

    /**
     * Gets the cross product of this vector and another vector.
     * @param v Other vector to use
     * @see Vector.dot
     */
    public cross(v: Vector) {
        return this.x * v.y - this.y * v.x;
    }

    /**
     * The magnitude or length of this vector.
     */
    public get magnitude() {
        return Math.sqrt(this.dot(this));
    }

    /**
     * Normalized version of this vector.
     */
    public get normalized() {
        return this.divide(this.magnitude);
    }

    /**
     * Angle this vector represents in radians.
     */
    public get angle() {
        return -Math.atan2(-this.y, this.x);
    }

    /**
     * Angle to the other vector.
     * @param a Vector to compare.
     */
    public angleTo(a: Vector) {
        return Math.acos(Math.min(this.dot(a) / (this.magnitude * a.magnitude), 1));
    }

    /**
     * Clones this vector.
     */
    public clone() {
        return new Vector(this.x, this.y);
    }

    /**
     * Negates a vector without mutating it.
     * @param v Vector to negate.
     */
    public static negate(v: Vector) {
        return new Vector(-v.x, -v.y);
    }

    /**
     * Adds a vector or scalar to another without mutating it.
     * @param a Vector to operate on.
     * @param b Vector or number to add.
     */
    public static add(a: Vector, b: Vector | number) {
        if (b instanceof Vector) return new Vector(a.x + b.x, a.y + b.y);
        else return new Vector(a.x + b, a.y + b);
    }

    /**
     * Subtracts a vector or scalar from another without mutating it.
     * @param a Vector to operate on.
     * @param b Vector or number to subtract.
     */
    public static subtract(a: Vector, b: Vector | number) {
        if (b instanceof Vector) return new Vector(a.x - b.x, a.y - b.y);
        else return new Vector(a.x - b, a.y - b);
    }

    /**
     * Multiplies a vector by another vector or scalar without mutating it.
     * @param a Vector to operate on.
     * @param b Vector or number to multiply.
     */
    public static multiply(a: Vector, b: Vector | number) {
        if (b instanceof Vector) return new Vector(a.x * b.x, a.y * b.y);
        else return new Vector(a.x * b, a.y * b);
    }

    /**
     * Divides a vector by another vector or scalar without mutating it.
     * @param a Vector to operate on.
     * @param b Vector or number to divide.
     */
    public static divide(a: Vector, b: Vector | number) {
        if (b instanceof Vector) return new Vector(a.x / b.x, a.y / b.y);
        else return new Vector(a.x / b, a.y / b);
    }

    /**
     * The dot product of both vectors.
     * @param a A vector.
     * @param b Another vector.
     */
    public static dot(a: Vector, b: Vector) {
        return a.x * b.x + a.y * b.y;
    }

    /**
     * The cross product of both vectors
     * @param a A vector.
     * @param b Another vector.
     */
    public static cross(a: Vector, b: Vector) {
        return a.x * b.y - a.y * b.x;
    }
}
