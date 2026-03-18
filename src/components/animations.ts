/**
 * Scroll-triggered fade-in animations using IntersectionObserver.
 */

export function initAnimations(): void {
  const animatedElements = document.querySelectorAll<HTMLElement>(".animate-fade-in");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  animatedElements.forEach((el) => observer.observe(el));
}

export function initStaggeredAnimations(): void {
  const groups = document.querySelectorAll<HTMLElement>("[data-stagger-group]");

  groups.forEach((group) => {
    const children = group.querySelectorAll<HTMLElement>(".animate-fade-in");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            children.forEach((child, index) => {
              const delay = index * 100;
              setTimeout(() => {
                child.classList.add("visible");
              }, delay);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(group);
  });
}
