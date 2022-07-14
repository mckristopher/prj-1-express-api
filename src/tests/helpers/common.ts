function getFilePath(fileName: string, width: number, height: number, fileType: string = 'jpeg'): string {
  return `${process.cwd()}/assets/lib/${fileName}-${width}-${height}.${fileType}`;
}

export { getFilePath };
