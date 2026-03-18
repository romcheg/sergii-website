/**
 * Type definitions for the Dr. Sergii website.
 */

export interface NavigationItem {
  readonly id: string;
  readonly label: string;
  readonly href: string;
}

export interface Specialization {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly conditions: readonly string[];
  readonly icon: string;
}

export interface Procedure {
  readonly id: string;
  readonly name: string;
  readonly category: string;
  readonly description: string;
  readonly recovery: string;
}

export interface FaqItem {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
}

export interface ContactFormData {
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly subject: string;
  readonly message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

export interface ValidationResult {
  readonly isValid: boolean;
  readonly errors: ContactFormErrors;
}

export type FormFieldName = keyof ContactFormData;
