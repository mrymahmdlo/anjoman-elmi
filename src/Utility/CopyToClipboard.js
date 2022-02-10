export const copyToClipboard = (link) => {
  if (typeof navigator.clipboard == "undefined") {
    let textArea = document.createElement("textarea");
    textArea.value = link;
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    document.body.removeChild(textArea);
    return;
  }
  navigator.clipboard.writeText(link).then(
    function () {},
    function (err) {}
  );
};
