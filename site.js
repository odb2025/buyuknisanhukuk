"use strict";
document.addEventListener("DOMContentLoaded",()=>{
  const menuButton=document.querySelector(".menu-toggle");
  const nav=document.getElementById("main-nav");
  menuButton?.addEventListener("click",()=>{const open=menuButton.getAttribute("aria-expanded")==="true";menuButton.setAttribute("aria-expanded",String(!open));nav?.classList.toggle("open",!open)});
  nav?.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{nav.classList.remove("open");menuButton?.setAttribute("aria-expanded","false")}));

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
  document.addEventListener("keydown",event=>{if(event.key==="Escape"&&!modal?.hidden)closeModal();if(event.key==="Escape"){language?.classList.remove("open");languageButton?.setAttribute("aria-expanded","false");nav?.classList.remove("open");menuButton?.setAttribute("aria-expanded","false")}if(event.key==="Tab"&&!modal?.hidden){const focusable=[...modal.querySelectorAll("a,button,[tabindex]:not([tabindex='-1'])")];if(!focusable.length)return;const first=focusable[0],last=focusable[focusable.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}}});

  const form=document.getElementById("contact-form");
  const loadedAt=Date.now();
  form?.addEventListener("submit",async event=>{event.preventDefault();const button=form.querySelector(".submit");const status=document.getElementById("form-status");const trap=form.querySelector(".honeypot");if(trap?.value||Date.now()-loadedAt<2500){status.textContent=form.dataset.error;status.className="form-status error";return}button.disabled=true;button.textContent=form.dataset.sending;status.className="form-status";try{const response=await fetch(form.action,{method:"POST",body:new FormData(form),headers:{Accept:"application/json"}});if(!response.ok)throw new Error("submit failed");status.textContent=form.dataset.success;status.className="form-status success";form.reset()}catch(error){status.textContent=form.dataset.error;status.className="form-status error"}finally{button.disabled=false;button.textContent=form.dataset.submit}});
});
