package com.justvote.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface IRegisterDao {

	public int registerDao(String userName, String sex, String age, String major, String grade, String nickName,
			String userId, String userPass);
	 void loginDao(@Param("_userId") String userId,@Param("_userPass") String userPass);
}
