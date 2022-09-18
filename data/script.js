// 判断是否是运行在桌面的组件中
if (config.runsInWidget) {
  // 创建一个显示元素列表的小部件
  // 显示元素列表的小部件。将小部件传递给 Script.setWidget() 将其显示在您的主屏幕上。
  // 请注意，小部件会定期刷新，小部件刷新的速率很大程度上取决于操作系统。
  // 另请注意，在小部件中运行脚本时存在内存限制。当使用太多内存时，小部件将崩溃并且无法正确呈现。
  const widget = new ListWidget();
  // 添加文本物件
  const text = widget.addText("Hello, World!");
  // 设置字体颜色
  text.textColor = new Color("#000000");
  // 设置字体大小
  text.font = Font.boldSystemFont(36);
  // 设置文字对齐方式
  text.centerAlignText();
  // 新建线性渐变物件
  const gradient = new LinearGradient();
  // 每种颜色的位置,每个位置应该是 0 到 1 范围内的值，并指示渐变colors数组中每种颜色的位置
  gradient.locations = [0, 1];
  // 渐变的颜色。locations颜色数组应包含与渐变属性相同数量的元素。
  gradient.colors = [new Color("#F5DB1A"), new Color("#F3B626")];
  // 把设置好的渐变色配置给显示元素列表的小部件背景
  widget.backgroundGradient = gradient;
  // 设置部件
  Script.setWidget(widget);
}