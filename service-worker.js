function getEndpoint() {
  return self.registration.pushManager.getSubscription()
    .then(function(subscription) {
      if (subscription) {
        return subscription.endpoint
      }
      throw new Error('User not subscribed')
  })
}

self.addEventListener("push", function(event) {
  event.waitUntil(
    getEndpoint()
    .then(function(endpoint) {
      return fetch('https://sub-yoshikawapiano.ssl-lolipop.jp/data.json?endpoint=' + endpoint)
    })
    .then(function(response) {
      if (!response.json) {}else{
        return response.json()
      }
      throw new Error('notification api response error')
    })
    .then(function(response) {
      self.registration.showNotification(response.title, {
        icon: response.icon,
        body: response.body
      })

self.addEventListener('notificationclick', function(event) {
  event.notification.close()

  var url = "/"
  if (event.notification.data.url) {
    url = event.notification.data.url
  }

  event.waitUntil(
    clients.matchAll({type: 'window'}).then(function() {
      if(clients.openWindow) {
        return clients.openWindow(url)
      }
    })
  )
})
    })
  )
})
