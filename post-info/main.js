const url = new URL(location.href);
const postId = url.searchParams.get('postId');

const showDetailsOfPostById = async () => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const post = await response.json();
        if (post) {
            const postContainer = document.getElementsByClassName('info-container')[0];

            let {userId, id, title, body} = post;

            postContainer.innerHTML = `
            <div>UserId: <b style="color: goldenrod">${userId}</b></div>
            <div>Id: <b style="color: goldenrod">${id}</b></div>
            <div>Title: <b style="color: goldenrod">${title}</b></div>
            <div>Body: <b style="color: goldenrod">${body}</b></div>
            `;
        }
    } catch (e) {
        console.error('Error fetching post list', e);
    }
}

const getCommentsByPostId = async () => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const comments = await response.json();
        const commentsContainer = document.getElementsByClassName('comments-container')[0];
        const table = document.createElement('table');

        commentsContainer.innerHTML = '';

        table.classList.add('table-block');

        if (comments.length > 0) {
            let row;

            comments.forEach((comment, index) => {
                let {postId, id, name, email, body} = comment;

                if (index % 4 === 0) {
                    row = document.createElement('tr');
                    table.appendChild(row);
                }

                const cell = document.createElement('td');

                cell.classList.add('cell');

                cell.innerHTML = `
<div><b style="color: goldenrod"> postID: </b>${postId}</div>
<div><b style="color: goldenrod"> ID: </b>${id}</div>
<div><b style="color: goldenrod"> Name: </b>${name}</div>
<div><b style="color: goldenrod"> Email: </b>${email}</div>
<div><b style="color: goldenrod"> Body: </b>${body}</div>
`;
                row.appendChild(cell);
            })
            commentsContainer.appendChild(table);
        }
    } catch (e) {
        console.error('Error fetching comments:', e);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    void showDetailsOfPostById();
    void getCommentsByPostId();
})
