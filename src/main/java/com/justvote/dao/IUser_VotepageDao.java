package com.justvote.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface IUser_VotepageDao {
	
	// 투표 중복확인
	public int checkVoted(@Param("_userID") String userID, @Param("_voteID") int voteID);
	
	// user_votepage insert into
	public void createVoted(@Param("_userID") String userID, @Param("_voteID") int voteID);
	
	// voteCount로 투표 했을 때 0 -> 1
	public void voteVoted(@Param("_userID") String userID, @Param("_voteID") int voteID);
}
