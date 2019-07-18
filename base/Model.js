window.Model = function (options) {
  let resourceName = options.resourceName
  return {
    init: function () {
      var APP_ID = 'sm7uGGOGF1zjxHzmEaDJdNna-gzGzoHsz';
      var APP_KEY = '2yGGdvrTWkA00uXoczlFo2Oh';

      AV.init({ appId: APP_ID, appKey: APP_KEY });
    },
    // 获取数据
    fetch: function () {
      var query = new AV.Query(resourceName)
      return query.find() //返回Promise对象
    },
    //创建数据
    save: function (object) {
      var X = AV.Object.extend(resourceName)
      var x = new X()
      return x.save(object) //返回Promise对象
    }
  }
}