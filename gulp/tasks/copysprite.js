export const copySprite = () => {
  return app.gulp
    .src(`${app.path.tempFolder}/sprite/sprite.svg`, { allowEmpty: true })
    .pipe(app.gulp.dest(app.path.build.assets));
};
