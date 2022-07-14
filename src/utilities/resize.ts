import { NextFunction } from 'express';
import sharp from 'sharp';
import { existsSync } from 'fs';

const APP_DIR = process.cwd();

export type FileType = 'png' | 'jpeg';

async function createResizedFile(
  fileName: string,
  width: number,
  height: number,
  next: NextFunction,
  fileType: FileType | null = 'jpeg'
) {
  if (
    !existsSync(
      `${APP_DIR}/assets/lib/${fileName}-${width}-${height}.${fileType}`
    )
  ) {
    let sharpFn;
    if (fileType === 'jpeg') {
      sharpFn = sharp(`${APP_DIR}/assets/${fileName}.jpeg`).resize(
        width,
        height
      );
    } else {
      sharpFn = sharp(`${APP_DIR}/assets/${fileName}.jpeg`)
        .resize(width, height)
        .toFormat(fileType as unknown as sharp.AvailableFormatInfo);
    }
    await sharpFn.toFile(
      `${APP_DIR}/assets/lib/${fileName}-${width}-${height}.${fileType}`,
      next
    );
    console.log(
      `image created : \n${APP_DIR}/assets/lib/${fileName}-${width}-${height}.${fileType}`
    );
  } else {
    console.log(
      `using existing image : \n${APP_DIR}/assets/lib/${fileName}-${width}-${height}.${fileType}`
    );
    next();
  }
}

function fileExists(fileName: string) {
  return existsSync(`${APP_DIR}/assets/${fileName}.jpeg`);
}

export default { createResizedFile, fileExists };
