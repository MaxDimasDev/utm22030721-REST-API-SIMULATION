const fs = require('fs');
const booksData = JSON.parse(fs.readFileSync('books.json'));

const formatResponse = (data) => ({ code: data.code, data: data.data });

const getBook = (titleOrIsbn) => {
    const book = booksData.find((book) => book.title === titleOrIsbn || book.ISBN === titleOrIsbn);
    return formatResponse({ code: 200, data: book });
};

const getBooks = () => formatResponse({ code: 200, data: booksData });

const addBook = (newBook) => {
    const addedBook = { ...newBook, id: booksData.length + 1 };
    booksData.push(addedBook);
    return formatResponse({ code: 201, data: [addedBook, booksData] });
};

const removeBookByTitleOrISBN = (titleOrIsbn) => {
    const index = booksData.findIndex((book) => book.title === titleOrIsbn || book.ISBN === titleOrIsbn);
    const deletedBook = booksData.splice(index, 1)[0];
    return formatResponse({ code: 200, data: { deletedBook, newBooks: booksData } });
};

const filterBy = (filterProperty, filterString) => {
    const filteredBooks = booksData.filter((book) => {
        if (book[filterProperty]) {
            return book[filterProperty].toLowerCase().includes(filterString.toLowerCase());
        }
        return false;
    });
    return formatResponse({ code: 200, data: filteredBooks });
};

const listBooks = () => {
    const listedBooks = booksData.map((book) => `${book.title} - ${book.author} - ${book.year}`);
    return formatResponse({ code: 200, data: listedBooks });
};

const getBooksByYear = (year) => {
    const booksByYear = booksData.filter((book) => book.year === year);
    return formatResponse({ code: 200, data: booksByYear });
};

const genreFullAvailability = (genre) => {
    const allAvailable = booksData.every((book) => book.genre === genre && book.stock);
    return formatResponse({ code: 200, data: allAvailable });
};

const genrePartialAvailability = (genre) => {
    const atLeastOneAvailable = booksData.some((book) => book.genre === genre && book.stock);
    return formatResponse({ code: 200, data: atLeastOneAvailable });
};

const getCountBy = (countProperty) => {
    const count = booksData.reduce((counter, book) => {
        counter[book[countProperty]] = (counter[book[countProperty]] || 0) + 1;
        return counter;
    }, {});
    return formatResponse({ code: 200, data: count });
};

// Test functions
console.log(getBook("9781408855652"));
console.log(getBooks());
console.log(addBook({ title: "New Book", ISBN: "1234567890", year: 2024 }));
console.log(removeBookByTitleOrISBN("9781408855652"));
console.log(filterBy("genre", "Fantasy"));
console.log(listBooks());
console.log(getBooksByYear(2018));
console.log(genreFullAvailability("Self-help"));
console.log(genrePartialAvailability("Non-Fiction"));
console.log(getCountBy("genre"));