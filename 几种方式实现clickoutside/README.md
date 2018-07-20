前言
实现点击dialog外部,关闭当前dialog最简单的方法，就是直接给遮罩层设置点击事件，然后在点击回调里关闭这个对话框。这虽然是一种方式，但并不是很好，有点hack的感觉，因为像点击select弹出dropdown这种情况，是没有遮罩层，所以我们需要寻求其他方法来解决。以下我将介绍三种方法来实现clickoutside。为了统一，我们依然以下图的dialog为例，但去掉了遮罩层。


第一种方式
我们可以给document添加一个点击事件，通过判断event.target是不是dialog或者他的孩子，如果不是，则触发clickoutside回调。但由于我们是给document添加点击事件，根据js的事件机制，打开对话框按钮的点击触发，会冒泡到该document，并触发document绑定的事件。所以我们可以在callback方法加个判断执行条件->e.target是不是button,或者可以在button绑定的点击事件回调里使用e.stopPropagation(),来停止冒泡行为。


第二种方式
我们依然可以利用e.stopPropagation()，根据冒泡特性，我们可以在事件冒泡到dialog外之前，停止冒泡行为。给dialog添加一个点击事件，在这里停止冒泡即可。然后在document的点击事件回调里执行clickoutside回调即可。



第三种方式
由于前面两种方式都需要给document添加点击事件，那么当页面嵌入ifame的时候，当点击ifame区域的时候，触发不了document的点击回调，原因是ifame会有自己独立的document对象。为了解决这个问题，我们可以使用focusin，focusout，来解决这个问题。首先，能够触发这些事件的元素，他一定是focusable的，可以通过设置属性tabindex=-1来声明他是一个focusable的元素。这种方式也有一个弊端，就是在火狐上不支持该事件，火狐52版本的时候才解决这个bug。

clickoutside属性说明
1.targetTimeIds对象:该对象用于存储timeid，对应的key为clickoutside回调函数，相同的函数他的timeid是相同的。

2.bind函数:定义bind函数用于绑定clickoutside，其中参数el为绑定的元素，参数callback为clickoutside回调方法。bind函数内部，进行了三部操作，给该函数设置focusable，添加focusout，focusin事件，执行callback会以异步任务的形式执行，在focusout里执行异步的callback任务，在focusin里取消该异步任务。

下图中第一张代码，给button，dialog都绑定了clickoutside事件，这样做也是为了解决，当dialog内部存在focusable元素，比如input，我们在操作input的时候，button会触发focusout，进而执行callback任务，那么为了避免dialog的关闭，需要在dialog触发focusin的时候取消该异步任务(因为focusin，foucout是支持冒泡的，所以input的焦点事件会冒泡到dialog上)。

但是我们也可以只给dialog绑定clickoutside事件，然后在button点击事件里手动触发dialog.focus()(chrome浏览器里，好像不需要手动触发，会自动触发，但其他浏览器需要手动触发)。这样dialog的focusin，focusout始终会被触发。这样就不需要给button绑定clickoutside了。





总结
1.第一种方式，第二种方式都不可以解决ifame点击触发clickoutside回调失效。

2.第三种方式利用focsuin，focusout解决了ifame问题，但是会有兼容性，不兼容火狐52版本以前的。

参考链接
https://zhuanlan.zhihu.com/p/38392987

https://developer.mozilla.org/en-US/docs/Web/Events/focusout,https://developer.mozilla.org/en-US/docs/Web/Events/focusin

https://bugzilla.mozilla.org/show_bug.cgi?id=687787