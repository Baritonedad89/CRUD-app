$(document).ready(function () {
  const submitButton = $('#submit-btn');


  // get all the post at the beginning of site load 
  const getAllPosts = () => {
    $.get('/api/posts/', (data) => {

      console.log(data)
      for (let i = 0; i < data.length; i++) {
        const row = $("<div>");
        row.append(`
    <div class='card mt-5' id="blog-${data[i].id}" data-id=${data[i].id}>
    <div class="card-header">Date created: ${moment(data[i].createdAt).format('h:mma on dddd')}</div>
    <div class="card-body">
    <h5 class="card-title">Author: ${data[i].author}</h5>
    <p class="card-text text-box" data-id=${data[i].id} id="text-${data[i].id}">${data[i].text}</p>
    <button id='update' class='btn btn-primary' data-id=${data[i].id} type='button'>Update</button>
    <button id='delete' class='btn btn-danger' data-id=${data[i].id} type='button'>delete</button>
  </div>
</div>
`)
        $("#blog-entries").prepend(row);


      }

    });
  };
  getAllPosts();

  //  submit new post to database and display 
  $(submitButton).on('click', (event) => {
    event.preventDefault();


    const newPost = {
      firstName: $('#first-name').val().trim(),
      lastName: $('#last-name').val().trim(),
      text: $('#text-field').val().trim(),
      created_at: moment().format('h:mma on dddd')
    };

    $.post('/api/posts', newPost)
      .then(() => {

        const row = $("<div>");
        row.append(`
    <div class='card mt-5' id="blog-${newPost.id}" data-id=${newPost.id}>
    <div class="card-header">
    Date created: ${newPost.created_at}
    </div>
    <div class="card-body">
    <h5 class="card-title">Author: ${newPost.firstName} ${newPost.lastName}</h5>
    <p class="card-text text-box" data-id=${newPost.id}id="text-${newPost.id}">${newPost.text}</p>
    <button id='update' class='btn btn-primary' data-id=${newPost.id} type='button'>Update</button>
    <button id='delete' class='btn btn-danger' data-id=${newPost.id} type='button'>delete</button>
  </div>
</div>
`);
        $("#blog-entries").prepend(row);
        getAllPosts();



      })
    $('#first-name').val("");
    $('#last-name').val("");
    $('#text-field').val("");
  });


  // delete
  $(document).on('click', 'button#delete', function () {

    let id = $(this).attr('data-id');
    console.log('id', id)

    $.ajax({
      method: "DELETE",
      url: `/api/posts/${id}`
    })
      .then(function (data) {
        const blogTodelete = $(`#blog-${id}`);
        $(blogTodelete).remove();

        console.log('data', data);
      });

  });


  $(document).on('click', 'p.text-box', function () {
    const id = $(this).attr('data-id');
    console.log('id', id);

    $(this).attr('contenteditable', 'true');
    const currentText = $(this).text();
    console.log(currentText);

    $(document).on('click', `button[data-id=${id}]`, function () {
      const updatedText = {
        id: id,
        text: $(`#text-${id}`).text()
      };

      $.ajax({
        method: "PUT",
        url: `/api/posts`,
        data: updatedText
      }).then(function (data) {
        console.log('updated text', data)

      });
    })



  })
  
});
