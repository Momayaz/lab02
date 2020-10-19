
'use strict';


function Horns (data) {
  this.image_url = data.image_url,
  this.title = data.title,
  this.description = data.description,
  this.keyword = data.keyword,
  this.horns = data.horns;

}

Horns.prototype.render = function () {

  let photoTemplateCloned = $('#photo-template').clone();
  $('main').append(photoTemplateCloned);
  

  photoTemplateCloned.html (

    `   
        <div class = "${this.keyword}">
        <h2>${this.title}</h2>
        <img src="${this.image_url}" alt="">
        <p id="dec">${this.description}</p>
        <p id="numHorns">number of horns is ${this.horns}</p>
        </div>
        
    `
  );


};

const ajaxSettings = {
  method: 'get',
  dataType: 'json'
};

$.ajax ('../data/page-1.json',ajaxSettings).then ( data => {
  data.forEach(element => {

    let horn = new Horns (element);
    horn.render();

    let optionEl = $(`<option value = "${horn.keyword}">${horn.keyword}</option>`);
    $('select').append(optionEl);


  });



});

$(document).ready(function(){
  $('select').on('change', function(event){

    let selected = event.target.value; 
    console.log(selected);

    $(`div`).hide();
    $(`.${selected}`).fadeIn(1000);

  });
});



