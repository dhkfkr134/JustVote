package com.study.springboot.service;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.study.springboot.dto.SimpleBbsDto;

public interface ISimpleBbsService {
   
   public List<SimpleBbsDto> list();
   public SimpleBbsDto view(String id);
   public int write(Map<String, String> map);
   public int delete(@Param("_id")String id);
   public int count();
}