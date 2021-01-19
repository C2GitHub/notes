# Vue常见问题点

1. mvvm的理解

2. v-if和v-show的区别

   * v-if和v-show都是条件渲染
   * v-if可以控制元素是否渲染
   * v-show通过控制元素的display属性为block或none
   * v-if有较高的切换性能开销
   * v-show有较高的初次渲染性能开销
   * v-show和v-if的使用主要根据使用场景，对于一些需要频繁切换的元素建议使用v-show

3. v-model怎样实现双向数据绑定(原理)

4. vue中data为什么必须是函数

   * 为了保证组件在多次调用的时候拥有独立的数据空间
   * 组件每调用一次，data函数会返回一个新的数据对象
   * 保证相同组件之间的数据互不干涉

5. nextTick的作用

   * vue中dom更新是异步的

   * 对应一些我们需要dom操作的场景，必须保证dom的时效性

   * 这个时候就可以使用nextTick接口，nexttick的触发是下一次dom更新之后执行，所以通过这个接口可以保证操作的是最新的dom

   * 原理： 

     ```
     // 创建一个观察器实例并传入回调函数
     const observer = new MutationObserver(callback);
     
     // 以上述配置开始观察目标节点
     observer.observe(targetNode, config);
     
     // 之后，可停止观察
     observer.disconnect();
     ```

6. keep-alive的作用

   * keep-alive是vue 的一个内置组件

   * 作用：Vue在默认情况下，离开一个组件会触发组件的销毁过程，但有时候进入另外一个页面，需要保留上一个页面的数据状态等，这是后就要使用keep-alive
   * keep-alive 的使用：
     * include属性：字符串或正则，匹配的组件会被缓存
     * exclude属性： 字符串或正则，匹配的组件不会被缓存
     * 结合vue-router使用：在路由匹配规则的meta属性中添加keep-alive=true，当页面路由发生改变动态判断$route.meta.keepAlive来决定是否缓存改组件

   * 使用keep-alive会激活vue中两个生命周期，actived和deactived分别在当进入组件和离开组件时触发

   * 优点：状态保持，避免组件重新渲染。
   * 缺点：过多的组件缓存会造成性能损耗。

7. vue中key的作用

   * key的作用主要是为了高效的更新虚拟dom
   * 使用key值为每个节点做唯一标示
   * 让数据发生改变，会默认使用"就地复用"策略，之后对key值发生改变的节点进行操作
   * 有相同父元素的子元素必须有**独特的key**。重复的key会造成渲染错误。

8. Vue中插件的使用

   * 通过全局调用Vue.use()可以实现插件的挂载安装
   * 本质上是内部调用了插件的install方法，将其追加到vue插件队列中进行缓存，所以通过Vue.use插件之后安装一次。

9. watch和computed，methods的区别

   * watch用户监听数据的变化，当监听数据改变，会立即触发watch的执行
   * 主要数据来源有data,props,computed
   * watch提供两个参数（newValue, oldValue）
* computed本身是一个方法，当做属性的方式使用
   * computed函数必须有返回值，内部可以进行一些逻辑运算
   * computed 内部不能处理异步任务
   * computed会计算结果进行缓存，只有数据改变才会触发computed 的再次执行，多次调用不会触发重复执行
   * computed默认只支持getter方法，如果需要实现双向数据绑定需要手动设置setter
   * methods中可以定义多个进行逻辑处理的函数，methods中的方法每调用一次就会立即执行一次

10. 组件间传值

    1. props：父传子
    2. $attrs : 获取没有被props接受的参数
    3. $emit：子传父
    4. listeners ：
       * 父作用域中的 (不含 `.native` 修饰器的) `v-on` 事件监听器
       * 通过 `v-on="$listeners"` 传入内部组件
    5. provide/inject ：祖先组件provide, 子孙组件inject
    6. $parent / $children 或 $refs 访问组件实例
    7. $bus
       * EventBus.$emit("editName", this.name)
       * EventBus.$on('editName', (name) => {  })
    8. vuex

11. vue生命周期

    * vue生命周期代表了一个vue实例从创建到销毁的一个完整的过程，在这个过程中特定时期，程序会预留一个钩子，就是我们所说的生命周期函数

    * vue实例生命周期主要分为3个大的阶段
      * 初始化阶段
        * beforeCreate
        * created
          * 完成对data和methods的初始化
          * 在这个阶段可以进行异步数据的请求
        * beforeMount
        * Mounted
          * 完成页面的挂载
          * 在这个阶段可以进行一些对dom的操作
      * 运行阶段
        * beforeUpdate
        * updated
      * 销毁阶段
        * beforeDestroy
        * destroyed

12. vue性能优化

    1. 路由组件懒加载
       * 对非首页路由进行懒加载，减少首次加载资源请求，加快首屏渲染

    2. 合理使用指令
       * v-if和v-show的合理使用
       * 为item设置唯一的key值
       * v-once的使用

    3. 非必须响应式的数据尽量不要写在data中
    4. 内容系统的图片按需加载
       * 图片按需加载
       * v-lazy库

    5. 项目上线的时候屏蔽sourcemap打包

13. vue-router的实现原理

    * hash 模式
      * window.onhashchange
    * history 模式
      * history.pushState
      * history.replaceState
      * window.onpopstate

14. 路由守卫

15. vuex的原理

16. 什么是虚拟dom