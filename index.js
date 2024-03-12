const posts = [];
const TITLE_VALIDATION_LIMIT = 100;
const TEXT_VALIDATION_LIMIT = 200;

const titleInputNode = document.querySelector('.js-newPost-title');
const textInputNode = document.querySelector('.js-newPost-text');
const newPostBtnNode = document.querySelector('.js-btnPost');
const publicPostTitle = document.querySelector('.js-publicPost_title');
const validationMessage = document.getElementById('validationMessage');

newPostBtnNode.addEventListener('click', function() {
    const postFromUser = getPostFromUser();
    
    addPost(postFromUser);

    renderPosts();
});

// проверка кол-ва символов
titleInputNode.addEventListener('input', function() {
    validation();
})

textInputNode.addEventListener('input', function() {
    validation();
})

function validation() {
    const titleLen = titleInputNode.value.length;
    const textLen = textInputNode.value.length;

    if (titleLen > TITLE_VALIDATION_LIMIT) {
        validationMessage.innerText = `Заголовок больше ${TITLE_VALIDATION_LIMIT} символов`
        validationMessage.classList.remove('validationMessage_hidden');
        return;
    }

    if (textLen > TEXT_VALIDATION_LIMIT) {
        validationMessage.innerText = `Пост больше ${TEXT_VALIDATION_LIMIT} символов`
        validationMessage.classList.remove('validationMessage_hidden');
        return;
    }

    validationMessage.classList.add('validationMessage_hidden');
}
// конец проверки

function getPostFromUser() {
    const title = titleInputNode.value;
    const text = textInputNode.value;

    return {
        title: title,
        text: text,
    };
};

function addPost({ title, text }) {
    const currentDate = new Date();
    let date = currentDate.getDate();
    let month = currentDate.getMonth();

    if (date < 10) {
        date = '0' + date;
    };

    if (month < 10) {
        month = '0' + (month + 1);
    };

    const dt = `${date}.${month}.${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}`;
    
    posts.push({
        dt,
        title,
        text
    }); 
};


function getPosts() {
    return posts;
};

function renderPosts() {
    const posts = getPosts();

    let postsHTML = '';

    posts.forEach(post => {
        postsHTML += `
        <div class='post'>
            <p class='post_date'>${post.dt}</p>
            <p class='post_title'>${post.title}</p>
            <p class='post_text'>${post.text}</p>
        </div>
    `
    });

    publicPostTitle.innerHTML = postsHTML;
};

