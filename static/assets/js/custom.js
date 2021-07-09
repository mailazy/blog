newsletterInterval = setInterval(function () {
  if (document.getElementById("emailsubscribe")) {
    clearInterval(newsletterInterval)
    document
      .getElementById("emailsubscribe")
      .addEventListener("keyup", function () {
        if (this.value.length > 0) {
          document.getElementById("submitsubscribe").disabled = false
          document
            .getElementById("submitsubscribe")
            .classList.remove("disabled")
        } else {
          document.getElementById("submitsubscribe").disabled = true
          document.getElementById("submitsubscribe").classList.add("disabled")
        }
      })
    document
      .getElementById("submitsubscribe")
      .addEventListener("click", function () {
        if (document.getElementById("emailsubscribe").value != "") {
          newsletterAction(document.getElementById("emailsubscribe").value)
        }
        return false
      })
    function validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    }

    function newsletterAction(email) {
      document.getElementById("newsLetterMessage").innerHTML = ""
      if (!validateEmail(email)) {
        document.getElementById("newsLetterMessage").innerHTML =
          "<div class='error'>Email is Invalid.</div>"
      } else {
        var newsletterURL = "https://api.social9.com/api/v1/subscribe/"
        newsletterURL +=
          "?email=" +
          encodeURIComponent(email) +
          "&site=https%3A%2F%2Fmailazy.com%2F"
        var xmlhttp = new XMLHttpRequest()
        xmlhttp.open("POST", newsletterURL)
        xmlhttp.setRequestHeader(
          "Content-Type",
          "application/json;charset=UTF-8"
        )
        xmlhttp.onreadystatechange = function () {
          //Call a function when the state changes.
          if (xmlhttp.readyState == 4 && xmlhttp.status == 201) {
            document.getElementById("newsLetterMessage").innerHTML =
              "<div class='success'>Thanks for subscribing.</div>"
          }
        }
        xmlhttp.send()
      }
    }
  }
}, 1000)
