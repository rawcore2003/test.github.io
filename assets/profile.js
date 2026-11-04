const $=id=>document.getElementById(id);
const esc=s=>String(s||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const safe=u=>{try{let x=new URL(u);return ["https:","http:"].includes(x.protocol)?x.href:""}catch{return ""}};
const list=v=>Array.isArray(v)?v:String(v||"").split(/\r?\n/).filter(Boolean);
function section(title,body){return body?`<section class="content-section"><h2>${title}</h2>${body}</section>`:""}
async function init(){const id=new URLSearchParams(location.search).get("id");try{const r=await fetch("data/martyrs.json");const d=await r.json();const m=(d.martyrs||[]).find(x=>x.id===id);if(!m)throw Error("notfound");document.title=m.name+" | یادمان شهدا";
let meta=[["نام پدر",m.father],["تاریخ تولد",m.birthDate],["محل تولد",m.birthPlace],["تاریخ شهادت",m.deathDate],["محل شهادت",m.deathPlace],["عملیات / مناسبت",m.operation]].filter(x=>x[1]).map(x=>`<div class="meta-item"><b>${x[0]}:</b> ${esc(x[1])}</div>`).join("");
let cover=safe(m.cover);let gallery=list(m.images).map(safe).filter(Boolean);let videos=list(m.videos).map(safe).filter(Boolean);let audios=list(m.audios).map(safe).filter(Boolean);let docs=list(m.documents).map(safe).filter(Boolean);
$("profile").innerHTML=`<a class="card-link" href="./">← بازگشت به فهرست شهدا</a><div class="profile-hero">${cover?`<img src="${esc(cover)}" alt="${esc(m.name)}">`:`<div class="card-placeholder">✦</div>`}<div><span class="eyebrow">پرونده زندگی و ایثار</span><h1>${esc(m.name)}</h1>${m.title?`<p>${esc(m.title)}</p>`:""}<div class="meta-grid">${meta}</div></div></div>
${section("زندگی‌نامه",m.biography?`<div class="prose">${esc(m.biography)}</div>`:"")}
${section("وصیت‌نامه",m.testament?`<div class="prose">${esc(m.testament)}</div>`:"")}
${section("خاطرات و روایت‌ها",m.memories?`<div class="prose">${esc(m.memories)}</div>`:"")}
${section("گالری تصاویر",gallery.length?`<div class="media-grid">${gallery.map(u=>`<a href="${esc(u)}" target="_blank" rel="noopener"><img loading="lazy" src="${esc(u)}" alt="تصویر مرتبط با ${esc(m.name)}"></a>`).join("")}</div>`:"")}
${section("فیلم‌ها",videos.map((u,i)=>`<a class="media-link" href="${esc(u)}" target="_blank" rel="noopener">مشاهده فیلم ${i+1} ↗</a>`).join("<br>"))}
${section("فایل‌های صوتی",audios.map((u,i)=>`<audio controls preload="none" style="width:100%;margin:8px 0" src="${esc(u)}">مرورگر شما از پخش صوت پشتیبانی نمی‌کند.</audio>`).join(""))}
${section("اسناد و مدارک",docs.map((u,i)=>`<a class="media-link" href="${esc(u)}" target="_blank" rel="noopener">مشاهده سند ${i+1} ↗</a>`).join("<br>"))}
${section("منابع و توضیحات",m.sources?`<div class="prose">${esc(m.sources)}</div>`:"")}`;
}catch{$("profile").innerHTML='<div class="panel"><h2>پرونده پیدا نشد</h2><p>ممکن است این پرونده حذف شده باشد یا نشانی آن نادرست باشد.</p><a class="card-link" href="./">بازگشت به صفحه اصلی</a></div>'}}
init();