let vm = new Vue({
  el: '.search-form',
  data: {
    // 如果网络不好，可以使用项目内的node项目作为服务区： ``` node server.js ```
    dataUrl: 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json',
    //dataUrl: "http://localhost:3001/",
    cityData: [],// 从服务器获取的 city 数据
    showData: [],
    userInputContent: ''
  },
  methods: {
    userInput(a, b) {
      if (this.cityData.length < 1) {
        return;
      }

      if (this.userInputContent.length < 2) {
        for (let i = 0; i < this.showData.length;) {
          this.showData.pop()
        }
        return;
      }

      let matchData = this.match()

      for (let i = 0; i < this.showData.length;) {
        this.showData.pop()
      }

      matchData.forEach(item => {
        this.showData.push({
          cityName: this.highlight(item.city.cityStateChars, item.i_store),
          population: item.city.population
        })
      })
      console.log(this.showData)

      //[\s\S]*

    },
    match() {
      let cities = this.cityData;
      let searchtext = this.userInputContent// document.getElementsByClassName('search')[0]value.toLowerCase() 

      // 将用户输入的字符串变成数组，方便之后和 city 逐字符比较
      let searchChars = [];
      for (let i in searchtext) {
        searchChars.push(searchtext[i])
      }

      // 开始匹配city
      let exactMatch = []
      let fuzzyMatch = []

      let j = 0
      let j_len = searchChars.length

      for (let i in cities) {
        if ((exactMatch.length + fuzzyMatch.length) > 10) {
          break;
        }
        let i_store = [] // 用来存储i指针，用来存储哪些是需要修改颜色的字符
        j = 0

        let city = cities[i]

        let start = city.cityState.toLowerCase().indexOf(searchtext)
        if (start > -1) {
          for (let counter = 0; counter < j_len; counter++) {
            i_store.push(start + counter)
          }
          exactMatch.push({ city: city, i_store: i_store })
          continue
        }

        for (let c in city.cityStateChars) {

          let char = city.cityStateChars[c]
          let char_search = searchChars[j]

          if (char.toLowerCase() == char_search) {
            i_store.push(c)
            j++
          }

          if (j == j_len) {
            //let cityName = this.highlight(city.cityStateChars, i_store)
            fuzzyMatch.push({ city: city, i_store: i_store })

            break;
          }
        }
      }

      fuzzyMatch.splice(0, 0, ...exactMatch)
      // 匹配结束

      return fuzzyMatch
    },

    highlight(cityStateChars, indexArr) {
      let copy = []
      cityStateChars.forEach(item => copy.push(item))

      for (let i = 0; i < indexArr.length; i++) {
        let index = indexArr[i]
        copy[index] = '<span class="highlight">' + copy[index] + '</span>'
      }

      return copy.join('')
    },

    getData() {

      let cityData = this.cityData

      let xhr = new XMLHttpRequest()
      xhr.open("GET", this.dataUrl);
      xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF=8");
      xhr.send();
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            let response = JSON.parse(xhr.responseText)
            response.forEach(element => {
              element.cityState = element.city + ", " + element.state
              element.cityStateChars = []
              let lowercase = element.cityState
              for (let i in lowercase) {
                element.cityStateChars.push(lowercase[i])
              }
            });

            response.forEach(item => cityData.push(item))
          }
          else {
            alert("Problem retrieving XML data，请求数据失败，可能是githubsercontent这个接口不稳定");
          }
        }
      }
    }
  },// method
  created() {
    this.getData()
  }
})
