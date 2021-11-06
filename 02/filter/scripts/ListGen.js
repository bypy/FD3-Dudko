const listGenerator = (apiUrl) => {

  const ListGen = function (url) {
    this.list = null;
    this.url = url;
  }

  ListGen.prototype.randomIntFromRange = (min, max) => Math.round((max - min) * Math.random()) + min;

  ListGen.prototype.fetch = function () {
    return new Promise((resolve, reject) => {
      fetch(`${this.url}?number=${this.randomIntFromRange(10,15)}`)
        .then(response => response.json())
        .then(myData => {
          this.list = myData;
          resolve(myData);
        })
        .catch(err => {
          console.error(err);
          resolve(["Pretypes", "Heterokaryoses", "Deceitfully", "Cudgeling", "Faultlessly", "Bilharzia", "wrang", "homes", "impotencies", "detainment"]);
        });
    })
  }

  ListGen.prototype.getWords = function () {
    return new Promise((resolve, reject) => {
      this.fetch()
        .then(myData => {
          this.list = myData;
          resolve(myData);
        })
        .catch(err => {
          console.error(err);
          reject(err);
        });
    })
  }

  return new ListGen(apiUrl);
};