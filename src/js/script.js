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
            image: '.book__image img',
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
            thisBook.getElements();
            thisBook.renderBooks();
            thisBook.initActions();
        }
        getElements(){
            const thisBook = this;
            thisBook.DOM = {};
            thisBook.DOM.bookList = document.querySelector(select.booksPanel.bookList);
        }
        renderBooks(){
            const thisBook = this;
            const generatedHTML = templates.book(thisBook.data);
            thisBook.element = utils.createDOMFromHTML(generatedHTML);
            thisBook.DOM.bookList.appendChild(thisBook.element);
        }
        initActions(){

        }
        toggleFavorite(){
            
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