/* Сборка 3d.html: берёт ИСКУССТВО прямо из index.html, чтобы картинки не расходились.
   Вырезаются два куска: утилиты (секция A) и всё рисование (секции F..J). */
const fs=require('fs'), path=require('path');
const dir=__dirname;
const game=fs.readFileSync(path.join(dir,'index.html'),'utf8');
const tpl=fs.readFileSync(path.join(dir,'_3d_template.html'),'utf8');

function cut(from,to){
  const a=game.indexOf(from);
  const b=game.indexOf(to,a+1);
  if(a<0||b<0) throw new Error('не нашёл границу: '+from.slice(0,40)+' … '+to.slice(0,40));
  return game.slice(a,b);
}
const A=cut('/* =========================================================\n   A. УТИЛИТЫ',
            '/* =========================================================\n   B. ЗВУК');
const F=cut('/* =========================================================\n   F. РИСОВАНИЕ',
            '/* =========================================================\n   K. ЭКРАНЫ');

const art=(A+'\n'+F).replace(/^[\s\S]*?\*\//,'').trim();   /* убираем ведущий комментарий-заголовок */
if(art.indexOf('function unicornSVG')<0) throw new Error('в вырезанном куске нет unicornSVG');
if(art.indexOf('const SCENES')<0)        throw new Error('в вырезанном куске нет SCENES');

/* ВАЖНО: только split/join. Через String.replace('//__ART__', art) последовательность $$ в коде
   схлопывается в один $ — в искусстве игры есть `const $$ = ...`, и он бы сломался. */
const out=tpl.split('//__ART__').join(art);
if(out.indexOf('//__ART__')>=0) throw new Error('маркер //__ART__ не заменён');
if(out.indexOf('const $$')<0) throw new Error('потерялся const $$ — замена испортила код');

fs.writeFileSync(path.join(dir,'3d.html'), out);
console.log('3d.html собран: '+out.length+' б.');
console.log('  утилиты: '+A.length+' б., рисование: '+F.length+' б.');
console.log('  проверки: unicornSVG ✓, SCENES ✓, сцен '+ (F.match(/^\s{2}[a-z]+:function\(p\)/gm)||[]).length);
