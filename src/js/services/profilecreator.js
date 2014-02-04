module.exports = function (firebaseRef, $timeout) {
  return function (id, email, callback) {
    firebaseRef('users/' + id).set({email: email, name: firstPartOfEmail(email)}, function (err) {
      //err && console.error(err);
      if (callback) {
        $timeout(function () {
          callback(err);
        });
      }
    });

    function firstPartOfEmail(email) {
      return ucfirst(email.substr(0, email.indexOf('@')) || '');
    }

    function ucfirst(str) {
      // credits: http://kevin.vanzonneveld.net
      str += '';
      var f = str.charAt(0).toUpperCase();
      return f + str.substr(1);
    }
  };
};
