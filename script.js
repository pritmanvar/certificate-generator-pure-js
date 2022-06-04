const form = document.getElementById('form');
const button = document.getElementById('submitButton');

let img = new Image();
img.src = './sankalp-day-certificate-final.png';

//set canvas
let canvas = document.createElement('canvas');
let ctx = canvas.getContext("2d");
canvas.height = img.height/2;
canvas.width = img.width/2;


button.addEventListener('click', function (e) {
  e.preventDefault();
  document.getElementById('submitButton').blur(); // remove focus from button

  // get files from input box
  const NamesFile = document.getElementById('NamesFile');
  const names = NamesFile.files;

  // initilize file reader
  const reader = new FileReader();
  let participantNames = null;

  reader.onload = (e) => {
    const file = e.target.result;
    participantNames = file.split(/\r\n|\n/); // split participant from new line
    // remove unvalid strings
    const validParticipants = participantNames.filter((participant)=>participant != '' && participant != null && participant != undefined) 

    // traverse through all participants ang generate certificate for them.
    for (let index = 0; index < validParticipants.length; index++) {
      generateCertificate(validParticipants[index]);
    }
  }
  
  reader.onerror = (e) => alert(e.target.error.name);
  reader.readAsText(names[0]);

  // clear input fields. 
  NamesFile.value = null; // cliear input value.
})

const generateCertificate = (name) => {
  // write name in certificate.
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  ctx.font = '24px sans-serif';
  ctx.fillText(name, canvas.width/2 - ctx.measureText(name).width/2, 405)
  
  // download certificate.
  const downloadBtn = document.createElement('a');
  downloadBtn.href = canvas.toDataURL();
  downloadBtn.download = name;
  downloadBtn.click();
}