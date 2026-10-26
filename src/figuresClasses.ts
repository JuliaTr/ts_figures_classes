type Shape = 'triangle' | 'circle' | 'rectangle';
type Color = 'red' | 'green' | 'blue';

export interface Figure {
  shape: Shape;
  color: Color;

  getArea(): number;
}

export class Triangle implements Figure {
  public shape: Shape = 'triangle';

  readonly sides: number[];

  readonly sortedSides: number[];

  readonly longestSide: number;

  readonly sumSides: number;

  constructor(
    public color: Color,
    public a: number,
    public b: number,
    public c: number,
  ) {
    this.sides = [this.a, this.b, this.c];
    this.sortedSides = this.sortSides();
    this.longestSide = this.getLongestSide();
    this.sumSides = this.sumTwoSides();

    const hasInvalidSide: boolean = this.sides.some(
      (side: number) => side <= 0,
    );

    if (hasInvalidSide) {
      throw new Error('All sides should be greater than 0.');
    }

    if (this.longestSide >= this.sumSides) {
      throw new Error(
        `Sides ${this.a}, ${this.b}, ${this.c} cannot form a ${this.shape}.`,
      );
    }
  }

  private sortSides(): number[] {
    this.sides.sort((a: number, b: number) => a - b);

    return this.sides;
  }

  private getLongestSide(): number {
    return this.sortedSides[2];
  }

  private sumTwoSides(): number {
    return this.sortedSides[0] + this.sortedSides[1];
  }

  getArea(): number {
    const s: number = (this.longestSide + this.sumSides) / 2;
    const triangleArea: number = Math.sqrt(
      s * (s - this.a) * (s - this.b) * (s - this.c),
    );

    return Math.floor(triangleArea * 100) / 100;
  }
}

// export class Circle implements Figure {
//   public shape: Shape = 'circle';

//   constructor(
//     public color: Color,
//     public radius: number,
//   ) {}

//   getArea(): number {
//     return 2 * Math.PI * this.radius;
//   }
// }

// export class Rectangle implements Figure {
//   constructor(shape: number, color: string, width, height) {}

//   // if (width <= 0 || height <= 0) {
//   //   throw new Error("Width and height should be greater than 0.");
//   // }
// }

// export function getInfo(figure: Figure): string {
//   return typeof figure;
// }

// // new Rectangle('blue', 2, 0) // throws an error
// new Triangle('red', 1, 2, 3);
// // throws an error: sides 1, 2 and 3 can't form a triangle

// const redRectangle = new Rectangle('red', 3, 5);
// getInfo(redRectangle) === 'A red rectangle - 15';

// const greenCircle = new Circle('green', 1);
// getInfo(greenCircle) === 'A green circle - 3.14';
