function getFilePath(fileName: string, width: number, height: number) {
  return `${process.cwd()}/src/assets/lib/${fileName}-${width}-${height}.jpeg`;
}

export { getFilePath };
