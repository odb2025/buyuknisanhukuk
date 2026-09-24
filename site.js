"use strict";
document.addEventListener("DOMContentLoaded",()=>{
  const menuButton=document.querySelector(".menu-toggle");
  const nav=document.getElementById("main-nav");
  const setMenuState=open=>{menuButton?.setAttribute("aria-expanded",String(open));menuButton?.setAttribute("aria-label",open?menuButton.dataset.closeLabel:menuButton.dataset.openLabel);const accessibleLabel=menuButton?.querySelector(".sr-only");if(accessibleLabel)accessibleLabel.textContent=open?menuButton.dataset.closeLabel:menuButton.dataset.openLabel;nav?.classList.toggle("open",open)};
  menuButton?.addEventListener("click",()=>setMenuState(menuButton.getAttribute("aria-expanded")!=="true"));
  nav?.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>setMenuState(false)));

  const language=document.querySelector(".language");
  const languageButton=language?.querySelector("button");
  languageButton?.addEventListener("click",()=>{const open=languageButton.getAttribute("aria-expanded")==="true";languageButton.setAttribute("aria-expanded",String(!open));language?.classList.toggle("open",!open)});
  document.addEventListener("click",event=>{if(language&&!language.contains(event.target)){language.classList.remove("open");languageButton?.setAttribute("aria-expanded","false")}});

  const reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reveals=document.querySelectorAll(".reveal");
  if(reduceMotion||!("IntersectionObserver" in window)){reveals.forEach(el=>el.classList.add("visible"))}else{const observer=new IntersectionObserver((entries,obs)=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");obs.unobserve(entry.target)}}),{threshold:.12});reveals.forEach(el=>observer.observe(el))}

  const banner=document.getElementById("cookie-banner");
  if(!localStorage.getItem("essentialPreferenceAcknowledged"))banner?.classList.add("show");
  document.getElementById("accept-cookies")?.addEventListener("click",()=>{localStorage.setItem("essentialPreferenceAcknowledged","true");banner?.classList.remove("show")});

  const modal=document.getElementById("privacy-modal");
  const modalCard=modal?.querySelector(".modal-card");
  let previousFocus=null;
  const closeModal=()=>{if(!modal)return;modal.hidden=true;document.body.style.overflow="";previousFocus?.focus()};
  const openModal=()=>{if(!modal)return;previousFocus=document.activeElement;modal.hidden=false;document.body.style.overflow="hidden";modalCard?.focus()};
  document.querySelectorAll("[data-open-privacy]").forEach(button=>button.addEventListener("click",openModal));
  document.querySelector("[data-close-privacy]")?.addEventListener("click",closeModal);
  modal?.addEventListener("click",event=>{if(event.target===modal)closeModal()});
  document.addEventListener("keydown",event=>{if(event.key==="Escape"&&!modal?.hidden)closeModal();if(event.key==="Escape"){language?.classList.remove("open");languageButton?.setAttribute("aria-expanded","false");setMenuState(false)}if(event.key==="Tab"&&!modal?.hidden){const focusable=[...modal.querySelectorAll("a,button,[tabindex]:not([tabindex='-1'])")];if(!focusable.length)return;const first=focusable[0],last=focusable[focusable.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}}});

  const form=document.getElementById("contact-form");
  const loadedAt=Date.now();
  form?.addEventListener("submit",event=>{
    event.preventDefault();
    const status=document.getElementById("form-status");
    const trap=form.querySelector(".honeypot");
    if(trap?.value||Date.now()-loadedAt<1500){status.textContent=form.dataset.error;status.className="form-status error";return}
    const data=new FormData(form);
    const english=document.body.dataset.lang==="en";
    const name=String(data.get(english?"full_name":"ad_soyad")||"").trim();
    const email=String(data.get("email")||"").trim();
    const phone=String(data.get(english?"phone":"telefon")||"").trim();
    const subject=String(data.get(english?"subject":"konu")||"").trim();
    const message=String(data.get(english?"message":"mesaj")||"").trim();
    const labels=english?{request:"Website contact request",name:"Name",email:"Email",phone:"Phone",message:"Message"}:{request:"Web sitesi iletişim talebi",name:"Ad soyad",email:"E-posta",phone:"Telefon",message:"Mesaj"};
    const body=[`${labels.name}: ${name}`,`${labels.email}: ${email}`,phone?`${labels.phone}: ${phone}`:"",`${labels.message}:`,message].filter(Boolean).join("\n");
    const target=form.dataset.emailTarget;
    const mailto=`mailto:${target}?subject=${encodeURIComponent(`${labels.request}: ${subject}`)}&body=${encodeURIComponent(body)}`;
    status.textContent=form.dataset.success;
    status.className="form-status success";
    window.location.href=mailto;
  });
});
