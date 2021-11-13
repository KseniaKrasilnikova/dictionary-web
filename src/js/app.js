import $ from 'jquery';
import { words, languages, currentLanguage } from './data';

$.getJSON('data/words.json', data => {
  words = data;
  renderWords(words, currentLanguage);
});


const languagesElement = $('#languages');

languagesElement.on("change", () => {
  currentLanguage = languages[languagesElement.val()];
  $('#words-list-container ul').empty()
  renderWords(words, currentLanguage);
});

for (let languagesKey in languages) {
  const language = languages[languagesKey];
  const selected = language === currentLanguage ? ' selected' : '';
  languagesElement.append('<option' + selected + ' value=\'' + languagesKey + '\'>' + language.title + '</option>');
}

function renderWords(words, language) {
  console.log(language);
  const items = [];
  words.forEach(word => {
    try {
      items.push('<li id=\'' + word.id + '\'><a class=\'list-group-item list-group-item-action\' href=\'#\'>' + word.locales[language.code].value + '</a></li>');
    } catch (e) {
    }
  });

  $('#words-list-container ul').append(items.join(''));
  $('#words-list-container ul > li:first-child > a').addClass('active');
}