function isValidHexValue(hexValue) {
  return /^#[0-9A-F]{6}$/i.test(hexValue);
}

function padZero(str, len) {
  len = len || 2;
  var zeros = new Array(len).join('0');
  return (zeros + str).slice(-len);
}

function getForegroundColor(backgroundColor) {
    let currentColor = backgroundColor.slice(1);
    let r = (parseInt(currentColor.slice(0, 2), 16)),
        g = (parseInt(currentColor.slice(2, 4), 16)),
        b = (parseInt(currentColor.slice(4, 6), 16));
    if( r + g + b <= 384 ) {
      return "#ffffff";
    } else {
        console.log( r+b+g)
      return "#000000";
    }
}

module.exports = {
  onInput(input) {
    input.colors = input.colors || ["red", "green", "blue"];
  },
  onColorSelected (backgroundColor) {
    contrastColor = getForegroundColor(backgroundColor);
    this.emit("colorSelected", {"backgroundColor":backgroundColor, "contrastColor": contrastColor});
  },
  onHexInput () {
    let hexInput = this.getEl("hexInput").value;
    if (!isValidHexValue(hexInput)) {
      hexInput= this.input.colors[0];
    }
    let contrastColor = getForegroundColor(hexInput);
    this.emit("colorSelected", {"backgroundColor":hexInput, "contrastColor": contrastColor});
  }
};