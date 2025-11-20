import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as s,c as a,a as e}from"./app-HMLpIP8o.js";const t={},p=e(`<h1 id="根据id批量修改状态" tabindex="-1"><a class="header-anchor" href="#根据id批量修改状态" aria-hidden="true">#</a> 根据ID批量修改状态</h1><h2 id="_1、接口实体类-moduleincomingmaterialsdo" tabindex="-1"><a class="header-anchor" href="#_1、接口实体类-moduleincomingmaterialsdo" aria-hidden="true">#</a> 1、接口实体类 ModuleIncomingMaterialsDO</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">cn<span class="token punctuation">.</span>iocoder<span class="token punctuation">.</span>yudao<span class="token punctuation">.</span>module<span class="token punctuation">.</span>material<span class="token punctuation">.</span>dal<span class="token punctuation">.</span>dataobject<span class="token punctuation">.</span>moduleincomingmaterials</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>time<span class="token punctuation">.</span></span><span class="token class-name">LocalDateTime</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>time<span class="token punctuation">.</span></span><span class="token class-name">LocalDateTime</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>time<span class="token punctuation">.</span></span><span class="token class-name">LocalDateTime</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>baomidou<span class="token punctuation">.</span>mybatisplus<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">cn<span class="token punctuation">.</span>iocoder<span class="token punctuation">.</span>yudao<span class="token punctuation">.</span>framework<span class="token punctuation">.</span>mybatis<span class="token punctuation">.</span>core<span class="token punctuation">.</span>dataobject<span class="token punctuation">.</span></span><span class="token class-name">BaseDO</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * 来料信息 DO
 *
 * <span class="token keyword">@author</span> 
 */</span>
<span class="token annotation punctuation">@TableName</span><span class="token punctuation">(</span><span class="token string">&quot;material_module_incoming_materials&quot;</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@KeySequence</span><span class="token punctuation">(</span><span class="token string">&quot;material_module_incoming_materials_seq&quot;</span><span class="token punctuation">)</span> <span class="token comment">// 用于 Oracle、PostgreSQL、Kingbase、DB2、H2 数据库的主键自增。如果是 MySQL 等数据库，可不写。</span>
<span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@EqualsAndHashCode</span><span class="token punctuation">(</span>callSuper <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@ToString</span><span class="token punctuation">(</span>callSuper <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Builder</span>
<span class="token annotation punctuation">@NoArgsConstructor</span>
<span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ModuleIncomingMaterialsDO</span> <span class="token keyword">extends</span> <span class="token class-name">BaseDO</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 数据ID
     */</span>
    <span class="token annotation punctuation">@TableId</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 来料批号
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> batchNumber<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 供应厂捆绑号
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> supplierBundleNumber<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 供应厂名称
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> supplierName<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 来源国
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> originPlace<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 铝成分
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> aluminumContent<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 重量
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Double</span> weight<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 到料时间
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">LocalDateTime</span> arrivalTime<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 出库时间
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">LocalDateTime</span> outboundDate<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 打印状态
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> status<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 领料人
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> materialReceiver<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 出库操作员
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> operator<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 出入库状态
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> inOutStatus<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 发票号
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> pickupOrderNo<span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2、接口文档" tabindex="-1"><a class="header-anchor" href="#_2、接口文档" aria-hidden="true">#</a> 2、接口文档</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">io<span class="token punctuation">.</span>swagger<span class="token punctuation">.</span>v3<span class="token punctuation">.</span>oas<span class="token punctuation">.</span>annotations<span class="token punctuation">.</span>media<span class="token punctuation">.</span></span><span class="token class-name">Schema</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span></span><span class="token class-name">Data</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">List</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> wangbinggui
 */</span>
<span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ModuleIncomingMaterialsUpdateIdRespVO</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Schema</span><span class="token punctuation">(</span>description <span class="token operator">=</span> <span class="token string">&quot;捆绑号&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> supplierBundleNumber<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Schema</span><span class="token punctuation">(</span>description <span class="token operator">=</span> <span class="token string">&quot;打印状态&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> status<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Schema</span><span class="token punctuation">(</span>description <span class="token operator">=</span> <span class="token string">&quot;出入库状态&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> inOutStatus<span class="token punctuation">;</span>


<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3、mapper层-使用mybatis-plus的批量更新方法-自带updatebatchbyid" tabindex="-1"><a class="header-anchor" href="#_3、mapper层-使用mybatis-plus的批量更新方法-自带updatebatchbyid" aria-hidden="true">#</a> 3、mapper层，使用Mybatis-Plus的批量更新方法 自带updateBatchById</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code> <span class="token doc-comment comment">/**
     * 根据ID批量修改打印状态
     *
     */</span>
    <span class="token keyword">default</span> <span class="token keyword">void</span> <span class="token function">updateModuleIncomingMaterialsStatus</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ModuleIncomingMaterialsDO</span><span class="token punctuation">&gt;</span></span> updateReqVOList<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">updateBatchById</span><span class="token punctuation">(</span>updateReqVOList<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4、业务接口" tabindex="-1"><a class="header-anchor" href="#_4、业务接口" aria-hidden="true">#</a> 4、业务接口</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * 根据ID批量修改打印状态
     */</span>
    <span class="token keyword">void</span> <span class="token function">updateModuleIncomingMaterialsStatus</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ModuleIncomingMaterialsUpdateIdRespVO</span><span class="token punctuation">&gt;</span></span> updateReqVOList<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5、接口实现" tabindex="-1"><a class="header-anchor" href="#_5、接口实现" aria-hidden="true">#</a> 5、接口实现</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>  <span class="token doc-comment comment">/**
     * 根据ID批量更新状态
     */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">updateModuleIncomingMaterialsStatus</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ModuleIncomingMaterialsUpdateIdRespVO</span><span class="token punctuation">&gt;</span></span> updateReqVOList<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">//创建一个空的 ArrayList 实例，用于存储 ModuleIncomingMaterialsDO 类型的对象</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ModuleIncomingMaterialsDO</span><span class="token punctuation">&gt;</span></span> materialsList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 遍历 updateReqVOList</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">ModuleIncomingMaterialsUpdateIdRespVO</span> req <span class="token operator">:</span> updateReqVOList<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 获取 ID 列表</span>
            <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span> ids <span class="token operator">=</span> req<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 获取状态</span>
            <span class="token class-name">Integer</span> status <span class="token operator">=</span> req<span class="token punctuation">.</span><span class="token function">getStatus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 将每个 ID 转换为 ModuleIncomingMaterialsDO</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Long</span> id <span class="token operator">:</span> ids<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">ModuleIncomingMaterialsDO</span> material <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ModuleIncomingMaterialsDO</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                material<span class="token punctuation">.</span><span class="token function">setId</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// 设置状态</span>
                material<span class="token punctuation">.</span><span class="token function">setStatus</span><span class="token punctuation">(</span>status<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// 添加到列表</span>
                materialsList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>material<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 执行批量更新</span>
        moduleIncomingMaterialsMapper<span class="token punctuation">.</span><span class="token function">updateModuleIncomingMaterialsStatus</span><span class="token punctuation">(</span>materialsList<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6、和前端对接的接口" tabindex="-1"><a class="header-anchor" href="#_6、和前端对接的接口" aria-hidden="true">#</a> 6、和前端对接的接口</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code> <span class="token annotation punctuation">@PutMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/update2&quot;</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@Operation</span><span class="token punctuation">(</span>summary <span class="token operator">=</span> <span class="token string">&quot;批量更新打印状态&quot;</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@PreAuthorize</span><span class="token punctuation">(</span><span class="token string">&quot;@ss.hasPermission(&#39;material:module-incoming-materials:update2&#39;)&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">CommonResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Boolean</span><span class="token punctuation">&gt;</span></span> <span class="token function">updateModuleIncomingMaterialsStatus</span><span class="token punctuation">(</span>
            <span class="token annotation punctuation">@Valid</span> <span class="token annotation punctuation">@RequestBody</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ModuleIncomingMaterialsUpdateIdRespVO</span><span class="token punctuation">&gt;</span></span> updateReqVOList<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 调用服务层进行批量处理</span>
        moduleIncomingMaterialsService<span class="token punctuation">.</span><span class="token function">updateModuleIncomingMaterialsStatus</span><span class="token punctuation">(</span>updateReqVOList<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token function">success</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13),c=[p];function i(o,l){return s(),a("div",null,c)}const r=n(t,[["render",i],["__file","10.html.vue"]]);export{r as default};
