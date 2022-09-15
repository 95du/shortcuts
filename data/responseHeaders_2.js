var input = args.shortcutParameter
let req = new Request(input.url)
let notice = new Notification()

      if (input.method != ""){
          req.method = input.method
          }

      if (input.headers != ""){
          req.headers = input.headers
          }

      if (input.body != ""){
          req.body = input.body
          }

  await req.load()
  const headers = req.response.headers;
  const content = "Content-Length";
  const length = headers[content];
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

if (length === "90") {
      account.cookie = cookie.join('=');
      console.log(account.cookie + "=");
      notice.title = '登录成功'
      notice.body = 'Cookie已保存到iCloud'
      notice.sound = 'complete'
      notice.schedule()
      return(account.cookie)
}else{
      notice.title = '登录失败 ⚠️'
      notice.body = '账号或密码错误，无法获取Cookie'
      notice.sound = 'failure'
      notice.schedule()
      Script.complete()
}