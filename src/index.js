import './style.css';
import { addScore, getScore } from './apiCall.js';

const refreshBtn = document.getElementById('refresh');
const form = document.getElementById('form');
const scoresList = document.querySelector('.scoreList');
const name = document.getElementById('name');
const score = document.getElementById('score');
const loadScores = () => {
  getScore().then((data) => {
    const scores = data.result;
    scoresList.innerHTML = '';
    scores.forEach((item) => {
      scoresList.innerHTML += `<li>${item.user}: ${item.score}</li>`;
    });
  });
};

refreshBtn.addEventListener('click', () => {
  loadScores();
});

window.addEventListener('load', () => {
  loadScores();
});

form.addEventListener('submit', async (e) => {
  const success = document.querySelector('.success');
  e.preventDefault();
  await addScore(name.value, score.value).then(() => {
    success.textContent = `${name.value}'s score added successfully!`;
    setTimeout(() => {
      success.textContent = '';
    }, 2500);
  });
  form.reset();
  loadScores();
});
