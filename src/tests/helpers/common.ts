function getFilePath(fileName: string, width: number, height: number) {
  return `${process.cwd()}/assets/lib/${fileName}-${width}-${height}.jpeg`;
}

export { getFilePath };
