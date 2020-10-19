'use strict';

function PhotoInfo(data){
    this.image = data.image_url;
    this.title = data.title;
    this.description = data.description;
    this.keyword = data.keyword;
    this.horns = data.horns;

}

PhotoInfo.prototype.renderData = function(){
    let photoClone = $('#htmlrender').clone();
    $('main').append(photoClone);
    photoClone.find('img').attr('src',this.image);
    photoClone.find('h2').text(this.title);
    photoClone.find('p').text(this.description);
    photoClone.find('p').text(`the number of horns is:${this.horns}`);
};


const ajaxSettings = {
    method: 'get',
    dataType: 'json',
};
$.ajax('./data/page-1.json', ajaxSettings).then((data)=>{
    data.forEach(data1 => {
        let allData = new PhotoInfo(data1);
        allData.renderData();
        allData.options();
    });
    optionsRender();
});


const keywords = [];
PhotoInfo.prototype.options = function () {
  if(keywords.indexOf(this.keyword) === -1){
    keywords.push(this.keyword);
  }
  console.log(keywords);
};
let optionsRender = () => {
  for (let i = 0; i < keywords.length; i++) {
    $('#animal-images').append(`<option value="${keywords[i]}" id="${keywords[i]}" class='option'> ${keywords[i]} </option>`);
  }
};

$('#animal-images').click((event) => {
    if ( event.target.value !== $('#animal-images').attr('id')){
      for (let i = 0; i < keywords.length; i++) {
        console.log(event.target.value);
        if(event.target.value === keywords[i] || event.target.value === 'default'){
          $(`.${keywords[i]}`).show();
        }else{
          $(`.${keywords[i]}`).hide();
        }
      }
    }
  });