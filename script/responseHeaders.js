let notice = new Notification()

const req = new Request('https://jf.hisense.com/api/user-manage/front/user/login');
req.method = 'POST';
req.body = 'Form';
await req.loadJSON();

const headers = req.response.headers;
const content = "Content-Length";
const length = headers[content];

if (length === "90") {
  const cookies = req.response.cookies;
  const account = { token: '', cookie: '' };
  const cookie = [];

  cookies.forEach((item) => {
    const value = `${item.name}=${item.value}`;
    if (item.name === 'normal_user_token') {
      account.token = item.value
      cookie.push(value)
    }
  });

  account.cookie = cookie.join(';');
  notice.title = '登录成功'
  notice.body = 'tokenCookie已保存到iCloud'
  notice.schedule()
  return(account.cookie)
} else {
  notice.title = '登录失败 ⚠️'
  notice.body = '账号或密码错误，无法获取Cookie'
  notice.sound = 'failure'
  notice.schedule()
}
Script.complete()