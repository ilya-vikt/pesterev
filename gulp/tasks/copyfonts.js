export const copyFonts = () => {
  return app.gulp
    .src(`${app.path.tempFolder}/fonts/*.{woff,woff2}`, { allowEmpty: true })
    .pipe(app.gulp.dest(app.path.build.fonts));
};
