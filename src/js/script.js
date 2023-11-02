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
            thisBook.initActions();
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
        initActions(){
            const thisBook = this;
            thisBook.DOM.image.addEventListener('dblclick', function() {
                thisBook.toggleFavorite();
            });
            thisBook.DOM.image.addEventListener('click', (event) => {
                event.preventDefault();
            });
            console.log(thisBook.DOM.image);
        }
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
        },
        initBooks: function(){
            for (const data of dataSource.books){
                new Book(data);
            }
        },
        favoriteBooks: [],
    };
    app.init();
}