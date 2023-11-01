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
            thisBook.DOM.image.addEventListener('dbclick', () => {
                thisBook.toggleFavorite();
            });
        }
        toggleFavorite(){
            const thisBook = this;
            thisBook.DOM.image.classList.toggle('fovorite');
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
        }
    };
    app.init();
}