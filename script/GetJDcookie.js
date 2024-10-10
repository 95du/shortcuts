// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: toggle-on;
const menu = new Alert()
menu.title = '选择获取 Cookie 的线路'
menu.addAction('京东商城线路')
menu.addAction('京东金融线路')
menu.addCancelAction('取消')
const mode = await menu.presentSheet()

if (mode == 0) {
  getCookie('https://plogin.m.jd.com/login/login?appid=300&returnurl=https%3A%2F%2Fwqs.jd.com%2Fmy%2Faccountv2.shtml%3Fsceneval%3D2%26jxsid%3D16323729562173504755%26ptag%3D7155.1.2&source=wq_passport')
} else if (mode == 1) {
  getCookie('https://mcr.jd.com/credit_home/pages/index.html?btPageType=BT&channelName=024')
}

async function getCookie (url) {
  let notice = new Notification();
  const webView = new WebView();
  await webView.loadURL(url);
  notice.body = '已打开京东短信登录页，登录之后点击左上角Close'
  notice.sound = 'event'
  notice.schedule()
  await webView.present();

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
    console.log(account.cookie)
    Pasteboard.copy(account.cookie);
    notice.title = '成功获取到Cookie，已储存到iCloud'
    notice.body = account.cookie
    notice.sound = 'complete'
    Safari.open("shortcuts://");
  } else {
    notice.body = '获取Cookie失败'
    notice.sound = 'failure'
  }
  notice.schedule()
  Script.complete()
}