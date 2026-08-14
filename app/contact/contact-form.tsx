"use client";

import { FormEvent, useState } from "react";
import { track } from "@vercel/analytics";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";

const topics = ["General question", "Founding-family review", "Privacy request", "Travel advisor partnership"];
type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState(topics[0]);
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, topic, message, company }),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || "We could not save your message.");
      track("contact_submitted", { topic });
      setState("success");
    } catch (submissionError) {
      track("contact_failed", { topic });
      setState("error");
      setError(submissionError instanceof Error ? submissionError.message : "We could not save your message. Please try again.");
    }
  }

  if (state === "success") return <div className="contact-success" role="status"><CheckCircle size={28} weight="fill" /><div><h2>Message received.</h2><p>Thank you. Your message has been saved for Vafaro to review.</p></div></div>;

  return <form className="contact-form" onSubmit={submit}>
    <div className="contact-fields">
      <label><span>Name</span><input required autoComplete="name" value={name} onChange={event => setName(event.target.value)} /></label>
      <label><span>Email</span><input required type="email" autoComplete="email" value={email} onChange={event => setEmail(event.target.value)} /></label>
    </div>
    <label><span>What can we help with?</span><select value={topic} onChange={event => setTopic(event.target.value)}>{topics.map(item => <option key={item}>{item}</option>)}</select></label>
    <label><span>Message</span><textarea required minLength={10} maxLength={4000} value={message} onChange={event => setMessage(event.target.value)} placeholder="Please do not include medical records, passport numbers, or payment details." /></label>
    <label className="form-trap" aria-hidden="true">Company<input tabIndex={-1} autoComplete="off" value={company} onChange={event => setCompany(event.target.value)} /></label>
    {state === "error" ? <p className="capture-error" role="alert">{error}</p> : null}
    <button className="button" disabled={state === "submitting"}>{state === "submitting" ? "Sending…" : "Send message"} <ArrowRight size={16} /></button>
  </form>;
}
