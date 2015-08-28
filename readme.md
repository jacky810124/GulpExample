# Gulp
### 常用的Function
- 任務: ```gulp.task('task name', ['dept'], function) ```
```sh
//Gulp 預設會執行的任務
gulp.task('deafult', ['task name', 'task name']);
```
- 串接任務: ```gulp.pipe(function)```
```sh
//example code - 讀取檔案並寫入到新位置
gulp.src('project/style/index.css')
.pipe(gulp.dest('project/css/'));
```
- 讀取檔案: ```gulp.src('folder/folder/filename.js')```
```sh
gulp.src('example/somefile.js');
```
- 輸出檔案: ```gulp.dest('path')```
```sh
gulp.dest('where/you/want/to/save');
```
- 監聽： ```gulp.watch('folder/filename.js', function)```
```sh
//example code - 若project/css/下的css檔有變動，就執行 gulp.task('minify', function);
gulp.watch('project/css/*.css', ['minify']);
```

### 好用的Gulp plugin
- gulp-compass : Gulp的Compass，可以自動compile成css
- gulp-concat : 合併css
- gulp-minify-css ： 壓縮css
- gulp-rename : 重新命名
- gulp-uglify ： 壓縮javascript
- gulp-util : 可以印出詳細的gulp錯誤訊息
