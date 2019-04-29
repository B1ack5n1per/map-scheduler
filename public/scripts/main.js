// Variable Declarations

// Jquery Events
$('#levels > li').on('click', (event) => {
  $('#levels > li').removeClass('active');
  $(event.currentTarget).toggleClass('active');
  $('#imageContainer > img').attr('src', event.currentTarget.dataset.src);
})
