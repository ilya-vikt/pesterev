//Получим имя папки проекта
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./dist`;
const srcFolder = `./src`;

export const path = {
  build: {
    assets: `${buildFolder}/assets/`,
    html: `${buildFolder}/`,
    css: `${buildFolder}/css/`,
    js: `${buildFolder}/js/`,
    images: `${buildFolder}/img/`,
    fonts: `${buildFolder}/assets/fonts/`,
    sprite: `${buildFolder}/icons/`,
  },
  src: {
    assetsFolder: `${srcFolder}/assets`,
    html: `${srcFolder}/*.html`,
    scss: `${srcFolder}/style.scss`,
    js: `${srcFolder}/ts/app.ts`,
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
    svg: `${srcFolder}/img/**/*.svg`,
    svgicons: `${srcFolder}/svgicons/*.svg`,
    fonts: `${srcFolder}/assets/fonts`,
  },
  watch: {
    assets: `${srcFolder}/assets/**/*.*`,
    html: [
      `${srcFolder}/common/**/*.html`,
      `${srcFolder}/components/**/*.html`,
      `${srcFolder}/*.html`,
    ],
    scss: [
      `${srcFolder}/common/**/*.scss`,
      `${srcFolder}/libs/**/*.scss`,
      `${srcFolder}/components/**/*.scss`,
      `${srcFolder}/style.scss`,
    ],
    js: [
      `${srcFolder}/ts/**/*.ts`,
      `${srcFolder}/libs/**/*.ts`,
      `${srcFolder}/components/**/*.ts`,
      `${srcFolder}/common/**/*.ts`,
    ],
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,svg,ico}`,
  },
  clean: buildFolder,
  buildFolder,
  srcFolder,
  rootFolder,
  ftp: ``,
};
