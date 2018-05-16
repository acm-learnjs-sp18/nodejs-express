var app = window.app || {};

(function () {
  app.Utils = {
    pluralize (count, word) {
      return count === 1 ? word : word + 's'
    },

    async store (data) {
      if (data) {
        return window.fetch('/todos/', {
          method: 'post',
          body: JSON.stringify(data),
          headers: {
            'content-type': 'application/json;charset=UTF-8'
          }
        })
      }

      return window.fetch('/todos/').then(response => response.json())
    }
  }
})()
