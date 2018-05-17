var app = window.app || {};

(function () {
  app.Utils = {
    pluralize (count, word) {
      return count === 1 ? word : word + 's'
    },

    async store (data) {
      try {
        if (data) {
          return window.fetch('/todos/', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
              'content-type': 'application/json;charset=UTF-8'
            }
          })
        }

        const response = await window.fetch('/todos/')
        const json = await response.json()
        return json
      } catch (error) {
        return []
      }
    }
  }
})()
