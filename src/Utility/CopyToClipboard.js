export const copyToClipboard = (link) => {
  if (typeof navigator.clipboard == "undefined") {
    let textArea = document.createElement("textarea");
    textArea.value = link;
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      let successful = document.execCommand('copy');
      let msg = successful ? 'successful' : 'unsuccessful';
      console.log(msg);
    } catch (err) {
      console.log('Was not possible to copy te text: ', err);
    }

    document.body.removeChild(textArea);
    return;
  }
  navigator.clipboard.writeText(link).then(
    function () {console.log('Done!')},
    function (err) {console.log('unsuccessful! : ', err)}
  );
};
