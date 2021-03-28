
  function validateEventForm(){
    var chosen = 0;
    var eventCheckbox = document.querySelectorAll('.ws');
    for(var i= 0; i<eventCheckbox.length;i++){
      if(eventCheckbox[i].checked){
        chosen++;
      }
    }
    if(chosen == 0){
      window.alert("Select Atleast 1 Event");
      return false;
    }
  }
  
  
  const content = document.querySelectorAll('section');
  const prev = document.querySelector('.prev-btn');
  const next = document.querySelector('.next-btn');
  const idlePeriod = 100;
  const animationDuration = 1000;
  
  let lastAnimation = 0;
  let index = 0;
  
  
  const toggleText = (index, state) => {
    if (state === 'show') {
      content[index].querySelector('.text').classList.add('show-section');  
    } else {
      content[index].querySelector('.text').classList.remove('show-section');  
    } 
  }
  
  toggleText(0, 'show');
  
  prev.addEventListener('click', () => {
    if (index < 1) return;
    toggleText(index, 'hide');
    index--;
    
    content.forEach((section, i) => {
      if (i === index) {
        toggleText(i, 'show');
        section.scrollIntoView({behavior: "smooth"});
      }
    });
  })
  
  next.addEventListener('click', () => {
    if (index > 3) return;
    toggleText(index, 'hide');
    index++;
    content.forEach((section, i) => {
      if (i === index) {
        toggleText(i, 'show');
        section.scrollIntoView({behavior: "smooth"});
      }
    })
  })
  
  document.addEventListener('wheel', event => {
    var delta = event.wheelDelta;
    var timeNow = new Date().getTime();
    // Cancel scroll if currently animating or within quiet period
    if(timeNow - lastAnimation < idlePeriod + animationDuration) {
      event.preventDefault();
      return;
    }
    
    if (delta < 0) {
      var event = new Event('click');
      next.dispatchEvent(event);
    } else {
      var event = new Event('click');
      prev.dispatchEvent(event);
    }
    
    lastAnimation = timeNow;
  }) 
  
  
  
  
  {/* <script type="text/javascript"> */}
        function printDiv() {
          var printContents = document.getElementById("print").innerHTML;
          var originalContents = document.body.innerHTML;
  
          document.body.innerHTML = printContents;
  
          window.print();
  
          document.body.innerHTML = originalContents;
        }
      // </script>
  
  
  
  
  {/* <div class="registration-event" id="hello">
        <div class="container event-form">
          <div>
            <section>
              <div class="text">
                <div class="form-heading">
                  <h1>Register Yourself</h1>
                </div>
                <label>Name</label>
                <input type="text" id="student-name" name="name" required />
                <label>Email Id</label>
                <input type="email" id="student-email" name="email" required />
                <label>Phone number</label>
                <input type="number" id="student-number" name="phone" required />
                <button id="proceed" onclick="printDiv()">Proceed</button>
              </div>
            </section>
          </div>
        </div>
      </div> */}

      function onlyNumberKey(evt) {
          
        // Only ASCII charactar in that range allowed
        var ASCIICode = (evt.which) ? evt.which : evt.keyCode
        if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
            return false;
        return true;
    }