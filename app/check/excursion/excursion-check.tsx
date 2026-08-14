"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { track } from "@vercel/analytics";
import { ArrowLeft, ArrowRight, Boat, Compass, Info } from "@phosphor-icons/react";
import { encodeReport, ExcursionInput, generateReport } from "@/lib/assessment";

const initialExcursion: ExcursionInput = {
  cruiseLine: "",
  ship: "",
  sailingDate: "",
  port: "",
  excursionName: "",
  provider: "Cruise line",
  listingUrl: "",
  activityLevel: "Moderate",
  durationHours: 4,
  tender: "Unknown",
  travelerRelation: "Parent or grandparent",
  standingMinutes: 30,
  stairsTolerance: "A few with a railing",
  mobilityAid: "None",
};

export function ExcursionCheck() {
  const router = useRouter();
  const [excursion, setExcursion] = useState(initialExcursion);
  const [walkingHours, setWalkingHours] = useState(2);
  const [pace, setPace] = useState(2);
  const [description, setDescription] = useState("");

  useEffect(() => { track("excursion_check_started"); }, []);

  function update<K extends keyof ExcursionInput>(key: K, value: ExcursionInput[K]) {
    setExcursion(current => ({ ...current, [key]: value }));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const exactExcursion = { ...excursion, sailingDate: String(form.get("sailingDate") ?? excursion.sailingDate) };
    const summary = `${exactExcursion.cruiseLine} · ${exactExcursion.ship} shore excursion “${exactExcursion.excursionName}” in ${exactExcursion.port}. Provider: ${exactExcursion.provider}. Activity level: ${exactExcursion.activityLevel}. Duration: ${exactExcursion.durationHours} hours. Tender: ${exactExcursion.tender}. ${description}`;
    const needs = ["Easy walking", "A slower pace"];
    if (excursion.stairsTolerance === "Avoid stairs") needs.push("Step-free access");
    const input = { kind: "shore-excursion" as const, companions: [exactExcursion.travelerRelation], needs, walkingHours, pace, description: summary, excursion: exactExcursion };
    const report = generateReport(input);
    localStorage.setItem("vafaro-profile-v1", JSON.stringify({ companions: input.companions, needs, walkingHours, pace }));
    localStorage.setItem(`vafaro-report-${report.id}`, JSON.stringify(report));
    track("excursion_check_completed", { provider: excursion.provider, activity_level: excursion.activityLevel, tender: excursion.tender, walking_hours: walkingHours, standing_minutes: excursion.standingMinutes });
    router.push(`/results?r=${encodeReport(report)}`);
  }

  return <main className="check-page excursion-check-page">
    <header className="nav shell"><Link className="brand" href="/"><span className="brand-mark"><Compass size={20} weight="fill" /></span>vafaro</Link><Link className="back-link" href="/shore-excursion-fit-check"><ArrowLeft size={16} /> About the pilot</Link></header>
    <form className="excursion-form shell" onSubmit={submit}>
      <div className="excursion-form-head"><span className="excursion-form-icon"><Boat size={27} weight="fill" /></span><div><p className="section-kicker">NAMED EXCURSION CHECK</p><h1>Check the excursion, not just the port.</h1><p>Use the exact listing and the traveler’s real comfort limits. Vafaro will surface the assumptions that deserve confirmation before booking.</p></div></div>

      <fieldset><legend>1. Exact sailing and excursion</legend><div className="excursion-field-grid">
        <label><span>Cruise line</span><input required value={excursion.cruiseLine} onChange={event => update("cruiseLine", event.target.value)} placeholder="Viking, Royal Caribbean…" /></label>
        <label><span>Ship</span><input required value={excursion.ship} onChange={event => update("ship", event.target.value)} placeholder="Exact ship name" /></label>
        <label><span>Sailing date</span><input required name="sailingDate" type="date" value={excursion.sailingDate} onChange={event => update("sailingDate", event.target.value)} /></label>
        <label><span>Port</span><input required value={excursion.port} onChange={event => update("port", event.target.value)} placeholder="Naples, Italy" /></label>
        <label className="wide"><span>Excursion name</span><input required value={excursion.excursionName} onChange={event => update("excursionName", event.target.value)} placeholder="Use the exact published name" /></label>
        <label><span>Sold by</span><select value={excursion.provider} onChange={event => update("provider", event.target.value)}><option>Cruise line</option><option>Viator</option><option>Independent operator</option><option>Travel advisor</option><option>Other</option></select></label>
        <label><span>Published activity level</span><select value={excursion.activityLevel} onChange={event => update("activityLevel", event.target.value)}><option>Easy</option><option>Moderate</option><option>Demanding</option><option>Not stated</option></select></label>
        <label><span>Total duration</span><select value={excursion.durationHours} onChange={event => update("durationHours", Number(event.target.value))}>{[2,3,4,5,6,7,8,9].map(hours => <option key={hours} value={hours}>{hours} hours</option>)}</select></label>
        <label><span>Tender port?</span><select value={excursion.tender} onChange={event => update("tender", event.target.value as ExcursionInput["tender"])}><option>Unknown</option><option>Yes</option><option>No</option></select></label>
        <label className="wide"><span>Exact listing URL</span><input required type="url" value={excursion.listingUrl} onChange={event => update("listingUrl", event.target.value)} placeholder="https://…" /></label>
      </div></fieldset>

      <fieldset><legend>2. Traveler comfort profile</legend><div className="excursion-field-grid">
        <label><span>Traveler</span><select value={excursion.travelerRelation} onChange={event => update("travelerRelation", event.target.value)}><option>Parent or grandparent</option><option>Partner</option><option>Adult traveler</option><option>Other family member</option></select></label>
        <label><span>Comfortable standing at once</span><select value={excursion.standingMinutes} onChange={event => update("standingMinutes", Number(event.target.value))}>{[15,30,45,60,90].map(minutes => <option key={minutes} value={minutes}>{minutes} minutes</option>)}</select></label>
        <label><span>Stairs</span><select value={excursion.stairsTolerance} onChange={event => update("stairsTolerance", event.target.value)}><option>Avoid stairs</option><option>A few with a railing</option><option>One flight is okay</option><option>Several flights are okay</option></select></label>
        <label><span>Mobility aid</span><select value={excursion.mobilityAid} onChange={event => update("mobilityAid", event.target.value)}><option>None</option><option>Cane</option><option>Walker or rollator</option><option>Wheelchair or scooter</option></select></label>
      </div><div className="slider-block"><label htmlFor="excursion-walking">Comfortable total walking in a day</label><input id="excursion-walking" type="range" min="1" max="8" value={walkingHours} onChange={event => setWalkingHours(Number(event.target.value))} /><div><span>About 1 hour</span><strong>About {walkingHours} hours</strong><span>All day</span></div></div><div className="slider-block"><label htmlFor="excursion-pace">Comfortable group pace</label><input id="excursion-pace" type="range" min="1" max="5" value={pace} onChange={event => setPace(Number(event.target.value))} /><div><span>Very relaxed</span><strong>{pace <= 2 ? "Slow with breaks" : pace === 3 ? "Average" : "Brisk"}</strong><span>Fast group</span></div></div></fieldset>

      <fieldset><legend>3. What the listing says</legend><label><span>Paste the activity description and anything you already know</span><textarea required minLength={30} maxLength={5000} value={description} onChange={event => setDescription(event.target.value)} placeholder="Include walking, standing, stairs, terrain, transportation, seating, bathrooms, mobility-aid rules, and anything that concerns you." /></label></fieldset>

      <div className="excursion-form-submit"><div><Info size={19} weight="fill" /><p><strong>Planning signal, not a safety verdict.</strong> The free check does not open or verify the listing. Confirm material facts with the cruise line and operator.</p></div><button className="button">Build the excursion fit check <ArrowRight size={18} /></button></div>
      <p className="privacy-note">Your free check remains in this browser unless you submit a review application. <Link href="/privacy">Privacy details</Link></p>
    </form>
  </main>;
}
