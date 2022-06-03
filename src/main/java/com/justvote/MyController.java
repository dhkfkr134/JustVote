package com.justvote;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

//import org.apache.commons.io.FileUtils;
//import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.justvote.dao.ICommentDao;
import com.justvote.dao.IRegisterDao;
import com.justvote.dao.IUser_VotepageDao;
import com.justvote.dao.IVotePageDao;
import com.justvote.dto.CommentDto;
import com.justvote.dto.RegisterDto;
import com.justvote.dto.VotePageDto;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class MyController {

	@Autowired // dao �� ���
	IRegisterDao dao;
	@Autowired
	ICommentDao dao1;
	@Autowired
	IVotePageDao dao2;
	@Autowired
	IUser_VotepageDao dao3;
	
	HttpSession loginId;

	@RequestMapping("/")
	public String root() throws Exception {

		return "";
	}

	@PostMapping("/register")
	public String write(@RequestBody RegisterDto registerDto) {
		dao.registerDao(registerDto.getUserName(), registerDto.getSex(), registerDto.getAge(), registerDto.getMajor(),
				registerDto.getGrade(), registerDto.getNickName(), registerDto.getUserID(), registerDto.getUserPass());

		return registerDto.toString();
	}

	@PostMapping("/signin")
	public String login(@RequestBody RegisterDto loginDto, HttpServletRequest req) {
		String check = dao.loginDao(loginDto.getUserID(), loginDto.getUserPass());

		System.out.println("postman /signin");
		if (check == null) {
			System.out.println("�α��� ����");
			org.apache.tomcat.jni.Error.osError();
		} else {
			System.out.println("����");
			loginId = req.getSession();
			loginId.setAttribute("userId", loginDto.getUserID());
			Object a = loginId.getAttribute("userId");
			System.out.println(a);
		}
		return loginDto.toString();
	}

	@PostMapping("/logout")
	public Object logout(HttpServletRequest req) {

		loginId.setAttribute("userId", null);

		Object a = loginId.getAttribute("userId");

		return a;
	}

	@GetMapping("/getInfo")
	public Object getInfo() {
		System.out.println("postman �ޱ� /getInfo");
		Object a = loginId.getAttribute("userId");

		if (loginId.getAttribute("userId") == null) {
			System.out.println("�����Ͱ� �����ϴ�");

			org.apache.tomcat.jni.Error.osError();

		} else {
			System.out.println("����33");
		}
		return a;
	}

	// ���� ���
	@GetMapping("/showComment")
	public List<Object> writeComment(@RequestParam(value = "commentContent", required = false) String commentContent,
			@RequestParam(value = "voteID", required = false) int voteID,
			@RequestParam(value = "userID", required = false) String userID) {
		
		System.out.println("Comment Content: " + commentContent);
		System.out.println("voteID: " + voteID);
		System.out.println("userID: " + userID);
		String nickName = dao.getUserNickNameDao(userID);
		System.out.println("NickName: " + nickName);
		dao1.writeDao(commentContent, voteID, nickName, userID);

		List<Object> list = new ArrayList<>();

		// votePage�� selecList�� list�� �־��� ����
		VotePageDto votePage = dao2.voteGetDao(voteID);
		List<VotePageDto> selecList = dao2.selecGetDao(voteID);
		List<CommentDto> commentList = dao1.listDao2(voteID);

		list.add(votePage); // ��ǥ ������ �ֱ�
		for (int i = 0; i < selecList.size(); i++) { //���ù� ����Ʈ �ֱ�
			list.add(selecList.get(i));
		}
		for (int i = 0; i < commentList.size(); i++) { // ���� ����Ʈ �ֱ�
			list.add(commentList.get(i));
		}

		System.out.println(voteID + " content �׽�Ʈ ����");
		return list;
	}
	
	@GetMapping("/deleteComment")
	public List<Object> deleteComment(@RequestParam int voteID, @RequestParam int commentID){
		
		System.out.println("�����Ǵ� commentID = " + commentID);
		dao1.deleteDao(commentID);
		System.out.println("���� ����");
		
		List<Object> list = new ArrayList<>();

		// votePage�� selecList�� list�� �־��� ����
		VotePageDto votePage = dao2.voteGetDao(voteID);
		List<VotePageDto> selecList = dao2.selecGetDao(voteID);
		List<CommentDto> commentList = dao1.listDao2(voteID);

		list.add(votePage); // ��ǥ ������ �ֱ�
		for (int i = 0; i < selecList.size(); i++) { //���ù� ����Ʈ �ֱ�
			list.add(selecList.get(i));
		}
		for (int i = 0; i < commentList.size(); i++) { // ���� ����Ʈ �ֱ�
			list.add(commentList.get(i));
		}
		
		System.out.println("/deleteComment ����");

		return list;
	}
	
	@GetMapping("/deleteVote") // delete
	public List<VotePageDto> deleteVote(@RequestParam int voteID) {
		
		List<VotePageDto> list = new ArrayList<>();

			dao3.delete(voteID);
			dao1.delete(voteID);
			dao2.deleteSelection(voteID);
			dao2.deleteVoteDao(voteID);
		
		
		list = dao2.voteGetListDao();
		return list;
			

	}

	@PostMapping("/registeSelecDao") // ���� �߰�
	public String registeSelec(@RequestBody VotePageDto votePageDto) {
		dao2.registeSelecDao(votePageDto.getVoteID(), votePageDto.getSelecContent());

		return votePageDto.toString();
	}

	@GetMapping("/justvote") // test
	public String test(@RequestBody VotePageDto votePageDto) {
		dao2.testDao(votePageDto.getVoteID());

		return votePageDto.toString();
	}


	// ���� ��ǥ�����
	@PostMapping("/makeVote") // votepage(���̺�) �����
	public void makevote(@RequestBody VotePageDto votePageDto, HttpServletRequest req, RegisterDto rd) {

		Object a = loginId.getAttribute("userId");
		String str = String.valueOf(a);
		dao2.registVotePageDao(votePageDto.getVoteTitle(), votePageDto.getUserID(), votePageDto.getCategory());

		System.out.println(votePageDto.getVoteTitle());
		System.out.println(votePageDto.getUserID());
		System.out.println(votePageDto.getCategory());

		List<String> list = new ArrayList<>();
		list = votePageDto.getSelecContentList();

		int voteID = dao2.regestVotePageIDReturnDao();

		dao2.registVoteContentDao(voteID, list);
		System.out.println("makeVote");
	}

	// ��ǥ������ Content�� Post��û
	@GetMapping("/voteCount")
	public List<Object> voteCount(@RequestParam(value = "voteID", required = false) int voteID,
			@RequestParam(value = "selecID", required = false) String selecID,
			@RequestParam(value = "userID", required = false) String userID) {
		System.out.println("1");
		
		  // voteCount�� �÷��ִ� ������
		  
		  dao2.voteContentCount(voteID, selecID);
		 
		  
		  // �������� �÷��ְ� ��ǥ ȭ���� �ٽ� �������ִ� �� 
		  List<Object> list = new ArrayList<>();
		  
		  VotePageDto votePage = dao2.voteGetDao(voteID); List<VotePageDto>
		  selecList = dao2.selecGetDao(voteID); 
		  List<CommentDto> commentList = dao1.listDao2(voteID);

			list.add(votePage);
			for (int i = 0; i < selecList.size(); i++) {
				list.add(selecList.get(i));
			}
			for (int i = 0; i < commentList.size(); i++) {
				list.add(commentList.get(i));
			}

			int voted = dao3.checkVoted(userID, voteID);
			if (voted == 0) {
				dao3.voteVoted(userID, voteID);
			} else {
				System.out.println("�̹� ��ǥ����");
				return list;
			}
		
		System.out.println("voteID : " + voteID + ", selecID : " + selecID + " voteCount �׽�Ʈ ����");
		return list;
	}
	
	// ��ǥ �ߺ�Ȯ��
	@GetMapping("/contentVoted")
	public int votepageGetVoted(@RequestParam int voteID) {
		Object id = loginId.getAttribute("userId");
		String userID = String.valueOf(id);
		
		System.out.println("testetsetsetestset : "+userID);
		System.out.println(id + " id");
		System.out.println("contentVoted ȣ��");
		try {
			int voted = dao3.checkVoted(userID, voteID); 
			System.out.println(voted);
			if (voted == 0) {
				// �̹� �ְ� ��ǥ ������ ��
				System.out.println("���̺� ���� ����");
				return 0;
			}
		} catch (Exception e) {
			System.out.println("user_votepage ���� �Ϸ�");
			dao3.createVoted(userID, voteID);
			return 0;
		}

		return 1;
	}

	// ��ǥ�� ȭ���� ����ش�
	@GetMapping("/content")
	public List<Object> votepageGet(@RequestParam int voteID) {
		
		// return ���� List
		List<Object> list = new ArrayList<>();
	

		VotePageDto votePage = dao2.voteGetDao(voteID);
		List<VotePageDto> selecList = dao2.selecGetDao(voteID);
		List<CommentDto> commentList = dao1.listDao2(voteID);

		list.add(votePage); // ��ǥ ������ �ֱ�
		for (int i = 0; i < selecList.size(); i++) { //���ù� ����Ʈ �ֱ�
			list.add(selecList.get(i));
		}
		for (int i = 0; i < commentList.size(); i++) { // ���� ����Ʈ �ֱ�
			list.add(commentList.get(i));
		}

		System.out.println(voteID + " content �׽�Ʈ ����");
		return list;
	}

	
	// ��ǥ ȭ���� ī�װ����� ����ش�
	@GetMapping("/main")
	public List<VotePageDto> votepageGetCategory(@RequestParam String category) {

		List<VotePageDto> list = new ArrayList<>();

		if (category.equals("all")) {
			list = dao2.voteGetListDao();
			System.out.println(category + "   11");
			return list;
		} else {
			list = dao2.voteGetCategoryDao(category);
			System.out.println(category + "   22");
			return list;
		}
	}
	
	@GetMapping("/mainSearch")
	public List<VotePageDto> votepageGetSearch(@RequestParam String search) {

		List<VotePageDto> list = new ArrayList<>();
		System.out.println(search);
		list = dao2.voteGetSearchDao(search);
	//	System.out.println(list);
		return list;
	}

}
