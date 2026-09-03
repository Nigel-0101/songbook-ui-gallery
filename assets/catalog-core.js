(function(root){'use strict';
const WEEK=7*24*60*60*1000;
function remaining(item,now=Date.now()){if(!item.promoteNew)return 0;const start=Date.parse(item.addedAt);if(!Number.isFinite(start)||now<start)return 0;return Math.max(0,start+WEEK-now);}
function countdown(ms){const minutes=Math.ceil(ms/60000);if(minutes<=0)return '';const days=Math.floor(minutes/1440),hours=Math.floor(minutes%1440/60),mins=minutes%60;if(days)return `${days}天${hours}小时`;if(hours)return `${hours}小时${mins}分`;return `${minutes}分钟`;}
function select(items,group,query,now=Date.now()){const q=query.trim().toLocaleLowerCase('zh-CN');return items.filter(x=>(group==='all'||x.group===group)&&(!q||[x.name,x.code,x.description,x.concept].join(' ').toLocaleLowerCase('zh-CN').includes(q))).sort((a,b)=>{const an=remaining(a,now)>0,bn=remaining(b,now)>0;if(an!==bn)return an?-1:1;if(an&&bn){const dateDiff=Date.parse(b.addedAt)-Date.parse(a.addedAt);if(dateDiff)return dateDiff;}return a.order-b.order;});}
root.TemplateCatalog={remaining,countdown,select,WEEK};
})(typeof module!=='undefined'&&module.exports?module.exports:window);
