$("#signup").submit(function (event) {
  event.preventDefault();
  ////////collect signupData////////////
  var signupData = new FormData();
  signupData.append("firstname", $("#firstname").val());
  signupData.append("lastname", $("#lastname").val());
  signupData.append("email", $("#email").val());
  signupData.append("dob", $("#dob").val());
  signupData.append("phone", $("#phone").val());
  signupData.append("password", $("#password").val());
  console.log(signupData);

  $.ajax({
    type: "POST",
    url: "/api/sign_up",
    data: signupData,
    processData: false,
    contentType: false,
    success: function (response) {
      alert("Signup page submitted successfully!");
      emptyForm();
      // window.location.href = "/sign_up";
    },
    error: function () {
      alert("Error submitting the signup page");
    },
  });
});

function emptyForm(){
        let form = document.getElementById("signup");
        form.reset();
}
