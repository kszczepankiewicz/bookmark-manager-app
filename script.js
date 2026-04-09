const mainSection = document.getElementById('main-section');
const formSection = document.getElementById('form-section');
const addBookmarkButton = document.getElementById('add-bookmark-button');
const deleteBookmarkButton = document.getElementById('delete-bookmark-button');
const addBookmarkButtonForm = document.getElementById('add-bookmark-button-form');
const closeFormButton = document.getElementById('close-form-button');
const closeListButton = document.getElementById('close-list-button');
const viewCategoryButton = document.getElementById('view-category-button');

const categoryDropdown = document.getElementById('category-dropdown');
const categoryName = document.querySelectorAll('.category-name');
const categoryList = document.querySelector('#category-list');
const bookmarkName = document.querySelector('#name');
const url = document.querySelector('#url');
const bookmarkListSection = document.querySelector('#bookmark-list-section');

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
    categoryName.forEach(el => el.innerText = categoryDropdown.value);
    displayOrCloseForm();
})

closeFormButton.addEventListener('click', (e) => {
    displayOrCloseForm();
})

addBookmarkButtonForm.addEventListener('click', (e) => {
    const bookmarks = getBookmarks();
    try {
        new URL(url.value);
    } catch {
        alert('Invalid url');
    }
    bookmarks.push(({ 'name': bookmarkName.value, 'category': categoryDropdown.value, 'url': url.value }));
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    bookmarkName.value = '';
    url.value = '';
    displayOrCloseForm();
})

const displayOrHideCategory = () => displayOrCloseForm();

const generateCategoryList = (bookmarks) => bookmarks.map(({ name, category, url }) => `<input type='radio' id='${name}' value='${name}' name='${category}'><label for='${name}'><a href='${url}'>${name}</a></label>`).join('\n');

const viewCategory = () => {
    const bookmarks = getBookmarks().filter(b => b.category === categoryDropdown.value);
    if (!bookmarks.length) {
        categoryList.innerHTML = `<p>No Bookmarks Found</p>`;
        return;
    }
    categoryList.innerHTML = generateCategoryList(bookmarks);
}

viewCategoryButton.addEventListener('click', (e) => {
    mainSection.classList.toggle('hidden');
    bookmarkListSection.classList.toggle('hidden');
    viewCategory();
});

closeListButton.addEventListener('click', (e) => {
    mainSection.classList.toggle('hidden');
    bookmarkListSection.classList.toggle('hidden');
})

deleteBookmarkButton.addEventListener('click', (e) => {
    const selectedInput = document.querySelector('input[type="radio"]:checked');
    if (!selectedInput) {
        alert(`No Bookmarks Found`);
        return;
    }
    const bookmarks = getBookmarks();
    let index = bookmarks.findIndex(({ name, category }) => name === selectedInput.id && category === categoryDropdown.value);
    bookmarks.splice(index, 1);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    viewCategory();
})
