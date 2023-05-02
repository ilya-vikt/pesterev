export const copy = () => {
  return app.gulp
    .src([
      `${app.path.src.assetsFolder}/**/*.*`,
      `!${app.path.src.assetsFolder}/**/*.{ttf,otf}`,
    ])
    .pipe(app.gulp.dest(app.path.build.assets));
};
