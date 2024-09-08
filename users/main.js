getAllUsers = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();

        const container = document.getElementsByClassName('users-container')[0];

        for (const user of users) {
            const {id, name} = user;

            const block = document.createElement('div');
            const btn = document.createElement('button');
            const buttonDiv = document.createElement('div');

            block.classList.add('user-block');
            btn.id = 'button-details';

            block.innerHTML = `<div>${id}</div> <div>${name}</div>`;
            btn.innerText = 'user-details';

            btn.onclick = () => {
                localStorage.setItem('user', JSON.stringify(user));
                location.href = `.././user-info/user-details.html`;
            }

            buttonDiv.appendChild(btn);
            block.appendChild(buttonDiv);
            container.appendChild(block);
        }
    } catch (e) {
        console.error('Error fetching users:', e);
    }
}
void getAllUsers()