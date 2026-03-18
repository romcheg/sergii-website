import type { FaqItem } from "../types.js";

const FAQ_ITEMS: readonly FaqItem[] = [
  {
    id: "faq-1",
    question: "What should I bring to my first appointment?",
    answer:
      "Please bring a valid photo ID, your health insurance card, any relevant X-rays or MRI images (digital or physical), a list of current medications, and a completed patient intake form if sent in advance. Arrive 15 minutes early to complete any remaining paperwork.",
  },
  {
    id: "faq-2",
    question: "How long will my recovery take after surgery?",
    answer:
      "Recovery time varies depending on the procedure. Minor procedures such as carpal tunnel release typically allow return to light activity within 2–4 weeks. More complex surgeries like rotator cuff repair may require 4–6 months of rehabilitation. Dr. Petrenko will provide a personalised recovery plan during your consultation.",
  },
  {
    id: "faq-3",
    question: "Do I need a referral to see Dr. Petrenko?",
    answer:
      "A referral is not always required, but it is recommended and may be necessary for insurance coverage. Please contact our office to confirm your insurance requirements before booking. Self-pay patients are always welcome.",
  },
  {
    id: "faq-4",
    question: "What non-surgical treatments are available?",
    answer:
      "Many upper-extremity conditions can be effectively managed without surgery. Options include physiotherapy, corticosteroid injections, platelet-rich plasma (PRP) therapy, splinting and bracing, activity modification, and anti-inflammatory medications. Dr. Petrenko always explores conservative options first before recommending surgery.",
  },
  {
    id: "faq-5",
    question: "Can I continue working during recovery?",
    answer:
      "This depends on the nature of your job and the procedure performed. Desk workers may return to light duties within days or weeks, while manual labourers may need more time. We will provide a formal return-to-work plan tailored to your occupation and recovery progress.",
  },
  {
    id: "faq-6",
    question: "Is my condition serious enough to require surgery?",
    answer:
      "Surgery is only recommended when conservative treatments have not provided adequate relief, or when the severity of the injury necessitates immediate intervention. Dr. Petrenko takes a measured, evidence-based approach to ensure you receive the most appropriate treatment for your specific condition.",
  },
];

export function initFaq(): void {
  const container = document.getElementById("faq-container");
  if (container === null) return;

  FAQ_ITEMS.forEach((item, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "border-b border-gray-100 animate-fade-in";
    wrapper.style.transitionDelay = `${index * 80}ms`;

    const button = document.createElement("button");
    button.type = "button";
    button.className =
      "w-full flex items-center justify-between py-5 text-left text-gray-800 hover:text-[#2d6a8f] transition-colors duration-200 group";
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-controls", item.id);

    const questionText = document.createElement("span");
    questionText.className = "font-medium pr-8";
    questionText.textContent = item.question;

    const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    icon.setAttribute("class", "w-5 h-5 flex-shrink-0 text-[#2d6a8f] transition-transform duration-300");
    icon.setAttribute("viewBox", "0 0 24 24");
    icon.setAttribute("fill", "none");
    icon.setAttribute("stroke", "currentColor");
    icon.setAttribute("stroke-width", "2");
    icon.setAttribute("aria-hidden", "true");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    path.setAttribute("d", "M19 9l-7 7-7-7");
    icon.appendChild(path);

    button.appendChild(questionText);
    button.appendChild(icon);

    const answerDiv = document.createElement("div");
    answerDiv.id = item.id;
    answerDiv.className = "overflow-hidden max-h-0 transition-all duration-300 ease-in-out";

    const answerContent = document.createElement("p");
    answerContent.className = "text-gray-600 pb-5 pr-12 leading-relaxed";
    answerContent.textContent = item.answer;

    answerDiv.appendChild(answerContent);
    wrapper.appendChild(button);
    wrapper.appendChild(answerDiv);
    container.appendChild(wrapper);

    let isOpen = false;

    button.addEventListener("click", () => {
      isOpen = !isOpen;
      button.setAttribute("aria-expanded", isOpen ? "true" : "false");

      if (isOpen) {
        answerDiv.style.maxHeight = `${answerDiv.scrollHeight}px`;
        icon.style.transform = "rotate(180deg)";
      } else {
        answerDiv.style.maxHeight = "0";
        icon.style.transform = "rotate(0deg)";
      }
    });
  });
}
