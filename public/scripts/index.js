$(() => {

  // Functionality of the "Refresh" button
  $('#refresh-button').click(function(event) {
    event.preventDefault();
    $('#refresh-button').empty().append('<span class="spinner-border spinner-border-sm"></span>');
    $.get('/api/scrape', () => location.reload());
  });

  // Functionality of the "Add Comment" button
  $('.comment-button').click(function(event) {
    event.preventDefault();
    const text = $(this).parent().parent().find('.comment-input').val().trim();
    const nickname = $(this).parent().parent().find('.nickname-input').val().trim();
    if (text === '' || nickname === '') return;
    const comment = {
      text,
      nickname
    };
    const articleId = $(this).data('id');
    $.post(`/api/comment/${articleId}`, comment, () => location.reload());
  });

  // Functionality of the "Delete" button
  $('.delete-button').click(function(event) {
    event.preventDefault();
    const commentId = $(this).data('id');
    $.ajax(`/api/comment/${commentId}`, {
      type: 'DELETE'
    }).then(() => location.reload());
  });

});
