const mainSection = document.getElementById('main-section');
const formSection = document.getElementById('form-section');
const addBookmarkButton = document.getElementById('add-bookmark-button');
const addBookmarkButtonForm = document.getElementById('add-bookmark-button-form');
const closeFormButton = document.getElementById('close-form-button');
const categoryDropdown = document.getElementById('category-dropdown');
const categoryName = document.querySelector('.category-name');
const bookmarkName = document.querySelector('#name');
const url = document.querySelector('#url');

const getBookmarks = () => {
    if (localStorage.getItem('bookmarks') === null) return []
    let bookmarks;
    try {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    } catch (error) {
        return []
    }
    if (!Array.isArray(bookmarks)) return [];
    const properties = ['name', 'category', 'url'];
    if (!bookmarks.every(obj => properties.every(p => obj.hasOwnProperty(p)))) return [];
    return bookmarks
}

const displayOrCloseForm = () => {
    mainSection.classList.toggle('hidden');
    formSection.classList.toggle('hidden');
}

addBookmarkButton.addEventListener('click', (e) => {
    categoryName.innerText = categoryDropdown.value;
    displayOrCloseForm();
})

closeFormButton.addEventListener('click', (e) => {
    displayOrCloseForm();
})

addBookmarkButtonForm.addEventListener('click', (e) => {
    const bookmarks = getBookmarks();
    bookmarks.push(({ 'name': bookmarkName.value, 'category': categoryDropdown.value, 'url': url.value }));
    debugger
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    bookmarkName.value = '';
    url.value = '';
    displayOrCloseForm();
})

const displayOrHideCategory = () => {
    displayOrCloseForm();

}