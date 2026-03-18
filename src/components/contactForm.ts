import type { ContactFormData, ContactFormErrors, ValidationResult, FormFieldName } from "../types.js";

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone: string): boolean {
  if (phone.trim() === "") return true; // phone is optional
  const phoneRegex = /^[+\d\s\-().]{7,20}$/;
  return phoneRegex.test(phone);
}

function validateForm(data: ContactFormData): ValidationResult {
  const errors: ContactFormErrors = {};

  if (data.name.trim().length < 2) {
    errors.name = "Please enter your full name (at least 2 characters).";
  }

  if (!validateEmail(data.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!validatePhone(data.phone)) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (data.subject.trim().length < 3) {
    errors.subject = "Please enter a subject for your message.";
  }

  if (data.message.trim().length < 20) {
    errors.message = "Please provide more detail in your message (at least 20 characters).";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

function getInputValue(form: HTMLFormElement, fieldName: FormFieldName): string {
  const el = form.elements.namedItem(fieldName);
  if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement) {
    return el.value;
  }
  return "";
}

function showFieldError(form: HTMLFormElement, fieldName: FormFieldName, message: string): void {
  const errorEl = form.querySelector<HTMLElement>(`[data-error="${fieldName}"]`);
  const inputEl = form.querySelector<HTMLElement>(`[name="${fieldName}"]`);

  if (errorEl !== null) {
    errorEl.textContent = message;
    errorEl.classList.remove("hidden");
  }

  if (inputEl !== null) {
    inputEl.classList.add("border-red-400");
    inputEl.classList.remove("border-gray-200");
  }
}

function clearFieldError(form: HTMLFormElement, fieldName: FormFieldName): void {
  const errorEl = form.querySelector<HTMLElement>(`[data-error="${fieldName}"]`);
  const inputEl = form.querySelector<HTMLElement>(`[name="${fieldName}"]`);

  if (errorEl !== null) {
    errorEl.textContent = "";
    errorEl.classList.add("hidden");
  }

  if (inputEl !== null) {
    inputEl.classList.remove("border-red-400");
    inputEl.classList.add("border-gray-200");
  }
}

function clearAllErrors(form: HTMLFormElement): void {
  const fields: readonly FormFieldName[] = ["name", "email", "phone", "subject", "message"];
  fields.forEach((field) => clearFieldError(form, field));
}

function showSuccessMessage(form: HTMLFormElement): void {
  const successEl = document.getElementById("form-success");
  if (successEl !== null) {
    successEl.classList.remove("hidden");
  }
  form.reset();
  form.classList.add("hidden");
}

export function initContactForm(): void {
  const form = document.getElementById("contact-form");
  if (!(form instanceof HTMLFormElement)) return;

  // Real-time validation on blur
  const fields: readonly FormFieldName[] = ["name", "email", "phone", "subject", "message"];
  fields.forEach((fieldName) => {
    const el = form.elements.namedItem(fieldName);
    if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement) {
      el.addEventListener("blur", () => {
        const partialData: ContactFormData = {
          name: getInputValue(form, "name"),
          email: getInputValue(form, "email"),
          phone: getInputValue(form, "phone"),
          subject: getInputValue(form, "subject"),
          message: getInputValue(form, "message"),
        };
        const result = validateForm(partialData);
        const fieldError = result.errors[fieldName];
        if (fieldError !== undefined) {
          showFieldError(form, fieldName, fieldError);
        } else {
          clearFieldError(form, fieldName);
        }
      });
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData: ContactFormData = {
      name: getInputValue(form, "name"),
      email: getInputValue(form, "email"),
      phone: getInputValue(form, "phone"),
      subject: getInputValue(form, "subject"),
      message: getInputValue(form, "message"),
    };

    clearAllErrors(form);

    const result = validateForm(formData);

    if (!result.isValid) {
      const errorFields: FormFieldName[] = ["name", "email", "phone", "subject", "message"];
      errorFields.forEach((fieldName) => {
        const fieldError = result.errors[fieldName];
        if (fieldError !== undefined) {
          showFieldError(form, fieldName, fieldError);
        }
      });

      // Focus the first error field
      const firstErrorField = errorFields.find((f) => result.errors[f] !== undefined);
      if (firstErrorField !== undefined) {
        const firstEl = form.elements.namedItem(firstErrorField);
        if (firstEl instanceof HTMLElement) {
          firstEl.focus();
        }
      }
      return;
    }

    // In production, you would send formData to a backend endpoint.
    // For this static site, we show a success message.
    showSuccessMessage(form);
  });
}
