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
# 根据类型等于1的数据判断返回给前端

### 1、实体类  ModuleResultRollPageReqVO

```java
import lombok.*;
import java.util.*;
import io.swagger.v3.oas.annotations.media.Schema;
import cn.iocoder.yudao.framework.common.pojo.PageParam;
import org.springframework.format.annotation.DateTimeFormat;
import java.time.LocalDateTime;

import static cn.iocoder.yudao.framework.common.util.date.DateUtils.FORMAT_YEAR_MONTH_DAY_HOUR_MINUTE_SECOND;

@Schema(description = "管理后台 - 倒卷处置结果数据分页 Request VO")
@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
public class ModuleResultRollPageReqVO extends PageParam {

    @Schema(description = "倒卷时间")
    @DateTimeFormat(pattern = FORMAT_YEAR_MONTH_DAY_HOUR_MINUTE_SECOND)
    private LocalDateTime[] rollCreationDate;

    @Schema(description = "分厂")
    private String rollBranchFactory;

    @Schema(description = "分切批号")
    private String rollLotNumber;

    @Schema(description = "客户")
    private String rollCustomer;

    @Schema(description = "合金状态")
    private String rollMetal;

    @Schema(description = "厚度")
    private String rollThickness;

    @Schema(description = "宽度")
    private String rollWidth;

    @Schema(description = "主操")
    private String rollAttribute7;

    @Schema(description = "机台")
    private String rollattribute8;

    @Schema(description = "中检人员")
    private String rollCkPersonnel;

    @Schema(description = "主要缺陷原因")
    private String mainDefectCause;

    @Schema(description = "质量工程师")
    private String rollQe;

    @Schema(description = " 改制订单")
    private String restructuringOrder;

    @Schema(description = " 改制规格 ")
    private String modifiedSpecification;

    @Schema(description = " 改制客户 ")
    private String modifiedCustomer;

    @Schema(description="类型")
    private Integer type;

    @Schema(description="总和")
    private Integer start;

    @Schema(description = "创建时间")
    @DateTimeFormat(pattern = FORMAT_YEAR_MONTH_DAY_HOUR_MINUTE_SECOND)
    private LocalDateTime[] createTime;

    @Schema(description = "修改时间")
    @DateTimeFormat(pattern = FORMAT_YEAR_MONTH_DAY_HOUR_MINUTE_SECOND)
    private LocalDateTime[] updateDate;

}
```
### 2、mapper  ModuleResultRollMapper

```java
@Mapper
public interface ModuleResultRollMapper extends BaseMapperX<ModuleResultRollDO> {
/**
     * 类型等于1
     *
     * @param reqVO
     * @return
     */
    default PageResult<ModuleResultRollDO> selectPage3(ModuleResultRollPageReqVO reqVO) {
        return selectPage(reqVO, new LambdaQueryWrapperX<ModuleResultRollDO>()
                .betweenIfPresent(ModuleResultRollDO::getRollCreationDate, reqVO.getRollCreationDate())
                .eqIfPresent(ModuleResultRollDO::getRollBranchFactory, reqVO.getRollBranchFactory())
                .likeIfPresent(ModuleResultRollDO::getRollLotNumber, reqVO.getRollLotNumber())
                .likeIfPresent(ModuleResultRollDO::getRollCustomer, reqVO.getRollCustomer())
                .eqIfPresent(ModuleResultRollDO::getRollMetal, reqVO.getRollMetal())
                .eqIfPresent(ModuleResultRollDO::getRollThickness, reqVO.getRollThickness())
                .eqIfPresent(ModuleResultRollDO::getRollWidth, reqVO.getRollWidth())
                .likeIfPresent(ModuleResultRollDO::getRollAttribute7, reqVO.getRollAttribute7())
                .eqIfPresent(ModuleResultRollDO::getRollattribute8, reqVO.getRollattribute8())
                .likeIfPresent(ModuleResultRollDO::getRollCkPersonnel, reqVO.getRollCkPersonnel())
                .eqIfPresent(ModuleResultRollDO::getMainDefectCause, reqVO.getMainDefectCause())
                .likeIfPresent(ModuleResultRollDO::getRollQe, reqVO.getRollQe())
                .likeIfPresent(ModuleResultRollDO::getRestructuringOrder, reqVO.getRestructuringOrder())
                .likeIfPresent(ModuleResultRollDO::getModifiedSpecification, reqVO.getModifiedSpecification())
                .likeIfPresent(ModuleResultRollDO::getModifiedCustomer, reqVO.getModifiedCustomer())
                .betweenIfPresent(ModuleResultRollDO::getCreateTime, reqVO.getCreateTime())
                .eqIfPresent(ModuleResultRollDO::getType, 1)
                .orderByDesc(ModuleResultRollDO::getId));
    }
}
```
### 3、创建接口  ModuleResultRollService

```java
public interface ModuleResultRollService {  
/**
     * @return 获取类型已判定的信息
     */
    PageResult<ModuleResultRollDO> getModuleResultRollTypeList(ModuleResultRollPageReqVO typeRespVO);
}
```
### 4、接口实现  ModuleResultRollServiceImpl

```java
  /**
     * @return 获取评审过的信息
     */
    @Override
    public PageResult<ModuleResultRollDO> getModuleResultRollTypeList(ModuleResultRollPageReqVO typeRespVO) {
        // 调用selectPage3方法，该方法已经包含了类型等于1的过滤条件
        return moduleResultRollMapper.selectPage3(typeRespVO);
    }
```
### 5、暴露接口给前端 ModuleResultRollController
```java
   @GetMapping("/type")
    @Operation(summary = "获取已判定的数据列表")
    @PreAuthorize("@ss.hasPermission('quality:module-result-roll:type')")
    public CommonResult<PageResult<ModuleResultRollRespVO>> getModuleResultRollTypeList(ModuleResultRollPageReqVO typeRespVO) {
        PageResult<ModuleResultRollDO> list = moduleResultRollService.getModuleResultRollTypeList(typeRespVO);
        return success(ModuleResultRollConvert.INSTANCE.convertPage(list));
    }
```
