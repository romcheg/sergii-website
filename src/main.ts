import "../styles/main.css";
import { initNavigation } from "./components/navigation.js";
import { initAnimations, initStaggeredAnimations } from "./components/animations.js";
import { initFaq } from "./components/faq.js";
import { initContactForm } from "./components/contactForm.js";

function main(): void {
  initNavigation();
  initAnimations();
  initStaggeredAnimations();
  initFaq();
  initContactForm();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main);
} else {
  main();
}
