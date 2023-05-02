import fs from 'fs';
import Path from 'path';
import { readdir } from 'fs/promises';
import fonter from 'gulp-fonter-2';
import ttf2woff2 from 'gulp-ttf2woff2';
import { deleteAsync } from 'del';

export const otfToTtf = () => {
  return app.gulp
    .src(`${app.path.src.fonts}/*.otf`)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'FONTS',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(
      fonter({
        formats: ['ttf'],
      })
    )
    .pipe(app.gulp.dest(`${app.path.src.fonts}/`));
};

export const ttfToWoff = () => {
  return app.gulp
    .src(`${app.path.src.fonts}/*.ttf`, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'FONTS',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(
      fonter({
        formats: ['woff'],
      })
    )
    .pipe(app.gulp.dest(`${app.path.src.assetsFolder}/fonts/`));
};

export const ttfToWoff2 = () => {
  return app.gulp
    .src(`${app.path.src.fonts}/*.ttf`, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'FONTS',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(ttf2woff2())
    .pipe(app.gulp.dest(`${app.path.src.assetsFolder}/fonts/`));
};

export async function clearFontFolder() {
  await deleteAsync([
    `${app.path.src.assetsFolder}/fonts/*.woff`,
    `${app.path.src.assetsFolder}/fonts/*.woff2`,
  ]);
}

export const fontsStyle = async () => {
  const fontWeightTemplates = {
    thin: 100,
    extralight: 200,
    light: 300,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    heavy: 800,
    black: 900,
    thinitalic: 100,
    extralightitalic: 200,
    lightitalic: 300,
    mediumitalic: 500,
    semibolditalic: 600,
    bolditalic: 700,
    extrabolditalic: 800,
    heavyitalic: 800,
    blackitalic: 900,
  };

  const fontsFile = `${app.path.srcFolder}/common/fonts.scss`;

  if (fs.existsSync(fontsFile)) {
    console.warn(
      'Файл scss/fonts.scss уже существует. Для обновления файла нужно его удалить!'
    );
  } else {
    try {
      const fontFiles = await readdir(`${app.path.src.assetsFolder}/fonts`);
      const uniqFiles = new Set(
        fontFiles.map((fontFile) => Path.parse(fontFile).name)
      );

      uniqFiles.forEach((fontFileName) => {
        const fontFamily = fontFileName.split('-')[0];
        const fontWeightName = fontFileName.split('-')[1].toLowerCase();
        const fontWeight = fontWeightTemplates[fontWeightName] || 400;
        const isItalic = fontWeightName?.includes('italic') || false;
        const appendText =
          `@font-face {\r\n` +
          `  font-family: ${fontFamily};\r\n` +
          `  font-display: swap;\r\n` +
          `  src: url("../assets/fonts/${fontFileName}.woff2") format("woff2"), url("../assets/fonts/${fontFileName}.woff") format("woff");\r\n` +
          `  font-weight: ${fontWeight};\r\n` +
          `  font-style: ${isItalic ? 'italic' : 'normal'};\r\n` +
          `}\r\n\r\n`;

        fs.appendFile(fontsFile, appendText, (err) => {
          if (err) throw err;
        });
      });
    } catch (err) {
      console.error('Не удалось пересоздать файл подключения шрифтов: ', err);
    }
  }
};
