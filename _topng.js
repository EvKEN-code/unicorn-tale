const fs=require('fs'), path=require('path');
const {Resvg}=require('@resvg/resvg-js');
const dir=path.join(__dirname,'_preview');
for(const f of fs.readdirSync(dir).filter(x=>x.endsWith('.svg'))){
  try{
    const svg=fs.readFileSync(path.join(dir,f),'utf8');
    const r=new Resvg(svg,{fitTo:{mode:'width',value:760},background:'#ffffff'});
    fs.writeFileSync(path.join(dir,f.replace(/\.svg$/,'.png')), r.render().asPng());
    console.log('OK  '+f);
  }catch(e){ console.log('ERR '+f+' — '+e.message); }
}
