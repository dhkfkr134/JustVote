package com.justvote.dao;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.justvote.dto.VotePageDto;

@Mapper
public interface IVotePageDao {

	// 나중에 끝나는 날짜를 추가해서 받아줘야 한다, 일단 DB에서 테이블을 바꿔서 ENDDATE를 DEFAULT 값으로 넣어야 할 수도 
	public void registeVoteDao(String userID, String voteTitle, String voteContent, Date voteEndDate);
	public int deleteVoteDao(@Param("_voteID")int voteID); // 투표를 삭제
	
	
	//여기는 다른 테이블인데 안된다면 다른 DAO에 두고 할 것
	public void registeSelecDao(@Param("_voteID_FK")int voteID, @Param("_selecContent")String selecContent); // 항목 추가하는 쿼리
	
	// TEST
	public void testDao(@Param("_voteID")int voteID); // 테스트 
	public List<VotePageDto> listDao();
	
	public List<Map<String, String>> test2Dao();
	
	public VotePageDto voteGetDao(@Param("_index")String index); // 투표 페이지 Get보내기
	public List<VotePageDto> selecGetDao(@Param("_index")String index); // 투표 페이지 Get보내기
}