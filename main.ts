import{mkdirSync,readdirSync,readFileSync,writeFileSync}from"fs";
import{join}from"path";
function run(p:Uint8Array,g:Uint8Array){
 const n=p.length,D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),O=new Uint8Array(65536);
 let s=0,c=0,l=0,j=0,x=0,t=0;
 const d=(v:number)=>({o:O.slice(0,l),v});
 for(;;){
  if(t===1e6)return d(10);
  if(x<0||x>=n)return d(9);
  const k=p[x];
  let m=0,a=0,b=0;
  if(k===1){m=1;b=1}else if(k===2){m=4;b=1}
  else if(k===3)a=1;else if(k===4){a=1;b=2}else if(k===5){a=2;b=2}else if(k===6){a=2;b=3}else if(k===7){a=3;b=3}
  else if(k>=16&&k<=34&&k!==23&&k!==27){a=2;b=1}
  else if(k===23||k===27){a=1;b=1}
  else if(k===48||k===51)m=2;
  else if(k===49||k===50){m=2;a=1}
  else if(k===64){a=1;b=1}else if(k===65)a=2;
  else if(k===80||k===81||k===83)a=1;
  else if(k===82)b=1;
  else if(k!==0&&k!==52)return d(5);
  if(x+m>=n)return d(9);
  t++;const y=x+1+m;
  if(s<a)return d(2);
  if(s-a+b>256)return d(3);
  x=y;
  switch(k){
   case 0:return d(0);
   case 1:D[s++]=(p[x-1]<<24)>>24;break;
   case 2:D[s++]=p[x-4]|p[x-3]<<8|p[x-2]<<16|p[x-1]<<24;break;
   case 3:s--;break;
   case 4:D[s]=D[s-1];s++;break;
   case 5:[D[s-1],D[s-2]]=[D[s-2],D[s-1]];break;
   case 6:D[s]=D[s-2];s++;break;
   case 7:[D[s-3],D[s-2],D[s-1]]=[D[s-2],D[s-1],D[s-3]];break;
   case 23:D[s-1]=-D[s-1]|0;break;
   case 27:D[s-1]=~D[s-1];break;
   case 48:case 49:case 50:{
    const r=(p[x-2]|p[x-1]<<8)<<16>>16;
    if(k===48||(k===49?D[--s]===0:D[--s]!==0))x+=r;
    break}
   case 51:
    if(c===64)return d(7);
    C[c++]=x;x=p[x-2]|p[x-1]<<8;break;
   case 52:
    if(!c)return d(8);
    x=C[--c];break;
   case 64:case 65:{const v=D[s-1];if(v<0||v>255)return d(6);if(k===64)D[s-1]=M[v];else{s-=2;M[v]=D[s]}break}
   case 80:{const w=String(D[s-1]);if(l+w.length>65536)return d(11);s--;for(let i=0;i<w.length;)O[l++]=w.charCodeAt(i++);break}
   case 81:
    if(l+1>65536)return d(11);
    O[l++]=D[--s]&255;break;
   case 82:D[s++]=j<g.length?g[j++]:-1;break;
   case 83:return d(D[--s]&255);
   default:{
    const B=D[s-1],A=D[s-2];let r=0;
    if(k===16)r=A+B|0;
    else if(k===17)r=A-B|0;
    else if(k===18)r=Math.imul(A,B);
    else if(k===19){if(!B)return d(4);r=A/B|0}
    else if(k===20){if(!B)return d(4);r=A%B}
    else if(k===21){if(!B)return d(4);r=Math.floor((A>>>0)/(B>>>0))|0}
    else if(k===22){if(!B)return d(4);r=(A>>>0)%(B>>>0)|0}
    else if(k===24)r=A&B;
    else if(k===25)r=A|B;
    else if(k===26)r=A^B;
    else if(k===28)r=A<<(B&31);
    else if(k===29)r=A>>(B&31);
    else if(k===30)r=(A>>>(B&31))|0;
    else if(k===32)r=+(A===B);
    else if(k===33)r=+(A<B);
    else if(k===34)r=+((A>>>0)<(B>>>0));
    s-=2;D[s++]=r;
   }
  }
 }
}
const I=process.env.MAKEFUN_INPUT_DIR??"/input",O=process.env.MAKEFUN_OUTPUT_DIR??"/output",R=(i,f)=>new Uint8Array(readFileSync(join(I,i,f)));
for(const id of readdirSync(I).sort()){
 const r=run(R(id,"program.bin"),R(id,"input.bin"));
 mkdirSync(join(O,id),{recursive:true});
 writeFileSync(join(O,id,"stdout.bin"),r.o);
 writeFileSync(join(O,id,"exit.txt"),`${r.v}\n`);
}
