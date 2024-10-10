var input = args.shortcutParameter
let req = new Request(input.url)

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
Script.complete()

return JSON.stringify(req.response)