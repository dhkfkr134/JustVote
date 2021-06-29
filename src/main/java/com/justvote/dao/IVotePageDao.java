package com.justvote.dao;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.justvote.dto.VotePageDto;

@Mapper
public interface IVotePageDao {

	// Main화면 띄워주기 위한 DAO
	public List<VotePageDto> voteGetListDao(); // 투표 페이지 Get보내기
	
	// 투표화면 선택했을 때위한 DAO
	public VotePageDto voteGetDao(String index); // 투표 페이지 Get보내기
	public List<VotePageDto> selecGetDao(String index); // 투표 페이지 Get보내기
	public int getVoteID();
	
	
	// TEST// 투표 content를 선택하고 Hit수 증가하는 DAO
	public void voteContentCount(@Param("_voteID")int voteID, @Param("_selecContent")String contentIndex);
	
	// makevote위한 DAO
	public void registVotePageDao(@Param("_voteTitle")String voteTitle,@Param("_userID")String userID);
	public String regestVotePageIDReturnDao(); //등록 PAGEid받아오는 문
	public void registVoteContentDao(@Param("_voteID")String voteID ,@Param("list")List<String> list);
	
	
	// 나중에 끝나는 날짜를 추가해서 받아줘야 한다, 일단 DB에서 테이블을 바꿔서 ENDDATE를 DEFAULT 값으로 넣어야 할 수도 
	public void registeVoteDao(String userID, String voteTitle, String voteContent, Date voteEndDate);
	public int deleteVoteDao(@Param("_voteID")int voteID); // 투표를 삭제
	//여기는 다른 테이블인데 안된다면 다른 DAO에 두고 할 것
	public void registeSelecDao(@Param("_voteID_FK")int voteID, @Param("_selecContent")String selecContent); // 항목 추가하는 쿼리
	
	// TEST
	public void testDao(@Param("_voteID")int voteID); // 테스트 
	public List<VotePageDto> listDao();
	
	public List<Map<String, String>> test2Dao();
	

	
}
