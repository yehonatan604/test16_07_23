// ולידציות נדרשות:

// - שדה cardholder name:
//     - ערכים יכולים להיות אך ורק תווים A-Za-z ורווחים.
//     - לא ניתן להזין ערכים מספריים


// - שדה card number:
//     - ערכים יכולים להיות מספרים ורווחים
//      - שימו לב, בשדה card number עלינו לפרמט את מספר הכרטיס תוך כדיי הזנה של ערך לתוך ה-input ככה שבין כל 4 תווים (מספרים) יופיע רווח
//     - בנוסף, יש לטעון בצד שמאל את האייקון של סוג הכרטיס, (תחשבו איך לעשות זאת)


// - שדה expiriy
//     - אך ורק מספרים
//     - שימו לב שהחודש יכול להיות בין 1 ל-12, וחיבור של החודש והשנה צריך לתת לנו תאריך עתידי

// - שדה CVC
//     - זה יכול להיות אך ורק מספרים בין 3-4 תווים

// - Discount code
//     - שימו לב לפורמט המופיע ב-placeholder, שילוב של תווים (A-Z) עם מספרים (0-9) בין כל 6 תווים נוסיף מקף, סה״כ קוד תקין מורכב מ24 תווים עם 3 מקפים בין לבין

// כל עוד יש בעיה בטופס כלאמר הולידציה אינה תקינה או שחסרים נתונים, כפתור ה-Pay אמור להיות מדוסבל (disabled)
// כדיי לייצג שגיאה בשדה מסוים - יש לצבוע את החלק התחתון שלו בצבע אדום (border-bottom)









// CARDHOLDER'S NAME \\

let cardName = document.querySelector('.card-input-name')

cardName.addEventListener('keyup', function () {
    const containsDigits = /\d/.test(cardName.value);
    if (containsDigits) {
        cardName.value = ' '
        cardName.value = 'ERROR!!'
        cardName.style.color = "red"
        cardName.style.borderBottom = "2px solid red"
        cardName.classList.remove('validate');
        toggleButton();
    } else {
        cardName.style.borderBottom = "2px solid #4ecf79"
        cardName.style.color = " #4ecf79"
        cardName.classList.add('validate')
    }
    toggleButton();
});


// CARD-NUMBER \\

const input = document.querySelector(".card-input-logo");


input.addEventListener('keyup', function () {
    const inputValue = input.value.replaceAll(' ', '');

    if (inputValue.match(/[^0-9]/)) {
        input.value = inputValue.replace(/[^0-9]/g, '');
        input.value = 'ERROR!!'
        input.style.color = "red"
        input.style.borderBottom = "2px solid red"
        input.style.backgroundImage = "url(images/error-logo.png)";
        input.classList.remove('validate');
        toggleButton();
        return;
    }


    let regexMaster = /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/
    let regexVisa = /^4[0-9]{12}(?:[0-9]{3})?$/
    let regexDiscover = /^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$/



    let test1 = regexMaster.test(inputValue)
    let test2 = regexVisa.test(inputValue)
    let test3 = regexDiscover.test(inputValue)

    if (test1) {
        input.style.backgroundImage = "url(images/mastercard.256x153.png)";
        return
    } else if (test2) {
        input.style.backgroundImage = "url(images/Visa-Logo.png)";
        return
    }
    else if (test3) {
        input.style.backgroundImage = "url(images/Discover-Logo.png)";
        return
    }


    const separated = inputValue.match(/.{1,4}/g); // Split into groups of 4 digits
    input.value = separated.join(' '); // Add spaces for every 4 digits
    input.style.borderBottom = "2px solid #4ecf79"
    input.classList.add('validate')
    toggleButton();
});


// EXPIRY \\

const expiriy = document.querySelector('.card-input-mini');


//the next 2 event's change the type of input
expiriy.addEventListener('focus', function () {
    expiriy.type = 'month';
});
expiriy.addEventListener('focusout', function () {
    expiriy.type = 'text';
});


// makes sure u choose a valid date
expiriy.addEventListener('keyup', function () {
    let now = new Date();

    if (new Date(expiriy.value) < now) {
        expiriy.style.color = "red"
        expiriy.style.borderBottom = "2px solid red"
        expiriy.classList.remove('validate');
        toggleButton();
        return;
    }
    else {
        expiriy.style.borderBottom = "2px solid #4ecf79"
        expiriy.style.color = "#4ecf79"
    }
    toggleButton();
});


// CVC \\
//no more then 3-4 digit's
const regNumbersOnly = /^[0-9]{1,4}$/;

const cvc = document.querySelector('.card-input-cvc');
cvc.addEventListener('keyup', function () {
    if (!regNumbersOnly.test(cvc.value)) {
        cvc.style.borderBottom = "2px solid red"
        cvc.type = 'text'
        cvc.value = 'ERROR!!'
        cvc.style.color = "red"
        cvc.classList.remove('validate');
    } else {
        cvc.style.borderBottom = "2px solid #4ecf79"

    }
    toggleButton();

});


// DISCOUNT CODE \\
// 8 - uppercase letter's, 2 - numbers, 3 - uppercase letter's

const discount = document.getElementById('userDiscount');

discount.addEventListener('focusout', function () {

    const regex1 = /^[A-Za-z]{8,8}$/
    const regex2 = /^[0-9]{2,2}$/
    const regex3 = /^[A-Z]{3,3}$/

    const discountArray = discount.value.split('-');

    let test1 = regex1.test(discountArray[0]);
    let test2 = regex2.test(discountArray[1]);
    let test3 = regex3.test(discountArray[2]);

    if (!test1 || !test2 || !test3) {
        discount.value = 'ERROR!'
        discount.style.color = 'red'
        discount.style.borderBottom = "2px solid red";
        discount.classList.remove('validate');
        toggleButton();
        return;
    }
    else {
        discount.style.borderBottom = "2px solid #4ecf79"
        discount.style.color = "#4ecf79"
    }
    toggleButton();

});

function toggleButton() {
    for (let i = 0; i < checkValid.length; i++) {
        if (!checkValid[i].classList.contains('validate')) {
            console.log(checkValid[i].classList.contains('validate'))
            isValid = false;

            break;
        }
    }

    if (isValid) {
        // Form is valid, enable the submit button
        btn.disabled = false;
    } else {
        // Form is invalid, disable the submit button
        btn.disabled = true;
    }
}

// PAY BUTTON\\

const form = document.querySelector('.card-form');
const btn = document.getElementById('btn');
const checkValid = document.querySelectorAll('.validate');
let isValid = true;

form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log("OK")

});