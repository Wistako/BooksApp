/* eslint-disable no-debugger */
/* global Handlebars, utils, dataSource */
{
  'use strict';

  const select = {
    templateOf: {
      book: '#template-book',
    },
    filtersForm: {
      wrapper: '.filters',
      inputAdults: '.filters input[value="adults"]',
      inputNonFiction: '.filters input[value="nonFiction"]',
    },
    booksPanel: {
      bookList: '.books-panel .books-list',
    },
    book:{
      image: '.book__image',
    }
  };
  // const classNames = {

  // }
  // const settings = {

  // }
  const templates = {
    book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };
  class Book{
    constructor(data){
      const thisBook = this;
      thisBook.data = data;
      thisBook.renderBooks();
      thisBook.getElements();
      // thisBook.initActions();
    }
    renderBooks(){
      const thisBook = this;
      const bookList = document.querySelector(select.booksPanel.bookList);
      const generatedHTML = templates.book(thisBook.data);
      thisBook.element = utils.createDOMFromHTML(generatedHTML);
      bookList.appendChild(thisBook.element);
    }
    getElements(){
      const thisBook = this;
      thisBook.DOM = {};
      thisBook.DOM.image = thisBook.element.querySelector(select.book.image);
    }
    // initActions(){
    //     const thisBook = this;
    //     thisBook.DOM.image.addEventListener('dblclick', function() {
    //         thisBook.toggleFavorite();
    //     });
    //     thisBook.DOM.image.addEventListener('click', (event) => {
    //         event.preventDefault();
    //     });
    //     console.log(thisBook.DOM.image);
    // }
    toggleFavorite(){
      const thisBook = this;
      const id = thisBook.data.id;
      thisBook.DOM.image.classList.toggle('favorite');
      const flag = thisBook.DOM.image.classList.contains('favorite') && !app.favoriteBooks.includes(thisBook.data.id);
      if( flag ){
        app.favoriteBooks.push(id);
      } else if (!flag){
        const index = app.favoriteBooks.indexOf(id);
        app.favoriteBooks.splice(index, 1);
      }
      console.log(app.favoriteBooks);
    }
  }



  const app = {
    init: function(){
      const thisApp = this;
      console.log('*** App Starting ***');
      thisApp.initBooks();
      thisApp.getElements();
      thisApp.initActions();
    },
    initBooks: function(){
      const thisApp = this;
      thisApp.books = [];
      for (const data of dataSource.books){
        thisApp.books.push(new Book(data));
      }
    },
    getElements: function(){
      const thisApp = this;
      thisApp.DOM = {};
      thisApp.DOM.bookList = document.querySelector(select.booksPanel.bookList);
      thisApp.DOM.booksImage = thisApp.DOM.bookList.querySelectorAll(select.book.image);
      thisApp.DOM.filtersForm = document.querySelector(select.filtersForm.wrapper);
    },
    initActions: function(){
      const thisApp = this;
      thisApp.DOM.bookList.addEventListener('dblclick', (e) =>{
        thisApp.toggleFavorite(e);
      });
      thisApp.DOM.bookList.addEventListener('click', (e) =>{
        e.preventDefault();
      });
      thisApp.DOM.filtersForm.addEventListener('click', (e) =>{
        thisApp.filterValue(e);
        thisApp.filterBooks();
      });
    },
    toggleFavorite(e){
      const thisApp = this;
      const clickedImage = e.target.offsetParent;
      const id = clickedImage.getAttribute('data-id');
      clickedImage.classList.toggle('favorite');
      const flag = clickedImage.classList.contains('favorite') && !thisApp.favoriteBooks.includes(id);
      if( flag ){
        thisApp.favoriteBooks.push(id);
      } else if (!flag){
        const index = thisApp.favoriteBooks.indexOf(id);
        thisApp.favoriteBooks.splice(index, 1);
      }
    },
    filterValue(e){
      const thisApp = this;
      const clickedFiltr = e.target;
      const flag = clickedFiltr.tagName == 'INPUT' && clickedFiltr.name == 'filter' && clickedFiltr.type == 'checkbox';
      const filtrFlag = clickedFiltr.checked && !thisApp.filters.includes(clickedFiltr.value);
      if(flag && filtrFlag){
        thisApp.filters.push(clickedFiltr.value);
      } else if (flag && !filtrFlag){
        const index = thisApp.filters.indexOf(clickedFiltr.value);
        thisApp.filters.splice(index, 1);
      }
      console.log(thisApp.filters);
    },
    filterBooks(){
      const thisApp = this;
      for(const book of thisApp.books){
        const details = book.data.details;
        let flag = false;
        for(const detail in details){
          if(thisApp.filters.includes(detail) && !details[detail]){
            flag = true;   
          }
        }
        if(flag){
          book.DOM.image.classList.add('hidden');
        } else {
          book.DOM.image.classList.remove('hidden');
        }
        flag = false;
      }
      
    },
    favoriteBooks: [],
    filters: [],
  };
  app.init();
}