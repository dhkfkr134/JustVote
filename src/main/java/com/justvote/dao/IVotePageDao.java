package com.justvote.dao;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.justvote.dto.VotePageDto;

@Mapper
public interface IVotePageDao {

// ��ǥ ���� ����ֱ�
	// Mainȭ�� ����ֱ� ���� DAO
	public List<VotePageDto> voteGetListDao(); // ��ǥ ������ Get������
	// Mainȭ�鿡�� ī�װ� ���ý� ����ֱ� ���� DAO
	public List<VotePageDto> voteGetCategoryDao(@Param("_category")String category);
	// Mainȭ�鿡�� ���� �޾Ƽ� ����ֱ� ���� DAO
	public List<VotePageDto> voteGetSearchDao(@Param("_search")String search);
	
// ��ǥ ���� ����ֱ�
	// ��ǥȭ�� �������� ������ DAO
	public VotePageDto voteGetDao(@Param("_index")int voteID); // ��ǥ ������ Get������
	public List<VotePageDto> selecGetDao(int index); // ��ǥ ������ Get������
	public int getVoteID();
	
	// TEST// ��ǥ content�� �����ϰ� Hit�� �����ϴ� DAO
	public void voteContentCount(@Param("_voteID")int voteID, @Param("_selecID")String selecID);
	
	// makevote���� DAO
	public void registVotePageDao(@Param("_voteTitle")String voteTitle, @Param("_userID")String userID, @Param("_category")String category);
	public int regestVotePageIDReturnDao(); //��� PAGEid�޾ƿ��� ��
	public void registVoteContentDao(@Param("_voteID")int voteID ,@Param("list")List<String> list);
	
	
	// ���߿� ������ ��¥�� �߰��ؼ� �޾���� �Ѵ�, �ϴ� DB���� ���̺��� �ٲ㼭 ENDDATE�� DEFAULT ������ �־�� �� ���� 
//	public void registeVoteDao(String userID, String voteTitle, String voteContent, Date voteEndDate);
	
	// ��ǥ �����ϴ� ����
	public String deleteVoteIdCheck(@Param("_voteID")int voteID);
	public int deleteSelection(@Param("_voteID") int voteID);
	public int deleteVoteDao(@Param("_voteID")int voteID); // ��ǥ�� ����
	
	//����� �ٸ� ���̺��ε� �ȵȴٸ� �ٸ� DAO�� �ΰ� �� ��
	public void registeSelecDao(@Param("_voteID_FK")int voteID, @Param("_selecContent")String selecContent); // �׸� �߰��ϴ� ����
	
	
	
	public void testDao(@Param("_voteID")int voteID); // �׽�Ʈ 
	

	

	
}
