---
icon: pen-to-square
date: 2024-01-19
category:
  - Java数据更新
tag:
  - java
  - 更新数据
star: true
sticky: true #标记
---

# 查询ID与批号同时存在才能更新数据

```java
    @Override
    public void updateModuleInspection(ModuleInspectionUpdateReqVO updateReqVO) {

        Long id = updateReqVO.getId();
        Long moduleId = moduleInspectionMapper.selectCount(new QueryWrapper<ModuleInspectionDO>().lambda()
                .eq(ModuleInspectionDO::getId, updateReqVO.getId())
                .and(wrapper -> wrapper.eq(ModuleInspectionDO::getBatchNumber, updateReqVO.getBatchNumber())));
        if (moduleId > 0) {
            //检验是否存在
            validateModuleInspectionExists(updateReqVO.getId());
            //更新
            ModuleInspectionDO updateObj = ModuleInspectionConvert.INSTANCE.convert(updateReqVO);
            // 执行更新操作
            moduleInspectionMapper.updateById(updateObj);

            ModuleInspectionDO moduleInspectionDO = moduleInspectionMapper.selectById(id);
            String type1 = moduleInspectionDO.getType1();
            String type2 = moduleInspectionDO.getType2();

            // TOD 当type1和type2不为null且不等于未检，且两个字段的值相等时，将type4字段的值修改为1
            if ("已检".equals(type1) && type1.equals(type2)) {
                // TOD 将type4设置为1
                moduleInspectionDO.setType4(1);
                // 更新数据库中的记录
                moduleInspectionMapper.updateType4(moduleInspectionDO.getId(), 1);
            }
        }else {
            throw exception(MODULE_DETECTION_BATCH_EXISTSSL);
        }


    }
```