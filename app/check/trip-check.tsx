"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { track } from "@vercel/analytics";
import { ArrowRight, Check, LinkSimple, NotePencil, UploadSimple } from "@phosphor-icons/react";
import { encodeReport, generateReport } from "@/lib/assessment";

const companions = ["Partner", "Young children", "Teens", "Adult children / siblings", "Parents / grandparents", "Other family"];
const needs = ["Easy walking", "Step-free access", "A slower pace", "Quiet spaces", "Food considerations", "Medical access"];

export function TripCheck() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<string[]>(["Parents / grandparents"]);
  const [needsSelected, setNeeds] = useState<string[]>(["Easy walking", "A slower pace"]);
  const [walkingHours, setWalkingHours] = useState(3);
  const [pace, setPace] = useState(2);
  const [description, setDescription] = useState("");
  const [profileRestored, setProfileRestored] = useState(false);
  useEffect(()=>{
    track("trip_scan_started");
    const saved=localStorage.getItem("vafaro-profile-v1");
    if(!saved)return;
    const frame=requestAnimationFrame(()=>{try{const profile=JSON.parse(saved) as {companions?:string[];needs?:string[];walkingHours?:number;pace?:number};if(profile.companions)setSelected(profile.companions);if(profile.needs)setNeeds(profile.needs);if(profile.walkingHours)setWalkingHours(profile.walkingHours);if(profile.pace)setPace(profile.pace);setProfileRestored(true)}catch{localStorage.removeItem("vafaro-profile-v1")}});
    return ()=>cancelAnimationFrame(frame);
  },[]);
  const toggle = (value: string, values: string[], setter: (v: string[]) => void) => setter(values.includes(value) ? values.filter(v => v !== value) : [...values, value]);
  const continueScan = () => {
    track("trip_scan_step_completed", { step });
    setStep(current => current + 1);
  };
  const buildReport = () => {
    const input={companions:selected,needs:needsSelected,walkingHours,pace,description};
    const report=generateReport(input);
    localStorage.setItem("vafaro-profile-v1",JSON.stringify(input));
    localStorage.setItem(`vafaro-report-${report.id}`,JSON.stringify(report));
    track("trip_scan_completed", { companion_groups:selected.length, planning_needs:needsSelected.length, walking_hours:walkingHours, pace });
    router.push(`/results?r=${encodeReport(report)}`);
  };

  return <div className="check-shell shell">
    <div className="progress-wrap"><span>TRIP CHECK</span><div className="progress"><i style={{ width: `${step * 25}%` }} /></div><span>{step} of 4</span></div>
    {step === 1 && <section className="question"><p className="section-kicker">FIRST, THE FAMILY</p><h1>Which generations are traveling?</h1><p>{profileRestored?"Your saved family profile is ready. Adjust anything that changed.":"Select everyone this trip needs to work for, especially children and aging parents."}</p><div className="choice-grid">{companions.map(item => <button className={selected.includes(item) ? "choice selected" : "choice"} key={item} onClick={() => toggle(item, selected, setSelected)}>{item}{selected.includes(item) ? <Check size={16} weight="bold" /> : null}</button>)}</div></section>}
    {step === 2 && <section className="question"><p className="section-kicker">THE REAL CONSIDERATIONS</p><h1>What would make the trip feel easier?</h1><p>This isn’t a medical form. It simply helps us plan respectfully.</p><div className="choice-grid">{needs.map(item => <button className={needsSelected.includes(item) ? "choice selected" : "choice"} key={item} onClick={() => toggle(item, needsSelected, setNeeds)}>{item}{needsSelected.includes(item) && <Check size={16} weight="bold" />}</button>)}</div></section>}
    {step === 3 && <section className="question"><p className="section-kicker">YOUR TRAVEL STYLE</p><h1>What’s a comfortable day?</h1><p>There are no wrong answers—only better-fitting trips.</p><div className="slider-block"><label htmlFor="walking-hours">Time comfortably spent walking</label><input id="walking-hours" type="range" min="1" max="8" value={walkingHours} onChange={event=>setWalkingHours(Number(event.target.value))}/><div><span>Under 1 hour</span><strong>About {walkingHours} hours</strong><span>All day</span></div></div><div className="slider-block"><label htmlFor="trip-pace">Preferred pace</label><input id="trip-pace" type="range" min="1" max="5" value={pace} onChange={event=>setPace(Number(event.target.value))}/><div><span>Very relaxed</span><strong>{pace<=2?"One main plan / day":pace===3?"Balanced":"See more"}</strong><span>See it all</span></div></div></section>}
    {step === 4 && <section className="question"><p className="section-kicker">THE TRIP OR EXCURSION</p><h1>What are you considering?</h1><p>Paste the plan or exact listing. For a shore excursion, include the cruise line, ship, sailing date, port, excursion name, link, and activity description.</p><div className="input-methods"><button type="button" onClick={()=>document.querySelector<HTMLTextAreaElement>("#trip-description")?.focus()}><LinkSimple size={25}/><strong>Paste a link</strong><span>Itinerary, excursion, hotel, tour, or booking</span></button><button type="button" disabled aria-disabled="true"><UploadSimple size={25}/><strong>Upload coming next</strong><span>PDF, screenshot, or document</span></button><button type="button" onClick={()=>document.querySelector<HTMLTextAreaElement>("#trip-description")?.focus()}><NotePencil size={25}/><strong>Describe it</strong><span>Tell us the idea in your own words</span></button></div><textarea id="trip-description" value={description} onChange={event=>setDescription(event.target.value)} aria-label="Describe your trip or shore excursion" placeholder="Example: Viking Pompeii shore excursion from Naples, rated demanding, four hours, with my 72-year-old parent who prefers two hours of walking..." /></section>}
    <div className="question-actions">{step > 1 ? <button className="text-button" onClick={() => setStep(step - 1)}>Back</button> : <span />}{step < 4 ? <button className="button" onClick={continueScan}>Continue <ArrowRight size={18} /></button> : <button className="button" disabled={!description.trim()} onClick={buildReport}>Build my free family trip scan <ArrowRight size={18}/></button>}</div>
    <div className="scan-disclaimer"><strong>Planning aid, not a guarantee.</strong> This early scan uses your answers and general travel-planning heuristics. It does not verify live conditions, accessibility, medical suitability, or provider policies. Confirm important details directly before booking.</div>
    <p className="privacy-note">Your scan stays in this browser unless you submit a review application. Vafaro never sells trip profiles. <a href="/privacy">Privacy details</a></p>
  </div>;
}
