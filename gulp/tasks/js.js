import webpack from 'webpack-stream';
import path from 'path';

export const js = () => {
  return app.gulp
    .src(app.path.src.js, { sourcemaps: app.isDev })
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'JS',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(
      webpack({
        mode: app.isBuild ? 'production' : 'development',
        output: {
          filename: 'app.min.js',
        },
        resolve: {
          extensions: ['.ts', '.js'],
          alias: {
            '@': path.resolve('src/'),
            '@ts': path.resolve('src/ts'),
          },
        },
        module: {
          rules: [
            {
              test: /\.ts$/,
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-typescript'],
                plugins: ['@babel/plugin-proposal-class-properties'],
              },
            },
          ],
        },
      })
    )
    .pipe(app.gulp.dest(app.path.build.js))
    .pipe(app.plugins.browserSync.stream());
};
