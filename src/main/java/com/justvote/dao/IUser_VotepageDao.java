package com.justvote.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface IUser_VotepageDao {
	
	// ��ǥ �ߺ�Ȯ��
	public int checkVoted(@Param("_userID") String userID, @Param("_voteID") int voteID);
	
	// user_votepage insert into
	public void createVoted(@Param("_userID") String userID, @Param("_voteID") int voteID);
	
	// voteCount�� ��ǥ ���� �� 0 -> 1
	public void voteVoted(@Param("_userID") String userID, @Param("_voteID") int voteID);
}
