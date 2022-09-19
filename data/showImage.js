let widget = await createWidget();

  if (!config.runsInWidget) {
    await widget.presentLarge();
  }
  Script.setWidget(widget);
  Script.complete();
  
  async function createWidget() {
    let widget = new ListWidget();
    let bg = await getImage('https://gitcode.net/4qiao/shortcuts/raw/master/img/IMG_9332.png');
    widget.backgroundImage = await shadowImage(bg);
    return widget;
  }
  
  async function getImage(url) {
    let r = await new Request(url);
    return await r.loadImage();
  }
  
  async function shadowImage(img) {
    let ctx = new DrawContext();
    ctx.size = img.size;
    ctx.drawImageInRect(img, new Rect(0, 0, img.size['width'], img.size['height']));
    let res = await ctx.getImage();
    return res;
  }