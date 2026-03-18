import type { NavigationItem } from "../types.js";

const NAV_ITEMS: readonly NavigationItem[] = [
  { id: "about", label: "About", href: "#about" },
  { id: "specializations", label: "Specializations", href: "#specializations" },
  { id: "procedures", label: "Procedures", href: "#procedures" },
  { id: "patients", label: "For Patients", href: "#patients" },
  { id: "contact", label: "Contact", href: "#contact" },
];

function getRequiredElement<T extends HTMLElement>(id: string): T {
  const el = document.getElementById(id);
  if (el === null) {
    throw new Error(`Required element #${id} not found in DOM`);
  }
  return el as T;
}

function queryRequiredElement<T extends Element>(
  selector: string,
  context: Document | HTMLElement = document
): T {
  const el = context.querySelector<T>(selector);
  if (el === null) {
    throw new Error(`Required element "${selector}" not found in DOM`);
  }
  return el;
}

export function initNavigation(): void {
  const navbar = getRequiredElement<HTMLElement>("navbar");
  const menuBtn = getRequiredElement<HTMLButtonElement>("menu-btn");
  const mobileMenu = getRequiredElement<HTMLElement>("mobile-menu");
  const menuIconOpen = queryRequiredElement<SVGSVGElement>("#menu-icon-open", menuBtn);
  const menuIconClose = queryRequiredElement<SVGSVGElement>("#menu-icon-close", menuBtn);

  // Sticky navbar shadow on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      navbar.classList.add("shadow-sm");
      navbar.classList.add("bg-white/95");
      navbar.classList.add("backdrop-blur-sm");
    } else {
      navbar.classList.remove("shadow-sm");
      navbar.classList.remove("bg-white/95");
      navbar.classList.remove("backdrop-blur-sm");
    }
  });

  // Mobile menu toggle
  let isMenuOpen = false;

  menuBtn.addEventListener("click", () => {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
      mobileMenu.classList.remove("hidden");
      menuIconOpen.classList.add("hidden");
      menuIconClose.classList.remove("hidden");
      menuBtn.setAttribute("aria-expanded", "true");
    } else {
      mobileMenu.classList.add("hidden");
      menuIconOpen.classList.remove("hidden");
      menuIconClose.classList.add("hidden");
      menuBtn.setAttribute("aria-expanded", "false");
    }
  });

  // Close mobile menu on nav link click
  const mobileLinks = mobileMenu.querySelectorAll<HTMLAnchorElement>("a");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      isMenuOpen = false;
      mobileMenu.classList.add("hidden");
      menuIconOpen.classList.remove("hidden");
      menuIconClose.classList.add("hidden");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });

  // Smooth scroll for all nav links
  const allNavLinks = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
  allNavLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href === null || href === "#") return;

      const target = document.querySelector<HTMLElement>(href);
      if (target === null) return;

      e.preventDefault();
      const navbarHeight = navbar.offsetHeight;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({ top: targetTop, behavior: "smooth" });
    });
  });

  // Active nav item highlight
  const sections = document.querySelectorAll<HTMLElement>("section[id]");
  const desktopLinks = document.querySelectorAll<HTMLAnchorElement>("#desktop-nav a");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          desktopLinks.forEach((link) => {
            const href = link.getAttribute("href");
            if (href === `#${id}`) {
              link.classList.add("text-[#2d6a8f]");
            } else {
              link.classList.remove("text-[#2d6a8f]");
            }
          });
        }
      });
    },
    { rootMargin: "-40% 0px -60% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}

export { NAV_ITEMS };
