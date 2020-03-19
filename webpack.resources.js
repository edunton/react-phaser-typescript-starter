const md5File = require('md5-file');
const path = require('path');
const chalk = require('chalk');

module.exports = ({
  base,
  packPaths
})=>{
  const phaserPackPaths = packPaths || [
    './assets/pack.json'
  ]
  
  const phaserPacks = phaserPackPaths.map(x=>{
      return {
          obj:require(x),
          path:x
      }
  });
  
  let resources = []
  let packs = [];
  for (const pack of phaserPacks) {
    for (const key in pack.obj) {
      if (!pack.obj.hasOwnProperty(key)) continue;
      if(pack.obj[key].files && pack.obj[key].files.length){
        for(let file of pack.obj[key].files){
          if(file.url){
            let p = file.url[0] === '/' ? file.url.slice(1) : file.url;
            let dir = path.join('.',path.dirname(p))
            resources.push({
              from:p,
              to:dir
            });
            let hash = md5File.sync(p);
            console.log(chalk`{greenBright ${p}} -> {magenta ${hash}}`);
            file.url += `?${hash}`;
          }
        }
      }
    }
  
    packs.push({
        path:path.join(base, path.dirname(pack.path)),
        fileName:path.basename(pack.path),
        content:JSON.stringify(pack.obj),
    })
  }
  
  //md5File.sync()
  
  return {
      copy:[
          ...resources,
          {from:'assets/text/**', to:"."},
          {from:'favicon.ico',to:"."}
      ],
      write:packs
  }
}