let email = {},
  password = {},
  signInButton,
  ratingList = [];

//------------------------------HELPERS-----------------------------

const isValidEmailAddress = function(emailAddress) {
    // Basis manier om e-mailadres te checken.
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
};

const isEmpty = function(fieldValue) {
   return !fieldValue || !fieldValue.length;
};

//-----------------------------OBJECTEN MAKEN-----------------------


const getDOMElements = function () {
  email.field = document.querySelector('.js-email-field');
  email.errorMessage = document.querySelector('.js-email-error-message');
  email.input = document.querySelector('.js-email-input')
  email.label = document.querySelector('.js-email-label')
  console.log(email)

  password.field = document.querySelector('.js-password-field');
  password.errorMessage = document.querySelector('.js-password-error-message')
  password.input = document.querySelector('.js-password-input')
  
  signInButton = document.querySelector('.js-sign-in-button');

  ratingList[0] = document.querySelector('.js-rating1')
  ratingList[1] = document.querySelector('.js-rating2')
  ratingList[2] = document.querySelector('.js-rating3')
  ratingList[3] = document.querySelector('.js-rating4')
  ratingList[4] = document.querySelector('.js-rating5')

};

//----------------------Error-functions---------------------------


const addErrors = function(formfield, errorField, errorMessage) 
{
  formfield.classList.add('has-error');
  errorField.classList.remove('u-none')
  errorField.innerHTML = errorMessage
};


const removeErrors = function(formfield,errorField)
{
  formfield.classList.remove('has-error');
  errorField.classList.add('u-none');
};


//-------------------DOUBLE-CHECK------------------------------------


const doubleCheckEmailAddress = function ()
{
  if(!isEmpty(email.input.value) && isValidEmailAddress(email.input.value))
  {
    removeErrors(email.field, email.errorMessage)
    email.input.removeEventListener('input',doubleCheckEmailAddress)
  }

  else
  {
    addErrors(email.field, email.errorMessage, "Field is invalid")
  }
}


const doubleCheckPassword = function ()
{
  if(!isEmpty(email.input.value))
  {
    removeErrors(password.field, password.errorMessage)
    password.input.removeEventListener('input',doubleCheckPassword)
  }

  else
  {
    addErrors(password.field, password.errorMessage, "Is required")
  }
}




//-------------EVENTS voor PASSWORD,EMAIL en BUTTON----------------

//--------------EMAIL-----------------


const enableListeners = function()
{
  email.input.addEventListener('blur',function()
  {

    if(isEmpty(email.input.value) || !isValidEmailAddress(email.input.value)){

      addErrors(email.field,email.errorMessage,"This field is required");
      email.input.removeEventListener('input',doubleCheckEmailAddress);
      email.input.addEventListener('input',doubleCheckEmailAddress);
    }

    else
    {
      removeErrors(email.field, email.errorMessage);
      email.input.removeEventListener('input',doubleCheckEmailAddress)
    }

  });


//--------------PASSWORD---------------


  password.input.addEventListener('blur',function()
  {

    if(isEmpty(password.input.value))
    {
      addErrors(password.field, password.errorMessage, "This field is required");
      password.input.removeEventListener('input',doubleCheckPassword);
      password.input.addEventListener('input',doubleCheckPassword);
    }

    else
    {
      removeErrors(password.field, password.errorMessage);
      password.input.removeEventListener('input',doubleCheckEmailAddress);
    }

  });

//-------------BUTTON-------------------

  if(signInButton){ // als de knop bestaat (true)

    signInButton.addEventListener('click',function(event)
    {
      event.preventDefault();

      if(!isEmpty(email.input.value) && isValidEmailAddress(email.input.value) && !isEmpty(password.input.value))
          {
            console.log('succes')
            console.log(`email: ${email.input.value}`)
            console.log(`password: ${password.input.value}`)
          }
          
          else
          {
            console.log('Try again')
          }
    });
  }
  
};


const handleFloatingLabel = function()
{
  email.input.addEventListener('blur', function()
  {
    console.log('focusout')
    if(!isEmpty(email.input.value))
    {
      console.log('email niet leeg')
      email.label.classList.add('is-floating')
    }
    else{
      console.log('email leeg')
      email.label.classList.remove('is-floating')
    }

  })


}



//--------------------------------RATING------------------------------

const handleRating = function(){

    for(const rating of ratingList)
    {
        rating.addEventListener('change', showRating);
    }
};

const showRating  = function(){
    let value = this.value;
    for(const rating of ratingList)
    {
        if(rating.value < value)
        {
            rating.classList.add('c-rating__input--on');
        }
        else
        {
            rating.classList.remove('c-rating__input--on');
        }
    }
};


//---------------------------TOGGLE PASSWORD---------------------------



const handlePasswordSwitcher = function () {
  const passwordInput = document.querySelector('.js-password-input'),
    passwordToggle = document.querySelector('.js-password-toggle');

  // zelfcontrole
  // if (!passwordInput || passwordToggle) {
  //   console.error('De classes zijn niet te vinden.');
  // }

  //We gaan luisteren of er geklikt wordt op de checkboxes
  passwordToggle.addEventListener('change', function () {
    //Als er geklikt wordt, veranderen we het type van de input password naar text en vice versa
    if (passwordInput.type == 'password') {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  });
};

//-------------------------DOM------------------------------------

document.addEventListener('DOMContentLoaded', function () {
  console.log('Script loaded!');
  handlePasswordSwitcher();
  getDOMElements();
  enableListeners();
  handleFloatingLabel();
  handleRating()
});


// const handleLoginValidation = function () {};