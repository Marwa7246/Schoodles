

$(document).ready(function () {
  $("#html-container").append(landingHTML);

  function deleteBookie(value) {
    $.ajax({method: 'DELETE', url: `/api/polls/${value}`})
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }


  // $.ajax({ method: 'POST', url: apiURL, data: data })
  //     .then(() => $('#tweets-container').empty())
  //     .then(loadTweets);


  console.log("connected");


  $('#create-bookie').on('click', landingToForm);

  function landingToForm() {
    $('#create-bookie').off()
    $('#html-container').empty()

    $('#html-container').append(formPage)
    $('#add-timeslot').click(timeManager)

    $('#form-submission').submit(function(event){
      event.preventDefault();
      $.ajax({
        type: 'POST',
        url: '/api/polls',
        data: bookieObjectBuilder(event),
        success: function(response) {
          formToVote()
        }
      });

    })
  }

  function formToVote() {
    $('#html-container').empty()
    $('#html-container').append(preVotePage)
    $('#add-timeslot').off()
    $('#main-form-button').off()
    $('#create-bookie').off()
    $('#delete-bookie').on("click", function () {
      deleteBookie(id)
    });
    $('#copy-bookie').click(function() {
      copyToClipboard('test');
    })


    // THIS MAY BE A PROBLEM IF DB IS DIFFRENT RESPONSE
    // $('#delete-bookie').click(,deleteBookie(id));
  }




  function bookieObjectBuilder(event) {
    event.preventDefault();

    let bookieData = $(event.target).find(".form-control").serializeArray();
    let timeSlots = $(event.target).find(".time-slot").serializeArray();
    console.log(bookieData, timeSlots);
    const arrayToObjectBookie = (array, keyField) =>
      array.reduce((obj, item) => {
        obj[item[keyField]] = item;
        return obj;
      }, {});

    const arrayToObjectTime = (array, keyField1, key2) =>
      array.reduce((obj, item) => {
        obj[item[keyField1] + "-" + item[key2]] = item;
        return obj;
      }, {});

    bookieData = arrayToObjectBookie(bookieData, "name");

    for (let i = 0; i < timeSlots.length; i++) {
      if (i < 4) {
        timeSlots[i].time_slot_id = 1;
      } else if (i > 3 && i <= 7) {
        timeSlots[i].time_slot_id = 2;
      } else if (i > 7 && i < 12) {
        timeSlots[i].time_slot_id = 3;
      } else {
        timeSlots[i].time_slot_id = 4;
      }
    }
    timeSlots = arrayToObjectTime(timeSlots, "time_slot_id", "name");
    bookieData.time_slots = timeSlots;
    console.log(bookieData);
    bookieData.url = generateRandomUrl(32);
    bookieData.token = generateRandomString(4);
    return bookieData;


  }

  const timeManager = function () {
    event.preventDefault();

    const noOfRows = $("#time-slot-container div").length + 1;
    console.log(noOfRows);

    if (noOfRows < 5) {
      $("#time-slot-container").append(function () {
        let timeslot = `  <article id="time-slot-container">
        <div class="row">
          Event starts:
          <input class="time-slot" type="date" name="start_date" />
          <span>

          </span>
          <input class="time-slot" type="time" name="start_time" />
          <span>

          </span>
          Event ends:
          <input class="time-slot" type="date" name="end_date" />
          <span>

          </span>
          <input class="time-slot" type="time" name="end_time" />
          <span>

        </div>
      </article>`;

        return timeslot;
      });
    }
  };

  //Check if the url has any string after localhost:8080/
  //If search query found---> go to the vote page(make the botton appear )
  //If not---> load the landing page configuration
  // $('#go-to-home-page').hide(0);
  // const urlString = window.location.pathname.slice(1);
  // console.log(('urlstring: '+ urlString));

  // if (urlString) {
  //   console.log(('urlstring after if statement: '+ urlString));
  //   const $url = $(`<h5 class="card-title">${urlString}</h5>`);

  // $('.card-title').replaceWith($url);
  // $('#go-to-home-page').show();
  // }

  // $('#go-to-home-page').on('click', function() {
  //   console.log( "went to landing page" );
  //   $('#go-to-home-page').hide()
  //   window.history.pushState("object or string", "Title", "/");

  // });


});
const url = 'hello'
const preVotePage = `
<h1> These are the details from your bookie </h1>
<table>
   <tr>
    <td>INFORMATION </td>
    <td>INFORMATION </td>
    <td>INFORMATION </td>
    <td>INFORMATION </td>
  </tr>
  </table>
  <a href="localhost:8080://${url}">localhost:8080://${url}</a>
  <button id='delete-bookie' type='button' class=''>hello</button>
  <button id='copy-bookie' type='button' class=''>hello</button>

`;

const formPage = `
<section id='bookie-form-page' style="justify-content: center;">
    <h2 style="text-align: center; margin-top: 1rem; margin-right: 6rem; margin-left: 6rem;">ENTER YOUR DETAILS AND WE
      WILL PROVIDE YOU WITH A LINK FOR YOUR BOOKIE POLL</h2>
    <form id="form-submission">
      <article class="form-content">
          <div class="form-group">
            <label for="InputName">Full name</label>
            <input type="text" class="form-control" name="name"
              placeholder="Enter your name">
          </div>
          <div class="form-group">
            <label for="InputEmail">E-mail</label>
            <input id="email" type="email" class="form-control" placeholder="E-mail address" name="email">
          </div>
          <div class="form-group">
            <label for="InputTitle">Bookie title</label>
            <input id="title" type="text" class="form-control" name="title"
              placeholder="Add your bookie title">
          </div>
          <div class="form-group">
            <label for="InputDesc">Bookie description</label>
            <input id="description" type="text" class="form-control" name="description"
              placeholder="Briefly describe the bookie you're planning">
          </div>
          <div class="form-group">
            <label for="InputLocation">Location</label>
            <input id="location" type="text" class="form-control" name="location"
              placeholder="Where is it going to happen?">
          </div>
      </article>
      <article id="time-slot-container">
        <div class="row">
          Event starts:
          <input class="time-slot" type="date" name="start_date" />
          <span>

          </span>
          <input class="time-slot" type="time" name="start_time" />
          <span>

          </span>
          Event ends:
          <input class="time-slot" type="date" name="end_date" />
          <span>

          </span>
          <input class="time-slot" type="time" name="end_time" />
          <span>

          </span>
          <button id="add-timeslot" type="button" class="btn btn-primary">Add entry</button>
        </div>
      </article>

      <button id="main-form-button" type="submit" class="btn btn-primary">Submit</button>
    </form>
  </section>
`;

const landingHTML = `<div class="grid d-flex justify-content-center">
<div class='column'>
<div class="row col-xs-12">
  <img style="margin-top: 10rem; min-width: 20rem;"
    src="https://dewey.tailorbrands.com/production/brand_version_mockup_image/544/3576556544_5895c6d6-8741-40d3-9a7a-0ce2774fa4bf.png?cb=1598060511">
</div>
</div>
</div>
<h1 style="text-align: center; margin-top: 1rem;">The New Way to Meet!</h1>
<div class="grid d-flex justify-content-center">
<div class='column'>
<div class="row col-sm-12">
  <button id="create-bookie" style="margin-top: 2rem; background: none; border: none;" type="" name="make-bookie"
    value="">
    <img
      src="https://dewey.tailorbrands.com/production/brand_version_mockup_image/809/3576559809_ced2e008-9de3-42c9-9468-a0d63ecbb98a.png?cb=1598058350" />
  </button>
</div>
</div>`;
