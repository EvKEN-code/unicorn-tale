const fs=require('fs');
let t=fs.readFileSync('_3d_template.html','utf8');
let n=0;
/* 56% -> 48%, 66% -> 60%, 84% -> 78%: герой чуть меньше карточки, сцена видна вокруг */
[['hw:/'56%\'','hw:/'48%\''],['hw:/'66%\'','hw:/'60%\''],['hw:/'84%\'','hw:/'78%\''],['--hw,56%','--hw,48%']].forEach(([a,b])=>{
  const c=t.split(a).length-1; n+=c; t=t.split(a).join(b);
});
fs.writeFileSync('_3d_template.html',t);
console.log('заменено вхождений: '+n);
