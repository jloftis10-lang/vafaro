"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, LinkSimple, NotePencil, UploadSimple } from "@phosphor-icons/react";

const companions = ["Partner", "Young children", "Teens", "Adult family", "Parents / grandparents", "Friends"];
const needs = ["Easy walking", "Step-free access", "A slower pace", "Quiet spaces", "Food considerations", "Medical access"];

export function TripCheck() {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<string[]>(["Parents / grandparents"]);
  const [needsSelected, setNeeds] = useState<string[]>(["Easy walking", "A slower pace"]);
  const toggle = (value: string, values: string[], setter: (v: string[]) => void) => setter(values.includes(value) ? values.filter(v => v !== value) : [...values, value]);

  return <div className="check-shell shell">
    <div className="progress-wrap"><span>TRIP CHECK</span><div className="progress"><i style={{ width: `${step * 25}%` }} /></div><span>{step} of 4</span></div>
    {step === 1 && <section className="question"><p className="section-kicker">FIRST, THE PEOPLE</p><h1>Who’s coming along?</h1><p>Select everyone this trip needs to work for.</p><div className="choice-grid">{companions.map(item => <button className={selected.includes(item) ? "choice selected" : "choice"} key={item} onClick={() => toggle(item, selected, setSelected)}>{item}{selected.includes(item) && <Check size={16} weight="bold" />}</button>)}</div></section>}
    {step === 2 && <section className="question"><p className="section-kicker">THE REAL CONSIDERATIONS</p><h1>What would make the trip feel easier?</h1><p>This isn’t a medical form. It simply helps us plan respectfully.</p><div className="choice-grid">{needs.map(item => <button className={needsSelected.includes(item) ? "choice selected" : "choice"} key={item} onClick={() => toggle(item, needsSelected, setNeeds)}>{item}{needsSelected.includes(item) && <Check size={16} weight="bold" />}</button>)}</div></section>}
    {step === 3 && <section className="question"><p className="section-kicker">YOUR TRAVEL STYLE</p><h1>What’s a comfortable day?</h1><p>There are no wrong answers—only better-fitting trips.</p><div className="slider-block"><label>Time comfortably spent walking</label><input type="range" min="1" max="8" defaultValue="3" /><div><span>Under 1 hour</span><strong>About 3 hours</strong><span>All day</span></div></div><div className="slider-block"><label>Preferred pace</label><input type="range" min="1" max="5" defaultValue="2" /><div><span>Very relaxed</span><strong>One main plan / day</strong><span>See it all</span></div></div></section>}
    {step === 4 && <section className="question"><p className="section-kicker">THE TRIP</p><h1>What are you considering?</h1><p>Add as much or as little as you have. A rough idea is enough.</p><div className="input-methods"><button><LinkSimple size={25} /><strong>Paste a link</strong><span>Itinerary, hotel, tour, or booking</span></button><button><UploadSimple size={25} /><strong>Upload a plan</strong><span>PDF, screenshot, or document</span></button><button><NotePencil size={25} /><strong>Describe it</strong><span>Tell us the idea in your own words</span></button></div><textarea aria-label="Describe your trip" placeholder="Example: Eight days in Rome and Florence this October with my husband, our two children, and my parents..." /></section>}
    <div className="question-actions">{step > 1 ? <button className="text-button" onClick={() => setStep(step - 1)}>Back</button> : <span />}{step < 4 ? <button className="button" onClick={() => setStep(step + 1)}>Continue <ArrowRight size={18} /></button> : <Link className="button" href="/report">Build my Trip Fit Report <ArrowRight size={18} /></Link>}</div>
    <p className="privacy-note">Your answers stay private and are never sold.</p>
  </div>;
}
