let url = "http://localhost:8000/posts"
let postsList = document.querySelector('#postsList')
let getPostsBtn = document.querySelector('#getPostsBtn')
let form = document.forms.form

async function getPosts () {
    try {
        let response = await axios(url);
        let posts = response.data
        postsList.innerHTML = ''
        posts.forEach(post => {
            let li = document.createElement('li')
            li.innerText = `
            -------------------------------------------------
            UserId: ---- ${post.userId}
            Id: ---- ${post.id} 
            Title: ---- ${post.title} 
            Body: ---- ${post.body}
            
            `
            postsList.append(li)
            let delBtn = document.createElement('button')
            delBtn.innerText = "Delete"
            delBtn.addEventListener('click', () => {
                 deletePost(post.id)
            })
            li.appendChild(delBtn)
        })
    }
    catch(error) {
        console.error(error)
    }
}

getPostsBtn.addEventListener('click', getPosts)


function deletePost (id) {
    try {
        axios.delete(`${url}/${id}`)
        getPosts()
    }
    catch (error) {
        console.error(error);
    }
}

function createPost (title, body) {
    try {
        axios.post(url, {
            title: title,
            body: body,
            userId: 1
        })
    }
    catch (error) {
        console.error(error);
    }
}

function createForm (event) {
    event.preventDefault()
    let title = document.querySelector('#titleInput').value
    let body = document.querySelector('#bodyInput').value
    createPost (title, body)
    getPosts()
}

form.addEventListener('submit', createForm)