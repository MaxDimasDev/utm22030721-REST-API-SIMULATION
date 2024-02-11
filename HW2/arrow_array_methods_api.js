const books = [
    { title: "Book1", isbn: "111", genre: "Fiction", stock: true },
    { title: "Book2", isbn: "222", genre: "Non-Fiction", stock: false },
    { title: "Book3", isbn: "333", genre: "Fiction", stock: true },
];

const formatResponse = (data) => ({ code: data.code, data: data.data });

const getBook = (titleOrIsbn) => {
    const book = books.find((book) => book.title === titleOrIsbn || book.isbn === titleOrIsbn);
    return formatResponse({ code: 200, data: book });
};

const getBooks = () => formatResponse({ code: 200, data: books });

const addBook = (newBook) => {
    const addedBook = { ...newBook, id: books.length + 1 };
    books.push(addedBook);
    return formatResponse({ code: 201, data: [addedBook, books] });
};

const removeBookByTitleOrISBN = (titleOrIsbn) => {
    const [deletedBook, newBooks] = removeElement(books, (book) => book.title === titleOrIsbn || book.isbn === titleOrIsbn);
    return formatResponse({ code: 200, data: { deletedBook, newBooks } });
};

const filterBy = (filterProperty, filterString) => {
    const filteredBooks = books.filter((book) => {
        if (book[filterProperty]) {
            return book[filterProperty].toLowerCase().includes(filterString.toLowerCase());
        }
        return false;
    });
    return formatResponse({ code: 200, data: filteredBooks });
};

const listBooks = () => {
    const listedBooks = books.map((book) => `${book.title} - ${book.author} - ${book.year}`);
    return formatResponse({ code: 200, data: listedBooks });
};

const getBooksByYear = (year) => {
    const booksByYear = books.filter((book) => book.year === year);
    return formatResponse({ code: 200, data: booksByYear });
};

const genreFullAvailability = (genre) => {
    const allAvailable = books.every((book) => book.genre === genre && book.stock);
    return formatResponse({ code: 200, data: allAvailable });
};

const genrePartialAvailability = (genre) => {
    const atLeastOneAvailable = books.some((book) => book.genre === genre && book.stock);
    return formatResponse({ code: 200, data: atLeastOneAvailable });
};

const getCountBy = (countProperty) => {
    const count = books.reduce((counter, book) => {
        counter[book[countProperty]] = (counter[book[countProperty]] || 0) + 1;
        return counter;
    }, {});
    return formatResponse({ code: 200, data: count });
};

// Helper function to remove an element from an array
const removeElement = (array, predicate) => {
    const index = array.findIndex(predicate);
    if (index === -1) return [null, array];
    return [array.splice(index, 1)[0], array];
};

// Test functions
console.log(getBook("111"));
console.log(getBooks());
console.log(addBook({ title: "Oaxaqueños", author: "Mond Oaxaca", year: 2022 }));
console.log(removeBookByTitleOrISBN("111"));
console.log(filterBy("genre", "Fiction"));
console.log(listBooks());
console.log(getBooksByYear(2022));
console.log(genreFullAvailability("Fiction"));
console.log(genrePartialAvailability("Non-Fiction"));
console.log(getCountBy("genre"));