package com.justvote.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.justvote.dto.LikeDto;
import com.justvote.dto.RegisterDto;
import com.justvote.dto.VotePageDto;

@Mapper
public interface ILikeDao {
	public LikeDto checkDao(@Param("_userID")String userID);
	public List<LikeDto> checkLikeDao(@Param("_userID")Object userID);
	public void insertLikeDao(@Param("_userID")Object userID,@Param("_voteID")int voteID,int TF);
	public void disLikeDao(@Param("_userID")Object userID,@Param("_voteID")int voteID,int TF);
	public void makeLikeDao(@Param("list")List<RegisterDto> list,@Param("_voteID")int voteID,int TF);
	public void makeLikeDao2(@Param("_userID")String userID,@Param("list")List<VotePageDto> list,int TF);
}