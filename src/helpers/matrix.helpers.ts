import { random, transpose } from "mathjs";
export const rotateMatrix = (matrix: any) => {
  let transposedMatrix = transpose(matrix);
  let rotatedMatrix = transposedMatrix.map((row: any[]) => row.reverse());
  return rotatedMatrix;
};
export const rotateMatrixNegative = (matrix: any) => {
  let transposedMatrix = transpose(matrix);
  let rotatedMatrix = transposedMatrix.reverse();
  return rotatedMatrix;
};

export const shuffleMatrix = (matrix: any) => {
  const flatMatrix = matrix.flat();
  for (let i = flatMatrix.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [flatMatrix[i], flatMatrix[j]] = [flatMatrix[j], flatMatrix[i]];
  }
  const shuffledMatrix = [];
  for (let i = 0; i < matrix.length; i++) {
    shuffledMatrix.push(
      flatMatrix.slice(i * matrix[0].length, (i + 1) * matrix[0].length)
    );
  }
  return shuffledMatrix;
};
