<<<<<<< HEAD
class MyURLProtocol: NSURLProtocol {

  override class func canInitWithRequest(request: NSURLRequest) -> Bool {
      // 在这里可以对请求进行过滤或判断，决定是否要拦截
      return true // 拦截所有请求
  }

  override class func canonicalRequestForRequest(request: NSURLRequest) -> NSURLRequest {
      return request
  }

  override func startLoading() {
      // 在这里可以处理请求，比如修改请求头或响应内容等
      let response = NSHTTPURLResponse(URL: self.request.URL!, statusCode: 200, HTTPVersion: "HTTP/1.1", headerFields: nil)!
      self.client?.URLProtocol(self, didReceiveResponse: response, cacheStoragePolicy: .NotAllowed)
      self.client?.URLProtocolDidFinishLoading(self)
  }

  override func stopLoading() {
      // 可以在这里停止请求或释放一些资源
  }

}

NSURLProtocol.registerClass(MyURLProtocol.self)


class MyURLProtocol: URLProtocol {

  override class func canInit(with request: URLRequest) -> Bool {
      // 在这里可以对请求进行过滤或判断，决定是否要拦截
      return true // 拦截所有请求
  }

  override class func canonicalRequest(for request: URLRequest) -> URLRequest {
      return request
  }

  override func startLoading() {
      // 在这里可以处理请求，比如修改请求头或响应内容等
      let response = HTTPURLResponse(url: self.request.url!, statusCode: 200, httpVersion: "HTTP/1.1", headerFields: nil)!
      self.client?.urlProtocol(self, didReceive: response, cacheStoragePolicy: .notAllowed)
      self.client?.urlProtocolDidFinishLoading(self)
  }

  override func stopLoading() {
      // 可以在这里停止请求或释放一些资源
  }

}

URLProtocol.registerClass(MyURLProtocol.self)



class MyURLProtocol: URLProtocol, URLSessionDataDelegate {

  var session: URLSession?
  var task: URLSessionDataTask?
  var data: NSMutableData?
  var response: URLResponse?

  override class func canInit(with request: URLRequest) -> Bool {
      // 判断是否要拦截该请求
      return true
  }

  override class func canonicalRequest(for request: URLRequest) -> URLRequest {
      return request
  }

  override func startLoading() {
      // 创建一个新的会话对象
      let config = URLSessionConfiguration.default
      session = URLSession(configuration: config, delegate: self, delegateQueue: nil)

      // 创建一个新的请求任务并开始
      task = session?.dataTask(with: self.request)
      task?.resume()
  }

  override func stopLoading() {
      // 停止请求任务
      task?.cancel()
  }

  // MARK: - URLSessionDataDelegate

  func urlSession(_ session: URLSession, dataTask: URLSessionDataTask, didReceive data: Data) {
      // 接收到数据时的回调，将数据写入缓存
      self.client?.urlProtocol(self, didLoad: data)
      self.data?.append(data)
  }

  func urlSession(_ session: URLSession, task: URLSessionTask, didCompleteWithError error: Error?) {
      // 请求完成时的回调，将缓存中的数据发送给客户端
      if error != nil {
          self.client?.urlProtocol(self, didFailWithError: error!)
      } else {
          if let response = self.response {
              self.client?.urlProtocol(self, didReceive: response, cacheStoragePolicy: .notAllowed)
          }
          if let data = self.data {
              self.client?.urlProtocol(self, didLoad: data as Data)
          }
          self.client?.urlProtocolDidFinishLoading(self)
      }
  }

  func urlSession(_ session: URLSession, dataTask: URLSessionDataTask, didReceive response: URLResponse) {
      // 收到响应时的回调，保存响应对象
      self.client?.urlProtocol(self, didReceive: response, cacheStoragePolicy: .notAllowed)
      self.response = response
      self.data = NSMutableData()
  }

}
=======
var obj = {"album":"Growth Music Checklist","alg":"alg-music-rec_cm_openDaily_daily","appId":"a30102000000000089c0ca99b44d8e9f","artist":"[{\\\"id\\\":\\\"6CF7D1DD1B91985F0E9942D1CB6F81BD\\\",\\\"name\\\":\\\"Anson Seabra\\\"}]","audioId":"A7F2881EE91808AF65515EC858F7A577","category":"","collectId":"1003","cpId":"wangyiyun","duration":192,"gmtModify":0,"logo":"http://p1.music.126.net/asNO9FiyBAdpCfR_uYi0hQ==/109951168225938771.jpg?param=500y500","path":"","playCount":0,"playable":true,"qualityOption":"[{\\\"needVip\\\":false,\\\"name\\\":\\\"流畅品质\\\",\\\"quality\\\":\\\"1\\\"}]","title":"Peter Pan Was Right","tryPlayFlag":false,"type":"music","updateTime":"","upgradeRole":0};
// obj = {"collectId":"1003","collectName":"每日推荐","collectType":"selfBuild#daily_recommend","cpId":"wangyiyun","songsCount":30};
obj = {"album":"Growth Music Checklist","alg":"alg-music-rec_cm_openDaily_daily","appId":"a30102000000000089c0ca99b44d8e9f","artist":"","audioId":"A7F2881EE91808AF65515EC858F7A577","category":"","collectId":"1003","cpId":"wangyiyun","duration":192,"gmtModify":0,"logo":"http://p1.music.126.net/asNO9FiyBAdpCfR_uYi0hQ==/109951168225938771.jpg?param=500y500","path":"","playCount":0,"playable":true,"qualityOption":"","title":"Peter Pan Was Right","tryPlayFlag":false,"type":"music","updateTime":"","upgradeRole":0}


var jsonStr = JSON.stringify(obj);
jsonStr = "{\"album\":\"Growth Music Checklist\",\"alg\":\"alg-music-rec_cm_openDaily_daily\",\"appId\":\"a30102000000000089c0ca99b44d8e9f\",\"artist\":\"\",\"audioId\":\"A7F2881EE91808AF65515EC858F7A577\",\"category\":\"\",\"collectId\":\"1003\",\"cpId\":\"wangyiyun\",\"duration\":192,\"gmtModify\":0,\"logo\":\"http://p1.music.126.net/asNO9FiyBAdpCfR_uYi0hQ==/109951168225938771.jpg?param=500y500\",\"path\":\"\",\"playCount\":0,\"playable\":true,\"qualityOption\":\"\",\"title\":\"Peter Pan Was Right\",\"tryPlayFlag\":false,\"type\":\"music\",\"updateTime\":\"\",\"upgradeRole\":0}";
jsonStr = jsonStr.replace(/"/g, '\\"');
console.log(jsonStr);
>>>>>>> 3f751e90f4da4aed73fef90a0eb582d6388538cf
