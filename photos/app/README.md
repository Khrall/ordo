# Photos App

## Getting Started

Install dependencies with

```
yarn
```

Then run the Electron App with

```
yarn start
```

## Quick Primer

The Electron app is compiled using [electron-compile](https://github.com/electron-userland/electron-compile). This allows us to use `electron .` to start the Electron app and use TypeScript instead of normal JavaScript, and also compiles our React code properly. It has some limitations, but makes the basic use case much simpler to set up.

The important stuff in file structure currently looks like this:

```
package.json
.compilerc
tsconfig.json
tslint.json
src/
  ├── main.ts
  ├── index.html
  ├── index.tsx
  ├── App.tsx
  └── styled-components/
```

**package.json**

You can see that the `start` script simply runs `electron .`, using `"main": "src/main.ts"` as entry-point. Note that using a TypeScript file as entry-point would not be possible without `electron-compile`. (See [Electron - First App](https://electronjs.org/docs/tutorial/first-app) for standard approach).

**.compilerc**

A pretty bare-minimum config for allowing us to use React with hot-reloading in our app. This is consumed by `electron-compile` (which in turn uses `babel`).

**tsconfig.json/tslint.json**

These configs are NOT necessary for the app to compile, but are used in order for Visual Studio Code to properly give us code hinting etc.

**main.ts**

The Electron App entrypoint. This is the file run by the Main process (see [Electron - Main and Renderer processes](https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes)).

**index.html**

The file that is initially loaded into our `BrowserWindow` by `main.ts`. This is where the React app is loaded from.

**index.tsx**

The entry-point for our React application. This file is NOT hot-reloaded, but can be reloaded with `CMD + R`.

**App.tsx**

The entry-point for the hot-reloaded part of our React application. Any changes made from this point should be reloaded whenever you save a file.

**styled-components**

See [Styled Components](https://www.styled-components.com/). The reason I decided to go for this is because there's a lot of setup involved to get SCSS working here. It used to work out of the box, but not anymore: https://github.com/electron-userland/electron-compile/issues/306

