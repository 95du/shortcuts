let notice = new Notification()
const webView = new WebView();
const url = 'https://mcr.jd.com/credit_home/pages/index.html?btPageType=BT&channelName=024';
await webView.loadURL(url);
notice.body = '已为你打开京东短信登录页，登录之后点击左上角Close，下一次无需登录可直接关闭'
notice.sound = 'event'
notice.schedule()
await webView.present(true);

const req = new Request('https://ms.jr.jd.com/gw/generic/bt/h5/m/firstScreenNew',);
req.method = 'POST';
req.body = 'reqData={"clientType":"ios","clientVersion":"13.2.3","deviceId":"","environment":"3"}';
await req.loadJSON();
const cookies = req.response.cookies;
const account = { username: '', cookie: '' };
const cookie = [];
cookies.forEach((item) => {
  const value = `${item.name}=${item.value}`;
  if (item.name === 'pt_key') cookie.push(value);
  if (item.name === 'pt_pin') {
    account.username = item.value
    cookie.push(value)
  }
});

if (cookie.length != 0) {
  account.cookie = cookie.join(';');
  console.log(account.cookie + ";");
  Pasteboard.copy(account.cookie);
  notice.body = '成功获取到Cookie，已储存到iCloud'
  notice.sound = 'complete'
  notice.schedule()
  Safari.open("shortcuts://");
} else {
  notice.body = '获取Cookie失败'
  notice.sound = 'failure'
  notice.schedule()
}

Script.complete()