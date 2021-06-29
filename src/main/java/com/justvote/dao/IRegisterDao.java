package com.justvote.dao;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.justvote.dto.RegisterDto;

@Mapper
public interface IRegisterDao {

	public void registerDao(String userName, String sex, String age, String major, String grade, String nickName,
			String userId, String userPass);

	public String loginDao(@Param("_userID") String userID, @Param("_userPass") String userPass);

	public String logoutDao(@Param("_userID") String userID, @Param("_userPass") String userPass);

	/* public String check(@Param("_userId") String userId); */
	public HttpSession check(@Param("userID") String userID);

	public List<RegisterDto> hitView(int hit, String userID);

	public void contentDao(String id);
	
	public void getUserIdDao();

}