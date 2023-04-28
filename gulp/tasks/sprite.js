import svgSprite from 'gulp-svg-sprite';

export const sprite = () => {
  return app.gulp
    .src(app.path.src.svgicons)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'SVG SPRITE',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(
      svgSprite({
        mode: {
          stack: {
            dest: `sprite`,
            sprite: `sprite.svg`,
            example: true,
            rootviewbox: false,
          },
        },
      })
    )
    .pipe(app.gulp.dest(app.path.tempFolder));
};
