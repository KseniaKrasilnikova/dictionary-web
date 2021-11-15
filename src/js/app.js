import $ from 'jquery';
import { languages } from './data';

let currentLanguage = languages.NIVKH;
let words = null;
let currentWord = null;

$.getJSON('data/words.json', data => {
  words = data;
  currentWord = words[0];
  renderWords(words, currentLanguage, currentWord);
});

const languagesElement = $('#languages');

languagesElement.on('change', () => {
  currentLanguage = languages[languagesElement.val()];
  renderWords(words, currentLanguage, currentWord);
});

for (let languagesKey in languages) {
  const language = languages[languagesKey];
  const selected = language === currentLanguage ? ' selected' : '';
  languagesElement.append('<option' + selected + ' value=\'' + languagesKey + '\'>' + language.title + '</option>');
}

function renderWords(words, language, currentWord) {
  let listContainer = $('#words-list-container ul');
  listContainer.empty();
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
  currentWord = words.find(word => word.id > element.val());
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
  if (searchRequest === '') return;
  let filteredWords = words.filter(word => {
    try {
      return word.locales[currentLanguage.code].value.startsWith(searchRequest);
    } catch (e) {
      return false;
    }
  });
  renderWords(filteredWords, currentLanguage, currentWord);
}

$('#search-clear-btn').on('click', () => {
  $('#search-input').val('');
  renderWords(words, currentLanguage, currentWord);
});