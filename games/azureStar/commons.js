function pad(num) {
  var s = "000000000" + num;
  return s.substr(s.length-6);
}

Number.prototype.roundTo = function(num) {
  var resto = this%num;
  if (resto <= (num/2)) {
    return this-resto;
  } else {
    return this+num-resto;
  }
};
