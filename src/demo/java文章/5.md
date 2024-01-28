---
icon: pen-to-square
date: 2024-01-19
category:
  - Java查询
tag:
  - java
  - Java批量查询
star: true
sticky: true #标记
---
# 根据批号批量查询数据

### 1、在VO类里面添加一个数组字段，用于接收批号列表

```java
@Schema(description = "管理后台 - 倒卷成品查料 Response VO")
@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
public class ModuleInspectionRespVO extends ModuleInspectionBaseVO {

    @Schema(description = "数据ID", required = true, example = "1126")
    private Long id;

    @Schema(description = "针孔检测员")
    private String creatorPinhole;

    @Schema(description = "批号列表")
    private List<String> batchNumbers;  // 新增字段用于接收批号列表

    @Schema(description = "创建时间", required = true)
    private LocalDateTime createTime;

}
```
### 2、在Mapper里面添加查询方法

```java
 /**
     * 根据批号查询数据列表
     * @param batchNumbers
     * @return
     */
    default List<ModuleInspectionDO> selectBatchNumbers(Collection<String> batchNumbers) {
        return selectList(new LambdaQueryWrapperX<ModuleInspectionDO>()
                .in(CollectionUtil.isNotEmpty(batchNumbers), ModuleInspectionDO::getBatchNumber, batchNumbers) //只有批号不为空的时候才执行列表查询
                .orderByDesc(ModuleInspectionDO::getId));
    }
```
### 3、添加接口

```java
    /**
     * 根据批号查询数据列表
     * @param batchNumbers
     * @return
     */
    List<ModuleInspectionDO> getModuleInspectionListArray(Collection<String> batchNumbers);
```

### 4、逻辑实现接口

```java
   @Override
    public List<ModuleInspectionDO> getModuleInspectionListArray(Collection<String> batchNumbers) {
        return moduleInspectionMapper.selectBatchNumbers(batchNumbers);
    }
```

优化：

### 4.1、*根据用户输入查询批号数据顺序，返回相同顺序的数据*,创建对数据库返回的数据根据客户查询的顺序返回相同的顺序的方法

```java
 /**
     * 根据用户输入查询批号数据顺序，返回相同顺序的数据
     * @param results
     * @param batchNumbers
     * @return
     */
    public List<ModuleInspectionDO> sortResults(List<ModuleInspectionDO> results, List<String> batchNumbers) {
        // 创建一个映射，将批次号映射到其在用户输入中的索引
        Map<String, Integer> indexMap = new HashMap<>();
        for (int i = 0; i < batchNumbers.size(); i++) {
            indexMap.put(batchNumbers.get(i), i);
        }

        // 对结果进行排序，使得结果中的批次号顺序与用户输入的顺序相同
        results.sort((o1, o2) -> {
            Integer index1 = indexMap.get(o1.getBatchNumber());
            Integer index2 = indexMap.get(o2.getBatchNumber());
            return index1.compareTo(index2);
        });

        return results;
    }
```

### 4.2、调用排序方法

```java
  /**
     * 根据批号查询
     * @param batchNumbers
     * @return
     */
    @Override
    public List<ModuleInspectionDO> getModuleInspectionListArray(Collection<String> batchNumbers) {
        List<ModuleInspectionDO> results = moduleInspectionMapper.selectBatchNumbers(batchNumbers);
        return sortResults(results, new ArrayList<>(batchNumbers));
        //return moduleInspectionMapper.selectBatchNumbers(batchNumbers);
    }
```



### 5、将端口映射给前端调用

```java
 @GetMapping("/array")
    @Operation(summary = "根据批号获得成品查料列表")
    @Parameter(name = "batchNumbers", description = "批号列表", required = true, example = "BATCH001,BATCH002")
    @PreAuthorize("@ss.hasPermission('quality:module-inspection:query')")
    public CommonResult<List<ModuleInspectionRespVO>> getModuleInspectionListArray(@RequestParam("batchNumbers") Collection<String> batchNumbers) {
        List<ModuleInspectionDO> list = moduleInspectionService.getModuleInspectionListArray(batchNumbers);
        return success(ModuleInspectionConvert.INSTANCE.convertList(list));
    }
```