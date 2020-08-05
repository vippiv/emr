# 中标普华Office控件使用手册

document.all.oframe -> 创建文档所在的对象，通常为带classid的object对象

document.all.oframe.CreateNew(name) 创建文档，name: swriter(表示文字处理文档)/scalc(电子表格文档)/simpress(演示文稿文档)

document.all.oframe.SetMenuBarVisible(true) 设置菜单是否可见

document.all.oframe.OpenDocument(file, 2) 打开文档，参数一：文档路径，参数二：打开方式

document.all.oframe.Close() 关闭当前文档

document.all.oframe.ShowMenuItem(name) 显示指定的菜单，name：需要显示的菜单名，如Open，Save

document.all.oframe.HideMenuItem 隐藏指定的菜单