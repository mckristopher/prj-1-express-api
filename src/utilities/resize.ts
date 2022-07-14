import { NextFunction } from 'express';
import sharp from 'sharp';
import { existsSync } from 'fs';

const APP_DIR = process.cwd();

async function createResizedFile(
    fileName: string,
    width: number,
    height: number,
    next: NextFunction
) {
    if (
        !existsSync(`${APP_DIR}/assets/lib/${fileName}-${width}-${height}.jpeg`)
    ) {
        await sharp(`${APP_DIR}/assets/${fileName}.jpeg`)
            .resize(width, height)
            .toFile(
                `${APP_DIR}/assets/lib/${fileName}-${width}-${height}.jpeg`,
                next
            );
        console.log(
            `image created : \n${APP_DIR}/assets/lib/${fileName}-${width}-${height}.jpeg`
        );
    } else {
        console.log(
            `using existing image : \n${APP_DIR}/assets/lib/${fileName}-${width}-${height}.jpeg`
        );
        next();
    }
}

export default createResizedFile;
