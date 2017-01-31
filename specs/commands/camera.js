export.command = function (client, path, callback) {
  let self = this;

  this.execute(
    function () { // execute application specific code

    },

    [], // arguments array to be passed

    function (result) {
      if (typeof callback === 'function') {
        callback.call(self, result)
      }
    }
  )

  return this
}
