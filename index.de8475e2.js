const e={key:"36836755-9f43607b903fa703cdff42e50",per_page:"20",image_type:"photo",orientation:"horizontal",safesearch:"true"};async function t({q:t="",page:n="1"}){try{const a=new URLSearchParams({...e,page:n,q:t}),o=await fetch(`https://pixabay.com/api?${a}`);if(!o.ok)return 400===o.status?[]:{error:o.status};const{hits:s}=await o.json();return s}catch(e){return{error:e.toString()}}}async function n({q:e,page:n}){const a=await t({q:e,page:n});a.error?alert(a.error):function({photos:e,page:t}){const n=document.querySelector(".gallery");"1"===t&&(n.innerHTML="");const a=e.map((e=>{const t=document.createElement("div");t.classList.add("photo-card");const n=document.createElement("img");n.classList.add("photo"),n.src=e.webformatURL,n.alt=e.tags,n.setAttribute("loading","lazy"),t.appendChild(n);const a=document.createElement("div");a.classList.add("info"),t.appendChild(a);const o=document.createElement("p");o.classList.add("info-item"),o.innerHTML=`<b>Likes</b><p>${e.likes}</p>`,a.appendChild(o);const s=document.createElement("p");s.classList.add("info-item"),s.innerHTML=`<b>Views</b><p>${e.views}</p>`,a.appendChild(s);const c=document.createElement("p");c.classList.add("info-item"),c.innerHTML=`<b>Comments</b><p>${e.comments}</p>`,a.appendChild(c);const r=document.createElement("p");return r.classList.add("info-item"),r.innerHTML=`<b>Downloads</b><p>${e.downloads}</p>`,a.appendChild(r),t}));n.append(...a)}({photos:a,page:n})}const a=document.querySelector("#searchPhotosForm");a.addEventListener("submit",(async function(e){e.preventDefault(),e.target.page.value="1";const t=e.target.q.value;await n({q:t,page:"1"})})),a.dispatchEvent(new Event("submit")),window.addEventListener("scroll",(async function(){const{scrollTop:e,scrollHeight:t,clientHeight:a}=document.documentElement;if(e+a>=t){const e=document.querySelector("#searchPhotosForm"),t=parseInt(e.page.value);e.page.value=t+1,await n({q:e.q.value,page:e.page.value})}}));
//# sourceMappingURL=index.de8475e2.js.map
