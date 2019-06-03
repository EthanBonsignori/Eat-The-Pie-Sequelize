// Document ready
$(function () {
  // Click listener for devour button
  $('.change-devoured').on('click', function (e) {
    const id = $(this).attr('id')
    const state = $(this).attr('state')

    const newDevouredState = {
      devoured: state
    }

    console.log(newDevouredState)
    // Send PUT request based on id
    $.ajax(`/api/pies/${id}`, {
      type: 'PUT',
      data: newDevouredState
    }).then(() => {
      console.log('Devoured state changed to:', state)
      // reload the page to get the updates
      window.location.reload()
    })
  })

  // Create new pie form
  $('.pie-form').on('submit', function (e) {
    e.preventDefault()

    const newPie = {
      pie_name: $('#pie-name').val().trim().toLowerCase()
    }
    console.log('new pie', newPie)
    // Send POST request
    $.ajax('/api/pies', {
      type: 'POST',
      data: newPie
    }).then(() => {
      console.log('Created new pie!')
      window.location.reload()
    })
  })

  // Delete pie button
  $('.delete-pie').on('click', function (e) {
    const id = $(this).attr('id')
    // Send DELETE request
    $.ajax(`/api/pies/${id}`, {
      type: 'DELETE'
    }).then(() => {
      console.log('Deleted pie:', id)
      // Reload the page to get the updated list
      window.location.reload()
    })
  })
})
