Array.prototype.last = function() {
    return this[this.length - 1];
}

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

String.prototype.urlify = function() {
    return this.trim().toLowerCase().replace(" ", "_");
}

function isdef(obj) {
    return (typeof obj !== 'undefined');
}