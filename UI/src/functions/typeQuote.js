export default function typeQuote(string, className, interval) {
  const quoteElement = document.querySelector(className);
  document.querySelector(className).textContent = "";
  let index = 0;

  const typingInterval = setInterval(() => {
    if (index < string.length) {
      quoteElement.textContent = quoteElement.textContent.slice(0, -1);
      quoteElement.textContent += string.charAt(index) + "_";
      index++;
    } else {
      if (quoteElement.textContent.slice(-1) != "_") {
        quoteElement.textContent += "_";
      } else {
        quoteElement.textContent = quoteElement.textContent.slice(0, -1);
      }
      index++;
    }
  }, interval);
}
