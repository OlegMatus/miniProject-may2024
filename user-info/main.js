const getUserById = async () => {
    try {
        let user = JSON.parse(localStorage.getItem('user'));

        if (!user || !user.id) {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`);
            user = await response.json();
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            const userBlock = document.getElementsByClassName('info-container')[0];
            const userList = document.createElement('ul');

            ulCreatorRecursive(user, userList);
            userBlock.appendChild(userList);
        }
    } catch (e) {
        console.error('Error fetching user list', e);
    }
}
const liCreator = (key, value, parent) => {
    const liElement = document.createElement('li');
    liElement.classList.add('liElements-block');
    liElement.innerHTML = `<b>${key}</b>: <b style="color: goldenrod">${value}</b> `;

    parent.appendChild(liElement);
}

const ulCreator = (key, object, parent) => {
    const ulElement = document.createElement('ul');
    const liElement = document.createElement('li');

    liElement.innerHTML = `<b>${key}</b>`
    ulElement.classList.add('ulElements-block');

    parent.appendChild(liElement);
    ulCreatorRecursive(object, ulElement);
    liElement.appendChild(ulElement);
}

const ulCreatorRecursive = (object, parent) => {
    for (const objectKey in object) {
        if (object[objectKey] && typeof object[objectKey] === 'object') {
            ulCreator(objectKey, object[objectKey], parent);
        } else {
            liCreator(objectKey, object[objectKey], parent);
        }
    }
}
const getPostOfCurrentUser = async () => {
    try {
        let user = JSON.parse(localStorage.getItem('user'));

        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`);
        const posts = await response.json();

        const table = document.createElement('table');
        table.classList.add('table-block');

        const postsContainer = document.getElementsByClassName('postsOfCurrentUser')[0];
        postsContainer.innerHTML = '';

        let row;
        posts.map((post, index) => {
            if (index % 5 === 0) {
                row = document.createElement('tr');
                table.appendChild(row);
            }
            const cell = document.createElement('td');
            const buttonPost = document.createElement('button');

            buttonPost.classList.add('button-show-details');
            cell.classList.add('cell');

            buttonPost.innerText = 'Get Full Post';
            cell.innerHTML = `<b>Title:${index + 1}</b> ${post.title}`;

            buttonPost.onclick = () => {
                location.href = `../post-info/post-details.html?postId=${post.id}`;
            }

            row.appendChild(cell);
            cell.appendChild(buttonPost);
        })
        postsContainer.append(table);
    } catch (e) {
        console.error('Error fetching posts:', e);
    }
}

const buttonOfUserPost = document.getElementById('button-post');
if (buttonOfUserPost) {
    buttonOfUserPost.addEventListener('click', getPostOfCurrentUser);
}

void getUserById();

