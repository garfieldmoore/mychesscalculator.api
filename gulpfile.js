var gulp=require('gulp');
var nodemon=require('nodemon');
gulp.task('default', function(){
  nodemon({
    script: 'server.js',
    ext:'js',
    ignore:['./node_modules/**']
  })
  .on('restart', ()=>console.log("Restarting..."))
});
