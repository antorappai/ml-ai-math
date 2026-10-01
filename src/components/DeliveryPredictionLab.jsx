import React, { useId, useState } from "react";

export default function DeliveryPredictionLab() {
  const id = useId();
  const [distance, setDistance] = useState(4);
  const [mass, setMass] = useState(2);
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const distanceContribution = distance * 3;
  const massContribution = mass * 2;
  const variableCharge = distanceContribution + massContribution;
  const prediction = variableCharge + 5;
  const numericAnswer = Number(answer);
  const validAnswer = answer.trim() !== "" && Number.isFinite(numericAnswer);
  const correct = validAnswer && numericAnswer === prediction;
  const feedback = correct
    ? "You paired each measurement with its rate and included the baseline once."
    : numericAnswer === variableCharge
      ? "You found the variable charge correctly. This activity also includes a 5-coin booking fee, so add the baseline once."
      : numericAnswer === distanceContribution + 5
        ? "That covers distance and the baseline. Include the parcel's mass contribution too."
        : numericAnswer === massContribution + 5
          ? "That covers mass and the baseline. Include the distance contribution too."
          : numericAnswer === variableCharge + 10
            ? "You included the 5-coin baseline twice. Add it once after the two feature contributions."
            : "Build the prediction from three parts: distance × 3, mass × 2, then one baseline of 5 coins. Check each multiplication before adding.";

  function updateInput(setValue, value) {
    setValue(Number(value));
    setAnswer("");
    setSubmitted(false);
  }

  return <section className="delivery-prediction-lab" aria-labelledby={`${id}-title`}>
    <p className="section-label">Try the model yourself</p>
    <h3 id={`${id}-title`}>Predict a delivery bill</h3>
    <p>Keep the rates at 3 coins/km and 2 coins/kg. Now include a fixed booking fee of 5 coins. Change the distance or parcel mass and predict the total before checking.</p>
    <div className="delivery-controls">
      <label htmlFor={`${id}-distance`}>Delivery distance <output>{distance} km</output></label>
      <input id={`${id}-distance`} type="range" min="1" max="10" step="1" value={distance} onChange={(event) => updateInput(setDistance, event.target.value)} />
      <label htmlFor={`${id}-mass`}>Parcel mass <output>{mass} kg</output></label>
      <input id={`${id}-mass`} type="range" min="1" max="5" step="1" value={mass} onChange={(event) => updateInput(setMass, event.target.value)} />
    </div>
    <p><strong>Feature vector:</strong> [{distance}, {mass}] · <strong>Weights:</strong> [3, 2] · <strong>Baseline:</strong> 5</p>
    <form onSubmit={(event) => { event.preventDefault(); if (validAnswer) setSubmitted(true); }}>
      <label htmlFor={`${id}-answer`}>Your predicted bill (coins)</label>
      <div className="prediction-answer-row"><input id={`${id}-answer`} type="number" step="any" value={answer} onChange={(event) => { setAnswer(event.target.value); setSubmitted(false); }} />
        <button type="submit" disabled={!validAnswer}>Check my prediction</button></div>
    </form>
    {submitted && <div className={`gentle-feedback ${correct ? "correct" : "incorrect"}`} role="status" aria-label="Prediction feedback">
      <strong>{correct ? "That’s right." : "Not quite—let’s check the three parts."}</strong>
      <p>{feedback}</p>
      <ol><li>Distance: {distance} km × 3 coins/km = {distanceContribution} coins.</li><li>Mass: {mass} kg × 2 coins/kg = {massContribution} coins.</li><li>Prediction: {distanceContribution} + {massContribution} + 5 = <strong>{prediction} coins</strong>.</li></ol>
      <p>Keep mass fixed and add 1 km: the prediction increases by 3 coins. Try a new delivery to check that relationship.</p>
      <button type="button" className="text-button" onClick={() => { setAnswer(""); setSubmitted(false); }}>Try again</button>
    </div>}
  </section>;
}
