let input = document.getElementById('textarea');

let timeout = null;

input.addEventListener('keyup', function (e) {
  clearTimeout(timeout);

  timeout = setTimeout(function () {
    let text = input.value;
    updateTextNumbers(
      countWords(text),
      text.length,
      countSentences(text),
      countParagraphs(text)
    );
  }, 1000);
});

function countWords(text) {
  let words = 0;
  if (text.length > 0) words++;
  for (let i = 0; i < text.length; i++) {
    if (i !== text.length - 1) {
      if (
        text[i] === ' ' &&
        text[i + 1] !== ' ' &&
        text[i + 1] !== '.' &&
        text[i + 1] !== '!' &&
        text[i + 1] !== '?' &&
        text[i + 1] !== ','
      ) {
        {
          words++;
        }
      }
    }
  }
  return words;
}
function countSentences(text) {
  text = text.toLowerCase();
  let sentences = 0;
  if (text.length > 0) sentences++;
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '.') {
      for (let j = i + 1; j < text.length; j++) {
        if (
          text[j].charCodeAt(0) > 'a'.charCodeAt(0) - 1 &&
          text[j].charCodeAt(0) < 'z'.charCodeAt(0) + 1
        ) {
          sentences++;
          break;
        }
      }
    }
  }
  return sentences;
}

function countParagraphs(text) {
  let paragraphs = 0;
  if (text.length > 0) paragraphs++;
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '\n') {
      for (let j = i + 1; j < text.length; j++) {
        if (
          text[j].charCodeAt(0) > 'a'.charCodeAt(0) - 1 &&
          text[j].charCodeAt(0) < 'z'.charCodeAt(0) + 1
        ) {
          paragraphs++;
          break;
        }
      }
    }
  }
  return paragraphs;
}

function updateTextNumbers(words, characters, sentences, paragraphs) {
  document.getElementById('words').textContent = words;
  document.getElementById('characters').textContent = characters;
  document.getElementById('sentences').textContent = sentences;
  document.getElementById('paragraphs').textContent = paragraphs;
  HandleReadingTime(words);
}

function HandleReadingTime(words) {
  // Based on average english language reading speed of 275 words per minute.
  let time = Math.floor(words / (275 / 60));
  let readingTimeText = document.getElementById('readingTime');
  let seconds = 0;
  let minutes = 0;
  let hours = 0;

  seconds = time % 60;
  time = Math.floor(time / 60);
  minutes = time % 60;
  time = Math.floor(time / 60);
  hours = time % 60;

  readingTimeText.textContent = '';
  if (hours < 10) {
    readingTimeText.textContent += '0' + hours + ':';
  } else {
    readingTimeText.textContent += hours + ':';
  }
  if (minutes < 10) {
    readingTimeText.textContent += '0' + minutes + ':';
  } else {
    readingTimeText.textContent += minutes + ':';
  }
  if (seconds < 10) {
    readingTimeText.textContent += '0' + seconds;
  } else {
    readingTimeText.textContent += seconds;
  }
}
