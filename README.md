#### 这里封装了一些公用的方法，可以直接调用（在utils/util.js）
1. compareDate: 引擎返回的日期比较
2. compareFormatDate: 引擎返回的日期(YYYY-MM-DD格式的)比较
3. getTargetNode: 获取指定的目标dom节点(指dom标签，eg: li span)
4. getTargetByClass: 获取指定的目标dom节点(指dom节点，带有class就行)
5. getElementViewTop: 获取dom的offsetTop
6. getBodyScrollTop: 获取scrollTop
7. queryFirstByName: 查询第一个dom名称
8. queryFirstByClass: 查询指定dom的第一个class
9. filter: 针对对象封装的filter方法
10. first: 取得对象中第一个属性
11. last: 取得对象中最后一个属性
12. setBodyScrollTop: 滚动到某个位置
13. compareSelected: 对比两个对象是否一致
14. getValueOfDate: 将YYYY-MM-DD的日期格式转为毫秒



`npm start`运行启动demo
- App.js里有个加入购物车，如果选择了份数但是木有选择日期，选择日期高亮显示2次，并且锚点到对应的位置