import gulp from 'gulp';
import { path } from './gulp/config/path.js';
import { plugins } from './gulp/config/plugins.js';
import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import { sprite } from './gulp/tasks/sprite.js';
import { copySprite } from './gulp/tasks/copysprite.js';
import { otfToTtf, ttfToWoff, fontsStyle, clearTempFontFolder } from './gulp/tasks/fonts.js';
import { copyFonts } from './gulp/tasks/copyfonts.js';
import { server } from './gulp/tasks/server.js';
import { zip } from './gulp/tasks/zip.js';
import { ftp } from './gulp/tasks/ftp.js';

global.app = {
  path,
  gulp,
  plugins,
  isBuild: process.argv.includes('--build'),
  isDev: !process.argv.includes('--build'),
};

function watcher() {
  gulp.watch(path.watch.assets, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
}

const mainTasks = gulp.parallel(copy, copyFonts, copySprite, html, scss, js, images);

export const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
export const build = gulp.series(reset, mainTasks);
export const deployZIP = gulp.series(reset, mainTasks, zip);
export const deployFTP = gulp.series(reset, mainTasks, ftp);
export const makefonts = gulp.series(otfToTtf, clearTempFontFolder, ttfToWoff, fontsStyle);
export { sprite };

gulp.task('default', dev);
