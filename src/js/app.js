import $ from 'jquery';
import { languages } from './data';

let currentLanguage = languages.NIVKH;
let words = null;
let currentWord = null;

$.getJSON('data/words.json', data => {
  words = new Map(data.map(item => [item.id, {
    "id": item.id,
    "locales": {
      "ru": {
        "language": "RUSSIAN",
        "value": item.ru
      },
      "nv": {
        "language": "NIVKH",
        "value": item.nv,
        "audioPath": `/audio/${item.id}.mp3`
      },
      "en": {
        "language": "ENGLISH",
        "value": item.en
      }
    }
  }]));
  currentWord = words.get(data[0].id);
  renderWords(words, currentLanguage, currentWord);
});

const languagesElement = $('#languages');

languagesElement.on('change', () => {
  currentLanguage = languages[languagesElement.val()];
  renderWords(words, currentLanguage, currentWord);
});

let audio = null;
$('#play-word-btn').on('click', () => {
  try {
    if (audio !== null) {
      audio.pause();
    }
    audio = new Audio(`data/audio/${currentWord.id}.mp3`);
    audio.play();
  } catch (e) {
  }
});

for (let languagesKey in languages) {
  const language = languages[languagesKey];
  const selected = language === currentLanguage ? ' selected' : '';
  languagesElement.append('<option' + selected + ' value=\'' + languagesKey + '\'>' + language.title + '</option>');
}

function renderWords(words, language, currentWord) {
  let listContainer = $('#words-list-container ul');
  listContainer.empty();
  renderWordCard(currentWord);
  const items = [];
  words.forEach(word => {
    try {
      const active = currentWord === word ? 'active' : '';
      items.push(`<li value='${word.id}'><a class='list-group-item list-group-item-action ${active}'>${word.locales[language.code].value}</a></li>`);
    } catch (e) {
    }
  });

  listContainer.append(items.join(''));
  $('#words-list-container ul li').on('click', function() {
    onWordClicked($(this));
  });
}

function onWordClicked(element) {
  $('#words-list-container ul li > a.active').removeClass('active');
  element.find('a').addClass('active');
  currentWord = words.get(element.val().toString());
  renderWordCard(currentWord);
}

function renderWordCard(word) {
  $('.card-body .card-title, .card-text').remove();
  const items = [];
  Object.entries(word.locales).forEach(([key, locale]) => {
    if (key === languages.NIVKH.code) {
      $('.card-header').text(locale.value);
      return;
    }
    items.push(`<h4 class='card-title'>${key}</h4>
                <p class='card-text'>${locale.value}</p>`);
  });
  $('.card-body').append(items.join(''));
}

let debounce = null;
$('#search-input').keyup(() => {
  let request = $('#search-input').val();
  clearTimeout(debounce);
  debounce = setTimeout(function() {
    searchWords(request);
  }, 300);
});

function searchWords(searchRequest) {
  if (searchRequest === '') {
    renderWords(words, currentLanguage, currentWord);
    return;
  }
  let filteredWords = [];
  words.forEach(word => {
    try {
      if (word.locales[currentLanguage.code].value.startsWith(searchRequest)) {
        filteredWords.push(word);
      }
    } catch (e) {
    }
  });
  renderWords(filteredWords, currentLanguage, currentWord);
}

$('#search-clear-btn').on('click', () => {
  $('#search-input').val('');
  renderWords(words, currentLanguage, currentWord);
});

$('#about-button').on('click', () => {
  let linkElement = $("#about-button .nav-link");
  if (linkElement.hasClass('active')) return;
  linkElement.addClass('active');
  $("#get-started-button .nav-link").removeClass('active');
  $("#about").addClass('active');
  $("#get-started").removeClass('active');
});

$('#get-started-button').on('click', () => {
  let linkElement = $("#get-started-button .nav-link");
  if (linkElement.hasClass('active')) return;
  linkElement.addClass('active');
  $("#about-button .nav-link").removeClass('active');
  $("#get-started").addClass('active');
  $("#about").removeClass('active');
});