const year = new Date().getFullYear();

const footer = document.getElementById('footer');

footer.innerHTML = `Karagandy Technologies ${'\u00A9'+ ' ' + year}`;


async function generateQR(link){

    try {
        const response = await fetch('/submit',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({url: link})
        });

        if (!response.ok) {   throw new Error('Network response was not ok.'); }

        const data = await response.text();

        return data;

    } catch (error) {
        throw error;
    }
};


async function plantQR(){

    const url = document.getElementById('url').value;

    const image = document.getElementById('image');


    try {
        const qr = await generateQR(url);

        image.src = qr;

        document.getElementById('QRcontainer').style.display = 'block';

    } catch (error) {
        console.log(error)
    }
}



document.getElementById('form').addEventListener('submit', function (event) {
event.preventDefault();})


document.getElementById('download').addEventListener('click', function() {
    
    const base64String = document.getElementById('image').src;
  
    // Create a temporary anchor element
    const anchor = document.createElement('a');
    anchor.href = base64String;
    anchor.download = 'qrCode.png'; // Set the desired filename for the download
  
    // Simulate a click event on the anchor to trigger the download
    anchor.click();

    // Remove the temporary anchor element from the DOM
      anchor.remove();
  });


const input = document.getElementById('url');

input.addEventListener(
    'input', function(event){
        
        event.preventDefault();
        if(input.checkValidity()){
           enableButton('initiate');
        };
        if(input.value === ""){
            disableButton('initiate');
        }
    }
)
  

function disableButton(id){
    document.getElementById(id).disabled = true;
}

function enableButton(id){
    document.getElementById(id).disabled = false;
}


document.getElementById('initiate').addEventListener(
    'click',(e) => {
        e.preventDefault();
        disableButton('initiate');
    }
)



document.getElementById('download').addEventListener(
    'click',(e) => {
        e.preventDefault();
        disableButton('download');
    }
)