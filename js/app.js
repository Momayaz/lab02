

'use strict';

function Photos(data) {
  this.image = data.image_url;
  this.title = data.title;
  this.descrip = data.description;
  this.keyWord = data.keyword;
  this.horn = data.horns;
}

$.ajax('../data/page-1.json', {
  method: 'get',
  dataType: 'json',
}).then(allData => {
  allData.forEach(allInfo => {
    let allPhotos = new Photos(allInfo);
    allPhotos.render();
    console.log(allPhotos);
  });
});
Photos.prototype.render = function () {
  let selectorEl = $('<option></option>').text(this.keyWord);
  $('select').append(selectorEl);
  let sectionEl = $('#section-template').clone();
  $('main').append(sectionEl);
  sectionEl.find('h2').text(this.title);
  sectionEl.find('img').attr('src', this.image);
  sectionEl.find('#description').text(this.descrip);
  sectionEl.find('#horns').text(`The number Of Horns Is: ${this.horn}`);
  sectionEl.attr('class', this.keyWord);


}

$('select').change(function () {
  let selected = this.value;
  $('section').hide();
  $(`.${selected}`).show();
  console.log(selected);
});
