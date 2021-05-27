package com.justvote.dao;

import java.util.Date;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface IVotePageDao {

	// 나중에 끝나는 날짜를 추가해서 받아줘야 한다, 일단 DB에서 테이블을 바꿔서 ENDDATE를 DEFAULT 값으로 넣어야 할 수도 
	public void registeVoteDao(String userID, String voteTitle, String voteContent, Date voteEndDate);
	public int deleteVoteDao(@Param("_voteID")int voteID); // 투표를 삭제
	
	
	//여기는 다른 테이블인데 안된다면 다른 DAO에 두고 할 것
	public void registeSelecDao(@Param("_voteID_FK")int voteID, @Param("_selecContent")String selecContent); // 항목 추가하는 쿼리
}
