---
icon: pen-to-square
date: 2024-01-19
category:
  - Java查询
tag:
  - java
  - 更新数据
star: true
sticky: true #标记
---
# 查出数据库type4类型为0

#### 查出数据库type4类型为0，来判断来料待查，并在判断type1和type2不为null时将type4修改为1

### 1、实体类

```java
@Data
public class ModuleInspectionBaseVO {

    @Schema(description = "批号")
    private String batchNumber;

    @Schema(description = "单双光")
    private String sadl;

    @Schema(description = "倒卷时间")
    @DateTimeFormat(pattern = FORMAT_YEAR_MONTH_DAY_HOUR_MINUTE_SECOND)
    private LocalDateTime rollCreationDate;

    @Schema(description = "客户")
    private String customer;

    @Schema(description = "来料宽度")
    private String rollWidth;

    @Schema(description = "来料厚度")
    private String rollThickness;

    @Schema(description = "合金状态")
    private String rollMetal;

    @Schema(description = "米数")
    private String rollMeterQty;

    @Schema(description = "来料重量")
    private Double rollQtyTon;

    @Schema(description = "产品用途")
    private String rollProductUse;

    @Schema(description = "亮面朝向")
    private String rollSurfaceEndFace;

    @Schema(description = "来料管芯")
    private String rollChips;
```
### 2、查询VO

```java
@Schema(description = "管理后台 - 倒卷成品查料分页 Request VO")
@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
public class ModuleInspectionPageReqTypeVO extends PageParam {

    @Schema(description = "批号")
    private String batchNumber;

    @Schema(description = "查料类型")
    private String type1;

    @Schema(description = "厚度类型")
    private String type2;

    @Schema(description="针孔类型")
    private String type3;

    @Schema(description = "创建类型")
    private String type4;


}
```
### 3、转换类
```java
@Mapper
public interface ModuleInspectionConvert {

    PageResult<ModuleInspectionRespVO> convertPage(PageResult<ModuleInspectionDO> page);
}

```
### 4、Mapper 类型为0表示待查
```java
   default PageResult<ModuleInspectionDO> selectByType(ModuleInspectionPageReqTypeVO typeVO){
        return selectPage(typeVO, new LambdaQueryWrapperX<ModuleInspectionDO>()
                .eq(ModuleInspectionDO::getType4,0)
                .orderByDesc(ModuleInspectionDO::getId));
    }
```
### 4.1、修改数据type4字段

```java
   /**
     * 更新type字段
     * @param id
     * @param type4
     * @return
     */
    @Update("UPDATE quality_module_inspection SET type4 = #{type4} WHERE id = #{id}")
    int updateType4(@Param("id") Long id, @Param("type4") Integer type4);
```
### 5、创建接口，需要实现分页

```java
   /**
     * 查出创建类型等于0的数据
     * @return 创建类型等于0的列表
     */
    PageResult<ModuleInspectionDO> getModuleInspectionListType(ModuleInspectionPageReqTypeVO typeRespVO);
```

### 6、实现接口

```java
 @Override
    public PageResult<ModuleInspectionDO> getModuleInspectionListType(ModuleInspectionPageReqTypeVO typeRespVO) {
        //获取数据库中type4为0的数据
        PageResult<ModuleInspectionDO> type4Result = moduleInspectionMapper.selectByType(typeRespVO);

        // 检查 type4Result 和 type4Result.getList() 是否为 null
        if (type4Result != null && type4Result.getList() != null) {
            // 遍历查询结果
            for (ModuleInspectionDO inspection : type4Result.getList()) {
                if (inspection.getType1() != null && inspection.getType2() != null && inspection.getType1().equals(inspection.getType2())) {
                    //设置type4为1
                    inspection.setType4(1);
                    // 更新数据库中的记录
                    moduleInspectionMapper.updateType4(inspection.getId(), 1);
                }
            }
        } else {
            // 处理 type4Result 为 null 或列表为空的情况
            throw exception(MODULE_INSPECTION_NOT_EXISTS_NULL);
        }
        return type4Result;
    }
```

### 7、暴露接口个前端调用

```java
  @GetMapping("/stay")
    @Operation(summary = "获得待查信息分页")
    @PreAuthorize("@ss.hasPermission('quality:module-inspection:stay')")
    public CommonResult<PageResult<ModuleInspectionRespVO>> getModuleInspectionListType(@Valid ModuleInspectionPageReqTypeVO typeRespVO) {
        PageResult<ModuleInspectionDO> pageResult = moduleInspectionService.getModuleInspectionListType(typeRespVO);
        return success(ModuleInspectionConvert.INSTANCE.convertPage(pageResult));
    }
```
