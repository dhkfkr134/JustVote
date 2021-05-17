package com.justvote.dao;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface IRegisterDao {
	
	 public int registerDao( String userName,String sex, String age, String
	  major,String grade, String nickName, String userId,String userPass);
	
}
