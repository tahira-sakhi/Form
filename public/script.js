$("#signup").submit(function (event) {
  event.preventDefault();

  // Collect signupData using FormData
  var signupData = new FormData(this); // This way, it automatically picks up all input fields
  console.log("Form Data:", signupData);

  $.ajax({
    type: "POST",
    url: "/api/sign_up",
    data: signupData,
    processData: false,
    contentType: false,
    success: function (response) {
      console.log("Success response:", response);
      alert("Signup page submitted successfully!");
      emptyForm();
      // window.location.href = "/sign_up";
    },
    error: function (xhr, status, error) {
      console.error("Error response:", status, error);
      alert("Error submitting the signup page");
    },
  });
});

function emptyForm() {
  let form = document.getElementById("signup");
  form.reset();
}
