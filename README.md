# Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- `npm run dev` to start the local server with auto compiling

Open `http://localhost:3000/api/images?fileName=encenadaport&width=100&height=200`

in the browser / call from postman to view the image; change the query params as necessary
Refreshing the page any number of times will return the pregenerated image
More images can be added to `/assets` folder to use from the api

All generated images are in the `/assets/lib` folder

Image can also be viewed in `png` format by including `fileType=png` param
Example : `http://localhost:3000/api/images?fileName=encenadaport&width=100&height=200&fileType=png`

## Other scripts

- `npm run test` to run unit tests
- `npm run clean-code` to fix linting and formatting errors
- `npm run build` to run transpiling from ts to js