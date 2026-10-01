import React, { useId, useState } from "react";
import { BlockMath } from "./Math.jsx";
import { cafeMatrixExample } from "../content/matrixMatrixLesson.js";

export default function MatrixProductCellLab() {
  const id = useId();
  const [sandwichPrice, setSandwichPrice] = useState(3);
  const [cell, setCell] = useState([0, 0]);
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [revealed, setRevealed] = useState({});
  const { orders, items, shops } = cafeMatrixExample;
  const prices = cafeMatrixExample.prices.map((values, row) => values.map((value, column) => row === 0 && column === 0 ? sandwichPrice : value));
  const [row, column] = cell;
  const quantities = orders[row];
  const priceColumn = prices.map((values) => values[column]);
  const contributions = quantities.map((quantity, index) => quantity * priceColumn[index]);
  const total = contributions.reduce((sum, value) => sum + value, 0);
  const numericAnswer = Number(answer);
  const validAnswer = answer.trim() !== "" && Number.isFinite(numericAnswer);
  const correct = numericAnswer === total;
  const wrongRowTotal = quantities.reduce((sum, quantity, index) => sum + quantity * prices[column][index], 0);
  const feedback = correct ? "You matched the order's quantities with the chosen shop's price column and added both item contributions."
    : numericAnswer === contributions[0] ? "That pays for the sandwiches only. Include the juice contribution before adding the bill."
      : numericAnswer === contributions[1] ? "That pays for the juice only. Include the sandwich contribution too."
        : numericAnswer === wrongRowTotal ? "That result uses a row of B. A shop's prices run down a column of B: one price for each item. Pair that column with the order row."
          : "Use the highlighted order row and shop column. Multiply the matching item quantities and prices, then add the two contributions.";

  function clearAttempt() { setAnswer(""); setSubmitted(false); }
  function checkAnswer(event) {
    event.preventDefault();
    if (!validAnswer) return;
    setSubmitted(true);
    setRevealed((current) => ({ ...current, [`${row}-${column}`]: total }));
  }

  return <section className="matrix-product-lab" aria-labelledby={`${id}-title`}>
    <p className="section-label">Predict a cell and build the output table</p>
    <h3 id={`${id}-title`}>Price an order at a chosen shop</h3>
    <p>Choose a cell of C below. Its order selects a row of A; its shop selects a column of B. Calculate the bill before checking. A checked cell stays visible so you can build the whole table.</p>
    <div className="matrix-product-inputs">
      <div className="matrix-table-scroll"><table><caption>A · item quantities in each order</caption>
        <thead><tr><th scope="col">Order</th>{items.map((item) => <th scope="col" key={item}>{item}</th>)}</tr></thead>
        <tbody>{orders.map((values, index) => <tr key={index} className={index === row ? "selected-row" : ""}><th scope="row">Order {index + 1}</th>{values.map((value, index) => <td key={index}>{value}</td>)}</tr>)}</tbody>
      </table></div>
      <div className="matrix-table-scroll"><table><caption>B · prices in coins per item</caption>
        <thead><tr><th scope="col">Item</th>{shops.map((shop, index) => <th scope="col" key={shop} className={index === column ? "selected-column" : ""}>{shop}</th>)}</tr></thead>
        <tbody>{prices.map((values, index) => <tr key={index}><th scope="row">{items[index]}</th>{values.map((value, index) => <td key={index} className={index === column ? "selected-column" : ""}>{value}</td>)}</tr>)}</tbody>
      </table></div>
    </div>
    <div className="matrix-table-scroll"><table><caption>C = AB · choose an order–shop bill to calculate (coins)</caption>
      <thead><tr><th scope="col">Order</th>{shops.map((shop) => <th scope="col" key={shop}>{shop}</th>)}</tr></thead>
      <tbody>{orders.map((_, i) => <tr key={i}><th scope="row">Order {i + 1}</th>{shops.map((_, j) => <td key={j}><button type="button" className={`matrix-cell ${i === row && j === column ? "selected" : ""}`} aria-label={`Calculate order ${i + 1} at shop ${j + 1}`} aria-pressed={i === row && j === column} onClick={() => { setCell([i, j]); clearAttempt(); }}>{revealed[`${i}-${j}`] ?? "?"}</button></td>)}</tr>)}</tbody>
    </table></div>
    <p><strong>Selected order row:</strong> [{quantities.join(", ")}] · <strong>Selected shop column:</strong> [{priceColumn.join(", ")}]</p>
    <BlockMath>{`C_{${row + 1}${column + 1}}=${quantities[0]}\\times${priceColumn[0]}+${quantities[1]}\\times${priceColumn[1]}`}</BlockMath>
    <form onSubmit={checkAnswer}>
      <label htmlFor={`${id}-answer`}>Your predicted cell value (coins)</label>
      <div className="prediction-answer-row"><input id={`${id}-answer`} type="number" step="any" value={answer} onChange={(event) => { setAnswer(event.target.value); setSubmitted(false); }} /><button type="submit" disabled={!validAnswer}>Check cell value</button></div>
    </form>
    {submitted && <div className={`gentle-feedback ${correct ? "correct" : "incorrect"}`} role="status" aria-label="Matrix product feedback">
      <strong>{correct ? "That’s right." : "Let’s check the item contributions."}</strong><p>{feedback}</p>
      <ol><li>Sandwiches: {quantities[0]} × {priceColumn[0]} = {contributions[0]} coins.</li><li>Juice: {quantities[1]} × {priceColumn[1]} = {contributions[1]} coins.</li><li>Add the bill: {contributions[0]} + {contributions[1]} = <strong>{total} coins</strong>, in row {row + 1}, column {column + 1} of C.</li></ol>
      <button type="button" className="button secondary" onClick={clearAttempt}>Try this cell again</button>
    </div>}
    <div className="matrix-product-price"><label htmlFor={`${id}-price`}>Shop 1 sandwich price (coins per sandwich)<output>{sandwichPrice}</output></label><input id={`${id}-price`} type="range" min="1" max="5" step="1" value={sandwichPrice} onChange={(event) => { setSandwichPrice(Number(event.target.value)); clearAttempt(); setRevealed({}); }} /></div>
    <p>Now change shop 1's sandwich price. A 1-coin increase raises order 1's shop 1 bill by 2 coins and order 2's by 1 coin, because they contain different sandwich quantities. Shop 2's bills stay the same. Changing the price clears the checked table so you can predict again.</p>
  </section>;
}
